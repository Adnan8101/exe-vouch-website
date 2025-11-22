import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  
  try {
    const response = await fetch(`https://id.rappytv.com/${userId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Discord-ID-Fetcher/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    
    if (!response.ok) {
      return NextResponse.json({ 
        displayName: null, 
        error: `HTTP ${response.status}` 
      }, { status: 200 });
    }
    
    const html = await response.text();
    
    // Multiple parsing strategies
    let displayName: string | null = null;
    
    // Strategy 1: Look for "Display Name:" pattern (case insensitive)
    const displayNameMatch = html.match(/Display Name[:\s]*([^<\n\r]+)/i);
    if (displayNameMatch && displayNameMatch[1]) {
      const name = displayNameMatch[1].trim();
      if (name && name !== 'N/A' && name.length > 0) {
        displayName = name;
      }
    }
    
    // Strategy 2: Parse as DOM and look for structured elements
    if (!displayName) {
      try {
        // Basic regex extraction for common patterns
        const patterns = [
          /<h1[^>]*>([^<]+)</i,
          /<h2[^>]*>([^<]+)</i,
          /username[^>]*>([^<]+)</i,
          /display-name[^>]*>([^<]+)</i,
        ];
        
        for (const pattern of patterns) {
          const match = html.match(pattern);
          if (match && match[1] && match[1].trim() !== 'N/A') {
            const candidate = match[1].trim();
            if (candidate.length > 0 && !candidate.includes('Discord') && !candidate.includes('ID')) {
              displayName = candidate;
              break;
            }
          }
        }
      } catch (parseError) {
        console.error('Parse error:', parseError);
      }
    }
    
    // Strategy 3: Extract from title
    if (!displayName) {
      const titleMatch = html.match(/<title[^>]*>([^<]+)</i);
      if (titleMatch && titleMatch[1]) {
        const title = titleMatch[1].trim().replace(/Discord ID|Profile|User|[\(\)\[\]]/gi, '').trim();
        if (title && title.length > 0) {
          displayName = title;
        }
      }
    }
    
    return NextResponse.json({ 
      displayName: displayName || null,
      userId 
    });
    
  } catch (error) {
    console.error('Error fetching display name:', error);
    return NextResponse.json({ 
      displayName: null, 
      error: 'Failed to fetch' 
    }, { status: 200 });
  }
}