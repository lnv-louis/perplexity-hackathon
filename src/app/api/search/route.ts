import { NextRequest, NextResponse } from 'next/server';
import Perplexity from '@perplexity-ai/perplexity_ai';

interface SubPrompt {
  question: string;
  answer: string;
  citations?: Array<{ number: number; url: string; title: string }>;
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

async function generateSubPrompts(initialPrompt: string): Promise<string[]> {
  try {
    const client = new Perplexity({
      apiKey: process.env.PERPLEXITY_API_KEY,
    });

    const messages = [
      {
        role: "system" as const,
        content: "You are an AI assistant that breaks down a user's broad real estate query into exactly 3 specific, researchable questions. Return them as a numbered list.",
      },
      {
        role: "user" as const,
        content: `Based on the user's query: '${initialPrompt}', generate 3 distinct questions a real estate analyst should investigate. Cover broad topics like safety/crime rates, local amenities (schools, parks), and lifestyle/atmosphere.`,
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

async function executeSingleQuery(prompt: string): Promise<string> {
  try {
    const client = new Perplexity({
      apiKey: process.env.PERPLEXITY_API_KEY,
    });

    const systemPrompt = {
      role: "system" as const,
      content: "You are an expert AI real estate analyst. Your answer should be a concise summary, limited to a maximum of 3-4 sentences or a short bulleted list. Get straight to the point. Include citations as [1], [2], etc."
    };
    
    const messages = [systemPrompt, { role: "user" as const, content: prompt }];

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
    
    return contentString;
  } catch (error) {
    const errorMessage = `An error occurred for prompt '${prompt}': ${error}`;
    console.error(errorMessage);
    return errorMessage;
  }
}

// Helper: Calculate dynamic widget size based on content length
function calculateWidgetSize(content: string): { w: number; h: number } {
  const length = content.length;
  
  // Base size is 1x1 (300x200px in grid units)
  // Increase height based on content length
  if (length < 200) return { w: 1, h: 1 }; // Small content
  if (length < 400) return { w: 1, h: 2 }; // Medium content
  if (length < 800) return { w: 2, h: 2 }; // Large content
  return { w: 2, h: 3 }; // Very large content
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

async function runQueriesInParallel(prompts: string[]): Promise<SubPrompt[]> {
  if (!prompts.length) return [];

  try {
    // Add delays between Promise creations to respect rate limits
    const delayedPromises = prompts.map((prompt, index) => 
      new Promise<SubPrompt>((resolve) => {
        setTimeout(async () => {
          const answer = await executeSingleQuery(prompt);
          resolve({ question: prompt, answer });
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
    const citations = extractCitations(contentStr);
    
    if (widgetId === 'locations') {
      mapped.push({
        id: 'locations',
        title: 'Available Properties',
        content: {
          properties,
          last_updated: new Date().toISOString()
        },
        size: { w: 2, h: 2 }, // Properties widget is always larger
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
    const { query, isFollowUp, existingWidgets } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    console.log('Processing housing search query:', query);
    console.log('Is follow-up?', isFollowUp);

    if (isFollowUp) {
      // Handle follow-up query - single focused query, not parallel
      console.log('Running single follow-up query...');
      const answer = await executeSingleQuery(query);
      
      // Generate a unique widget ID
      const newWidgetId = `widget-${Date.now()}`;
      const title = extractTitleFromQuestion(query);
      const size = calculateWidgetSize(answer);
      const citations = extractCitations(answer);
      
      const newWidget: WidgetData = {
        id: newWidgetId,
        title,
        content: answer,
        size,
        citations
      };
      
      console.log('Follow-up query completed, returning 1 new widget');
      
      return NextResponse.json({
        generated_at: new Date().toISOString(),
        source: 'next-api',
        widget_count: 1,
        widgets: [newWidget],
        is_followup: true
      });
    }

    // Original flow: Initial search with parallel queries
    // Step 1: Generate sub-prompts
    const prompts = await generateSubPrompts(query);
    if (!prompts.length) {
      return NextResponse.json(
        { error: 'Failed to generate research questions' },
        { status: 500 }
      );
    }

    console.log('Generated prompts:', prompts.length);

    // Step 2: Run parallel queries
    const results = await runQueriesInParallel(prompts);
    
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