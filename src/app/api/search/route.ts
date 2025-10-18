import { NextRequest, NextResponse } from 'next/server';
import Perplexity from '@perplexity-ai/perplexity_ai';

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
  size?: { w: number; h: number }; // Dynamic sizing
}

interface SearchResponse {
  generated_at: string;
  source: string;
  widget_count: number;
  widgets: WidgetData[];
  is_followup?: boolean; // Flag for follow-up queries
}

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Get system prompt from env or use default
const SYSTEM_PROMPT = process.env.PERPLEXITY_SYSTEM_PROMPT || 
  "You are a real estate research assistant providing concise, accurate information about housing and neighborhoods. Format responses with proper markdown including headers (use ### for main sections), bullet points, and numbered lists. Include relevant citations [1][2] after factual statements. Keep answers focused and under 400 words unless detailed analysis is requested. Always include complete words - never truncate (e.g., write 'area' not 'are'). Structure responses clearly with sections for key information.";

const PROMPT_SUFFIX = process.env.PERPLEXITY_PROMPT_SUFFIX || 
  " Provide a well-structured response with markdown formatting. Use ### headers for main sections. Include citations [1][2] for all facts. Write complete sentences without truncation. Keep the response concise (300-400 words) but comprehensive.";

async function generateSubPrompts(initialPrompt: string, conversationHistory: ConversationMessage[] = []): Promise<string[]> {
  try {
    const client = new Perplexity({
      apiKey: process.env.PERPLEXITY_API_KEY,
    });

    const messages: ConversationMessage[] = [
      {
        role: "system",
        content: "You are an AI assistant that breaks down a user's broad real estate query into exactly 3 specific, researchable questions. Return them as a numbered list. Consider the conversation context to avoid duplicate questions.",
      },
      ...conversationHistory.slice(-4), // Include last 2 exchanges for context
      {
        role: "user",
        content: `Based on the user's query: '${initialPrompt}', generate 3 distinct questions a real estate analyst should investigate. Cover broad topics like safety/crime rates, local amenities (schools, parks), and lifestyle/atmosphere. Avoid topics already covered in previous questions.`,
      },
    ];

    const completion = await client.chat.completions.create({
      model: "sonar",
      messages
    });
    
    const responseText = completion.choices[0].message.content;
    
    // Handle both string and array content types
    const contentString = typeof responseText === 'string' ? responseText : 
      Array.isArray(responseText) ? responseText.map(chunk => 
        'text' in chunk ? chunk.text : ''
      ).join('') : '';
    
    // Parse numbered list response, cap at 3 AI-generated prompts
    const allParsedLines = contentString.split('\n')
      .filter((line: string) => line.includes('. '))
      .map((line: string) => line.split('. ', 2)[1])
      .filter(Boolean);
    
    const prompts = allParsedLines.slice(0, 3);

    // Add specific rental and weather questions
    const rentalPrompt = `Find 2-3 specific houses or flats currently available for rent in the area mentioned in '${initialPrompt}'. IMPORTANT: For each property, start a new line with the full URL to the listing, then describe: 1. Address and price 2. Key features (bedrooms, bathrooms) 3. Nearby amenities within 5-10 minutes walk. Format each property as a separate paragraph with the URL on its own line.`;
    
    const weatherPrompt = `What are the current and typical weather conditions for the location mentioned in '${initialPrompt}'?`;
    
    prompts.push(rentalPrompt, weatherPrompt);

    return prompts.length >= 1 ? prompts : [];
  } catch (error) {
    console.error('Error generating sub-prompts:', error);
    return [];
  }
}

async function executeSingleQuery(prompt: string, conversationHistory: ConversationMessage[] = []): Promise<QueryResult> {
  try {
    const client = new Perplexity({
      apiKey: process.env.PERPLEXITY_API_KEY,
    });

    // Add prompt suffix for better formatting
    const enhancedPrompt = prompt + PROMPT_SUFFIX;

    const messages: ConversationMessage[] = [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      ...conversationHistory.slice(-6), // Include last 3 exchanges for context
      {
        role: "user",
        content: enhancedPrompt
      }
    ];

    const completion = await client.chat.completions.create({
      model: "sonar-pro",
      messages,
    });
    
    const responseContent = completion.choices[0].message.content;
    
    // Handle both string and array content types
    const contentString = typeof responseContent === 'string' ? responseContent : 
      Array.isArray(responseContent) ? responseContent.map(chunk => 
        'text' in chunk ? chunk.text : ''
      ).join('') : '';
    
    // Extract citations from API response - Perplexity includes citations in the response
    const citations: Array<{ number: number; url: string; title: string }> = [];
    
    // Check if response has citations field
    if ((completion as any).citations && Array.isArray((completion as any).citations)) {
      const apiCitations = (completion as any).citations;
      apiCitations.forEach((cite: string, index: number) => {
        citations.push({
          number: index + 1,
          url: cite,
          title: `Source ${index + 1}`
        });
      });
    } else {
      // Fallback: try to extract URLs from content using regex
      const urlPattern = /https?:\/\/[^\s\)]+/g;
      const urls = contentString.match(urlPattern) || [];
      urls.slice(0, 10).forEach((url, index) => {
        citations.push({
          number: index + 1,
          url: url,
          title: `Source ${index + 1}`
        });
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

// Helper: Calculate dynamic widget size based on content length (larger sizes to show more content)
function calculateWidgetSize(content: string): { w: number; h: number } {
  const length = content.length;
  
  // Larger sizes to display more content before opening widget
  // w: width units (2-3), h: height units (3-4)
  if (length < 400) return { w: 2, h: 3 }; // Small content
  if (length < 800) return { w: 2, h: 4 }; // Medium content - taller
  if (length < 1200) return { w: 3, h: 4 }; // Large content - wider and taller
  return { w: 3, h: 5 }; // Very large content - maximum size for readability
}

// Helper: Extract citations from content
function extractCitations(content: string): Array<{ number: number; url: string; title: string }> {
  const citations: Array<{ number: number; url: string; title: string }> = [];
  const citationPattern = /\[(\d+)\]/g;
  const matches = content.matchAll(citationPattern);
  
  for (const match of matches) {
    const num = parseInt(match[1]);
    if (!citations.find(c => c.number === num)) {
      citations.push({
        number: num,
        url: `#citation-${num}`, // Placeholder, will be replaced with actual URLs if available
        title: `Source ${num}`
      });
    }
  }
  
  return citations;
}

async function runQueriesInParallel(prompts: string[], conversationHistory: ConversationMessage[] = []): Promise<SubPrompt[]> {
  if (!prompts.length) return [];

  try {
    // Add delays between Promise creations to respect rate limits
    const delayedPromises = prompts.map((prompt, index) => 
      new Promise<SubPrompt>((resolve) => {
        setTimeout(async () => {
          const result = await executeSingleQuery(prompt, conversationHistory);
          resolve({ 
            question: prompt, 
            answer: result.content,
            citations: result.citations
          });
        }, index * 2000); // 2 second delay between each
      })
    );

    const results = await Promise.all(delayedPromises);
    return results;
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

  if (question.toLowerCase().includes("available for rent")) {
    return "Available Properties";
  }
  if (question.toLowerCase().includes("weather conditions")) {
    return "Weather & Climate";
  }

  const words = title.split(" ");
  if (words.length > 4) {
    title = words.slice(0, 4).join(" ");
  }

  return title;
}

function extractPropertyLinks(rentalAnswer: string) {
  if (!rentalAnswer) return [];

  const properties: Array<{ description: string; url?: string }> = [];
  const lines = rentalAnswer.split('\n');
  
  lines.forEach(line => {
    if (line.toLowerCase().includes('http') || 
        line.toLowerCase().includes('www.') || 
        line.toLowerCase().includes('.com') || 
        line.toLowerCase().includes('.co.uk')) {
      const url = line.split(' ').find(word => 
        word.startsWith('http') || word.startsWith('www')
      );
      properties.push({
        description: line.trim(),
        url
      });
    }
  });

  return properties;
}

function buildUiPayload(results: SubPrompt[]): SearchResponse {
  const widgetIds = ['safety', 'budget', 'student', 'transport', 'reviews', 'locations'];
  
  if (!results || !Array.isArray(results)) {
    return {
      generated_at: new Date().toISOString(),
      source: 'next-api',
      widget_count: 0,
      widgets: []
    };
  }

  const rentalAnswer = results.length > 3 ? results[3].answer : null;
  const properties = extractPropertyLinks(rentalAnswer || '');

  const mapped: WidgetData[] = [];

  // Map results to widgets with dynamic sizing and citations
  results.slice(0, 5).forEach((result, index) => {
    const widgetId = widgetIds[index];
    const title = extractTitleFromQuestion(result.question);
    const contentStr = typeof result.answer === 'string' ? result.answer : JSON.stringify(result.answer);
    const size = calculateWidgetSize(contentStr);
    // Use citations from query result if available, otherwise extract from content
    const citations = (result.citations && result.citations.length > 0) 
      ? result.citations 
      : extractCitations(contentStr);
    
    if (widgetId === 'locations') {
      mapped.push({
        id: 'locations',
        title: 'Available Properties',
        content: {
          properties,
          last_updated: new Date().toISOString()
        },
        size: { w: 3, h: 4 }, // Properties widget is larger to show more content
        citations: []
      });
    } else if (widgetId) {
      mapped.push({
        id: widgetId,
        title,
        content: result.answer,
        size,
        citations
      });
    }
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
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    console.log('Processing housing search query:', query);
    console.log('Is follow-up?', isFollowUp);
    console.log('Existing widgets:', existingWidgets.length);
    console.log('Conversation history length:', conversationHistory.length);

    if (isFollowUp) {
      // Handle follow-up query - single focused query with conversation context
      console.log('Running single follow-up query with RAG memory...');
      const result = await executeSingleQuery(query, conversationHistory);
      
      // Generate a unique widget ID
      const newWidgetId = `widget-${Date.now()}`;
      
      // Extract title and ensure it's unique
      let title = extractTitleFromQuestion(query);
      const existingTitles = existingWidgets.map((w: any) => w.title.toLowerCase());
      let titleSuffix = 1;
      let uniqueTitle = title;
      
      // Prevent duplicate titles
      while (existingTitles.includes(uniqueTitle.toLowerCase())) {
        uniqueTitle = `${title} ${titleSuffix}`;
        titleSuffix++;
      }
      
      const size = calculateWidgetSize(result.content);
      const citations = result.citations.length > 0 ? result.citations : extractCitations(result.content);
      
      const newWidget: WidgetData = {
        id: newWidgetId,
        title: uniqueTitle,
        content: result.content,
        size,
        citations
      };
      
      console.log('Follow-up query completed, returning 1 new widget:', uniqueTitle);
      
      return NextResponse.json({
        generated_at: new Date().toISOString(),
        source: 'next-api',
        widget_count: 1,
        widgets: [newWidget],
        is_followup: true
      });
    }

    // Original flow: Initial search with parallel queries
    // Step 1: Generate sub-prompts with conversation context
    const prompts = await generateSubPrompts(query, conversationHistory);
    if (!prompts.length) {
      return NextResponse.json(
        { error: 'Failed to generate research questions' },
        { status: 500 }
      );
    }

    console.log('Generated prompts:', prompts.length);

    // Step 2: Run parallel queries with conversation context
    const results = await runQueriesInParallel(prompts, conversationHistory);
    
    // Step 3: Build UI payload
    const payload = buildUiPayload(results);

    console.log('Search completed, returning', payload.widget_count, 'widgets');

    return NextResponse.json(payload);
  } catch (error) {
    console.error('Housing search error:', error);
    return NextResponse.json(
      { error: 'Failed to process search' },
      { status: 500 }
    );
  }
}