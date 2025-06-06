import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { githubUsername } = await request.json();
    
    if (!githubUsername) {
      return NextResponse.json({ error: 'GitHub username is required' }, { status: 400 });
    }

    // Call your existing portfolio generator API
    const portfolioResponse = await fetch(process.env.PORTFOLIO_GENERATOR_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username: githubUsername })
    });

    if (!portfolioResponse.ok) {
      const errorText = await portfolioResponse.text();
      console.error('Portfolio generator error:', errorText);
      return NextResponse.json(
        { error: `Portfolio generator error: ${portfolioResponse.status} - ${errorText}` },
        { status: portfolioResponse.status }
      );
    }

    const portfolioData = await portfolioResponse.json();
    
    return NextResponse.json({ 
      success: true, 
      data: portfolioData,
      username: githubUsername 
    });

  } catch (error) {
    console.error('Portfolio generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}