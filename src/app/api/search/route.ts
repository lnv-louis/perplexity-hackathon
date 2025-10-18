import { NextRequest, NextResponse } from 'next/server';
import Perplexity from '@perplexity-ai/perplexity_ai';

// ... [interfaces remain the same] ...

interface SubPrompt {
  question: string;
  answer: string;
  citations?: Array<{ number: number; url: string; title: string }>;
}

interface QueryResult {
  content: string;
  citations: Array<{ number: number; url: string; title: string }>;
}

interface WidgetData {
  id: string;
  title: string;
  content: any;
  citations?: Array<{ number: number; url: string; title: string }>;
  size?: { w: number; h: number };
}

interface SearchResponse {
  generated_at: string;
  source: string;
  widget_count: number;
  widgets: WidgetData[];
  is_followup?: boolean;
}

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = process.env.PERPLEXITY_SYSTEM_PROMPT || 
  "You are a real estate research assistant providing concise, accurate information about housing and neighborhoods. Format responses with proper markdown including headers (use ### for main sections), bullet points, and numbered lists. Include relevant citations [1][2] after factual statements. Keep answers focused and under 400 words unless detailed analysis is requested. Always include complete words - never truncate (e.g., write 'area' not 'are'). Structure responses clearly with sections for key information.";

const PROMPT_SUFFIX = process.env.PERPLEXITY_PROMPT_SUFFIX || 
  " Provide a well-structured response with markdown formatting. Use ### headers for main sections. Include citations [1][2] for all facts. Write complete sentences without truncation. Keep the response concise (300-400 words) but comprehensive.";

// --- REWRITTEN PROMPT GENERATION ---
async function generateSubPrompts(initialPrompt: string): Promise<string[]> {
  const location = initialPrompt; // Use the whole query as the location for simplicity
  const prompts = [
    // 1. Safety and Crime
    `Provide a detailed safety and crime analysis for the area '${location}'.`,
    // 2. Local amenities
    `List the most popular local amenities in '${location}', including parks, gyms, and supermarkets. Provide specific names and a brief description for 2-3 of them.`,
    // 3. Lifestyle and atmosphere
    `Describe the lifestyle and atmosphere of '${location}'. Is it better for students, families, or young professionals? Mention the general vibe, nightlife, and community feel.`,
    // 4. Available properties
    `Find 2-3 specific houses or flats currently available for rent in the area mentioned in '${location}'. For each property, provide the full URL to the listing, address, price, and key features like bedrooms and bathrooms.`,
    // 5. Weather and Climate
    `What are the current and typical weather conditions for the location mentioned in '${location}'?`
  ];
  return prompts;
}

async function executeSingleQuery(prompt: string, conversationHistory: ConversationMessage[] = []): Promise<QueryResult> {
  try {
    const client = new Perplexity({
      apiKey: process.env.PERPLEXITY_API_KEY,
    });

    const enhancedPrompt = prompt + PROMPT_SUFFIX;

    const messagesForApi: ConversationMessage[] = [{ role: 'system', content: SYSTEM_PROMPT }];
    let lastRole = 'system';

    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach(msg => {
        if (msg.role !== lastRole) {
          messagesForApi.push(msg);
          lastRole = msg.role;
        }
      });
    }

    if (lastRole === 'user') {
      const lastMsg = messagesForApi.pop();
      if (lastMsg) {
        const mergedContent = `${lastMsg.content}\n\n${enhancedPrompt}`;
        messagesForApi.push({ role: 'user', content: mergedContent });
      } else {
        messagesForApi.push({ role: 'user', content: enhancedPrompt });
      }
    } else {
      messagesForApi.push({ role: 'user', content: enhancedPrompt });
    }

    const completion = await client.chat.completions.create({
      model: "sonar-pro",
      messages: messagesForApi,
    });
    
    const responseContent = completion.choices[0].message.content;
    const contentString = typeof responseContent === 'string' ? responseContent : 
      Array.isArray(responseContent) ? responseContent.map(chunk => 'text' in chunk ? chunk.text : '').join('') : '';
    
    const citations: Array<{ number: number; url: string; title: string, name: string }> = [];
    
    if ((completion as any).citations && Array.isArray((completion as any).citations)) {
      const apiCitations = (completion as any).citations;
      apiCitations.forEach((cite: any, index: number) => {
        let url = '#';
        let title = `Source ${index + 1}`;
        let name = `Source ${index + 1}`;

        try {
          if (typeof cite === 'string') {
            url = cite;
            name = new URL(url).hostname.replace('www.', '');
            title = name;
          } else if (cite && typeof cite === 'object' && cite.url) {
            url = cite.url;
            title = cite.title || new URL(url).hostname.replace('www.', '');
            name = cite.title || new URL(url).hostname.replace('www.', '');
          }
        } catch (e) {
          console.error('Error parsing citation URL:', e);
        }

        if (url !== '#') {
          citations.push({ number: index + 1, url, title, name });
        }
      });
    } else {
      const urlPattern = /https?:\/\/[^\s\)]+/g;
      const urls = contentString.match(urlPattern) || [];
      urls.slice(0, 10).forEach((url, index) => {
        try {
          const name = new URL(url).hostname.replace('www.', '');
          citations.push({
            number: index + 1,
            url: url,
            title: name,
            name: name
          });
        } catch (e) {
          console.error('Error parsing fallback URL:', e);
        }
      });
    }
    
    console.log(`Extracted ${citations.length} citations from API response`);
    
    return {
      content: contentString,
      citations
    };
  } catch (error) {
    const errorMessage = `An error occurred for prompt '${prompt}': ${error}`;
    console.error(errorMessage);
    return {
      content: errorMessage,
      citations: []
    };
  }
}

// --- REWRITTEN WIDGET SIZING ---
function calculateWidgetSize(content: string): { w: number; h: number } {
  // Return a smaller, uniform size for the summary view.
  return { w: 2, h: 4 };
}

function extractCitations(content: string): Array<{ number: number; url: string; title: string }> {
    // This function can be simplified as citations are now extracted directly in executeSingleQuery
    return [];
}

async function runQueriesInParallel(prompts: string[], conversationHistory: ConversationMessage[] = []): Promise<SubPrompt[]> {
  if (!prompts.length) return [];
  try {
    const delayedPromises = prompts.map((prompt, index) => 
      new Promise<SubPrompt>((resolve) => {
        setTimeout(async () => {
          const result = await executeSingleQuery(prompt, conversationHistory);
          resolve({
            question: prompt, 
            answer: result.content,
            citations: result.citations
          });
        }, index * 2000);
      })
    );
    return await Promise.all(delayedPromises);
  } catch (error) {
    console.error('Error running parallel queries:', error);
    return [];
  }
}

function extractTitleFromQuestion(question: string): string {
  const cleaners = [
    "what is", "what are", "how is", "how are", "tell me about",
    "describe", "explain", "find", "can you", "please", "the", "a", "an"
  ];
  let text = question.toLowerCase();
  cleaners.forEach(cleaner => {
    text = text.replace(cleaner, "");
  });
  let title = text.trim().replace(/[?.,]/g, "");
  title = title.charAt(0).toUpperCase() + title.slice(1);
  const words = title.split(" ");
  if (words.length > 4) {
    title = words.slice(0, 4).join(" ");
  }
  return title;
}

// --- REWRITTEN PAYLOAD BUILDER ---
function buildUiPayload(results: SubPrompt[]): SearchResponse {
  // The new, fixed order and titles
  const widgetConfig = [
    { id: 'safety', title: 'Safety and Crime' },
    { id: 'amenities', title: 'Local Amenities' },
    { id: 'lifestyle', title: 'Lifestyle and Atmosphere' },
    { id: 'properties', title: 'Available Properties' },
    { id: 'weather', title: 'Weather and Climate' }
  ];

  if (!results || !Array.isArray(results) || results.length < widgetConfig.length) {
    return {
      generated_at: new Date().toISOString(),
      source: 'next-api',
      widget_count: 0,
      widgets: []
    };
  }

  const mapped: WidgetData[] = widgetConfig.map((config, index) => {
    const result = results[index];
    const contentStr = typeof result.answer === 'string' ? result.answer : JSON.stringify(result.answer);
    const size = calculateWidgetSize(contentStr);
    const citations = (result.citations && result.citations.length > 0) 
      ? result.citations 
      : extractCitations(contentStr);
    
    return {
      id: config.id,
      title: config.title, // Use the new static title
      content: result.answer,
      size,
      citations
    };
  });

  return {
    generated_at: new Date().toISOString(),
    source: 'next-api',
    widget_count: mapped.length,
    widgets: mapped
  };
}

export async function POST(request: NextRequest) {
  try {
    const { query, isFollowUp, existingWidgets = [], conversationHistory = [] } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    console.log('Processing housing search query:', query);

    if (isFollowUp) {
      console.log('Running single follow-up query...');
      const result = await executeSingleQuery(query, conversationHistory);
      const newWidgetId = `widget-${Date.now()}`;
      
      // Use a static title for follow-up and prepend the question to the content
      const uniqueTitle = "Follow up";
      const newContent = `### ${query}\n\n${result.content}`;

      const size = calculateWidgetSize(newContent);
      const citations = result.citations.length > 0 ? result.citations : extractCitations(result.content);
      
      const newWidget: WidgetData = {
        id: newWidgetId,
        title: uniqueTitle,
        content: newContent, // Use the combined content
        size,
        citations
      };
      
      return NextResponse.json({
        generated_at: new Date().toISOString(),
        source: 'next-api',
        widget_count: 1,
        widgets: [newWidget],
        is_followup: true
      });
    }

    const prompts = await generateSubPrompts(query);
    if (!prompts.length) {
      return NextResponse.json({ error: 'Failed to generate research questions' }, { status: 500 });
    }

    const results = await runQueriesInParallel(prompts, conversationHistory);
    const payload = buildUiPayload(results);

    console.log('Search completed, returning', payload.widget_count, 'widgets');
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Housing search error:', error);
    return NextResponse.json({ error: 'Failed to process search' }, { status: 500 });
  }
}
