// Generate a tiny blur placeholder for images
export function generateBlurDataURL(color: string = '#1a1a1a'): string {
  // 8x8 pixel solid color SVG
  const svg = `
    <svg width="8" height="8" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect width="8" height="8" fill="${color}"/>
    </svg>
  `;
  
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// Optimize Discord image URL
export function optimizeDiscordImage(url: string, size: number = 256): string {
  if (!url) return url;
  
  try {
    const parsedUrl = new URL(url);
    
    // Only optimize Discord CDN URLs
    if (parsedUrl.hostname.includes('discord')) {
      // Remove or update size parameter
      if (url.includes('size=')) {
        return url.replace(/size=\d+/g, `size=${size}`);
      } else {
        return url + (url.includes('?') ? `&size=${size}` : `?size=${size}`);
      }
    }
    
    return url;
  } catch {
    return url;
  }
}

// Get image through proxy for better caching
export function getProxiedImageUrl(url: string, width: number = 256): string {
  if (!url) return url;
  
  // Only proxy external images in production
  if (process.env.NODE_ENV === 'production') {
    return `/api/image-proxy?url=${encodeURIComponent(url)}&w=${width}`;
  }
  
  // In development, just optimize the URL
  return optimizeDiscordImage(url, width);
}
