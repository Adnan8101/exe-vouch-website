import { NextRequest, NextResponse } from 'next/server';

// Cache images for 7 days
const CACHE_DURATION = 7 * 24 * 60 * 60;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get('url');
    const width = searchParams.get('w') || '256';

    if (!imageUrl) {
      return new NextResponse('Missing image URL', { status: 400 });
    }

    // Validate Discord/allowed domains
    const allowedDomains = [
      'cdn.discordapp.com',
      'media.discordapp.net',
      'i.imgur.com',
      'cdn-icons-png.flaticon.com',
      'images-ext-1.discordapp.net',
    ];

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(imageUrl);
    } catch {
      return new NextResponse('Invalid URL', { status: 400 });
    }

    if (!allowedDomains.includes(parsedUrl.hostname)) {
      return new NextResponse('Domain not allowed', { status: 403 });
    }

    // Optimize Discord CDN URLs
    let optimizedUrl = imageUrl;
    if (parsedUrl.hostname.includes('discord')) {
      // Add or update size parameter
      if (optimizedUrl.includes('size=')) {
        optimizedUrl = optimizedUrl.replace(/size=\d+/g, `size=${width}`);
      } else {
        optimizedUrl += optimizedUrl.includes('?') ? `&size=${width}` : `?size=${width}`;
      }
    }

    // Fetch the image
    const imageResponse = await fetch(optimizedUrl, {
      next: { revalidate: CACHE_DURATION },
    });

    if (!imageResponse.ok) {
      return new NextResponse('Failed to fetch image', { status: imageResponse.status });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/png';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
        'CDN-Cache-Control': `public, s-maxage=${CACHE_DURATION}`,
        'Vercel-CDN-Cache-Control': `public, s-maxage=${CACHE_DURATION}`,
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
