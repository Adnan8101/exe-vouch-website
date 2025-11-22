'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedUsernameProps {
  username: string;
  userId?: string; // Add optional userId prop for fetching display name
  role: 'founder' | 'owner' | 'girlOwner' | 'manager' | 'earlySupport' | 'default';
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export default function AnimatedUsername({ username, userId, role, className = '' }: AnimatedUsernameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [displayName, setDisplayName] = useState(username);
  const [loading, setLoading] = useState(false);

  // Fetch display name from rappytv.com if userId is provided
  useEffect(() => {
    if (!userId) return;
    
    const fetchDisplayName = async () => {
      setLoading(true);
      try {
        // Use our API endpoint to avoid CORS issues
        const response = await fetch(`/api/display-name?userId=${userId}`);
        
        if (!response.ok) {
          console.log(`API request failed for ${userId}: ${response.status}`);
          return;
        }
        
        const data = await response.json();
        
        if (data.displayName && data.displayName !== username && data.displayName !== 'N/A') {
          setDisplayName(data.displayName);
          console.log(`✅ Display name fetched for ${userId}: ${data.displayName}`);
        } else {
          console.log(`❌ No valid display name found for ${userId}, keeping: ${username}`);
        }
        
      } catch (error) {
        console.log(`Failed to fetch display name for ${userId}:`, error);
        // Keep original username on error
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small delay to avoid overwhelming the API and spread requests
    const timeoutId = setTimeout(fetchDisplayName, Math.random() * 1000 + 500);
    return () => clearTimeout(timeoutId);
  }, [userId, username]);

  // Simple colors for each role
  const roleColors = {
    founder: '#FFD700',
    owner: '#FFD700', 
    girlOwner: '#ff69b4',
    manager: '#ffffff',
    earlySupport: '#c9a76f',
    default: '#c9a76f', // Changed from white to match vouch ID box color
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      // Small area around text for dots
      canvas.width = rect.width + 40;
      canvas.height = rect.height + 20;
      canvas.style.width = (rect.width + 40) + 'px';
      canvas.style.height = (rect.height + 20) + 'px';
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Create sparkle dots moving smoothly around username
    const color = roleColors[role] || roleColors.default;
    const dots: Dot[] = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2, // Smooth movement
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 2 + 1, // 1-3px size
      opacity: Math.random() * 0.3 + 0.7, // Fixed opacity range
      color: color,
    }));

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        // Move dots continuously
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Keep fixed opacity - no blinking
        // dot.opacity stays constant

        // Wrap around edges smoothly
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        // Draw simple sparkle with subtle glow
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = 6;
        ctx.fillStyle = `${dot.color}${Math.floor(dot.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [role, mounted]);

  const color = roleColors[role] || roleColors.default;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none opacity-100"
        style={{ 
          zIndex: 0, 
          left: '-20px', 
          top: '-10px',
          background: 'transparent',
          border: 'none'
        }}
      />
      <span
        className="relative z-10 font-medium inline-block"
        style={{
          color: color,
          fontSize: '1rem',
          background: 'transparent'
        }}
      >
        {username}
      </span>
    </div>
  );
}
