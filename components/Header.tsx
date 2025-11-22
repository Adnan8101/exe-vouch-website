'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0a0a0a]/95 via-[#1a1a1a]/95 to-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#c9a76f]/20 shadow-lg shadow-[#c9a76f]/5">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image 
                  src="/Extreme_Official.webp" 
                  alt="EXE" 
                  width={40}
                  height={40}
                  quality={90}
                  priority
                  className="h-10 w-10 rounded-full ring-2 ring-[#c9a76f]/30 group-hover:ring-[#c9a76f]/60 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-[#c9a76f]/20 blur-md group-hover:bg-[#c9a76f]/40 transition-all duration-300" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#c9a76f] via-[#d4b786] to-[#c9a76f] bg-clip-text text-transparent tracking-tight group-hover:from-[#d4b786] group-hover:to-[#c9a76f] transition-all duration-300">
                Vouches
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/"
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  pathname === '/'
                    ? 'bg-gradient-to-r from-[#c9a76f] to-[#d4b786] text-black shadow-lg shadow-[#c9a76f]/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]/50'
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  pathname === '/about'
                    ? 'bg-gradient-to-r from-[#c9a76f] to-[#d4b786] text-black shadow-lg shadow-[#c9a76f]/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]/50'
                }`}
              >
                About
              </Link>
              <a
                href="https://discord.gg/exeop"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-2.5 rounded-full text-sm font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#5865F2]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2] to-[#7289DA] opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#7289DA] to-[#5865F2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2 text-white">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Discord
                </span>
              </a>
            </div>

            {/* Mobile Discord Button & Hamburger */}
            <div className="md:hidden flex items-center gap-3">
              <a
                href="https://discord.gg/qn6p5nNTkV"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-11 h-11 rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-[#5865F2]/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2] via-[#7289DA] to-[#5865F2] animate-gradient" />
                <div className="absolute inset-0 bg-gradient-to-tl from-[#7289DA]/50 via-transparent to-[#5865F2]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg 
                  className="relative w-6 h-6 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
              </a>

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-[#1a1a1a]/50 border border-[#c9a76f]/20 hover:border-[#c9a76f]/40 transition-all duration-300 hover:bg-[#1a1a1a]/70 active:scale-95"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-[#c9a76f] transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-[#c9a76f] transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-[#c9a76f] transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={closeMenu}
        />
        
        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-l border-[#c9a76f]/20 shadow-2xl shadow-[#c9a76f]/10 transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 pt-24 gap-3">
            <Link
              href="/"
              onClick={closeMenu}
              className={`text-lg font-semibold py-4 px-6 rounded-xl transition-all duration-300 ${
                pathname === '/'
                  ? 'bg-gradient-to-r from-[#c9a76f] to-[#d4b786] text-black shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a] border border-transparent hover:border-[#c9a76f]/20'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className={`text-lg font-semibold py-4 px-6 rounded-xl transition-all duration-300 ${
                pathname === '/about'
                  ? 'bg-gradient-to-r from-[#c9a76f] to-[#d4b786] text-black shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a] border border-transparent hover:border-[#c9a76f]/20'
              }`}
            >
              About
            </Link>
            <a
              href="https://discord.gg/qn6p5nNTkV"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="group relative text-lg font-bold py-4 px-6 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-[#5865F2]/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2] to-[#7289DA]" />
              <span className="relative flex items-center justify-center gap-3 text-white">
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
