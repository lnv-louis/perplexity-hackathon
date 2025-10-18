import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    return NextResponse.json({ 
      message: "API works!", 
      query: query,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Test API failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "API route is working" });
}