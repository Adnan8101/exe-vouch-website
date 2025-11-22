'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { StatCardSkeleton } from '@/components/Skeletons';
import { FaCheckCircle } from 'react-icons/fa';
import { FaGift } from 'react-icons/fa6';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function VouchesPage() {
  const { data: summary, isLoading } = useSWR('/api/summary', fetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: false,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://media.discordapp.net/attachments/1330153501258678395/1439227722646814750/image.png?ex=6919c0c4&is=69186f44&hm=2c3b9200c740c37c11ba6b40cf6b752b783e33d2910abbd03d269be53afc5968&=&format=webp&quality=lossless&width=1470&height=790)',
            }}
          />
          {/* Sophisticated Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a76f]/5 via-transparent to-transparent" />
          {/* Subtle Vignette Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 flex justify-center"
            >
              <Image 
                src="/Extreme_Official.webp" 
                alt="EXE Logo" 
                width={80}
                height={80}
                quality={90}
                priority
                className="h-20 w-20 rounded-full border-4 border-white/20 shadow-2xl shadow-[#c9a76f]/50 backdrop-blur-sm"
              />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent tracking-tight"
              style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Stats
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 font-light"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              Track all giveaways, nitro gifts, and community contributions in real-time.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <Link
                href="/"
                className="group px-8 py-3 bg-[#c9a76f] text-black font-semibold rounded-full hover:bg-[#d4b786] transition-all duration-500 hover:shadow-2xl hover:shadow-[#c9a76f]/40 hover:scale-105 backdrop-blur-sm text-sm"
              >
                <span className="relative z-10">View Vouches</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              <span className="text-[#c9a76f]">Live</span> Status
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
                {/* Total Vouches - Premium Golden Card */}
                <div
                  className="relative group overflow-hidden bg-gradient-to-br from-[#c9a76f]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#c9a76f]/40 rounded-2xl p-5 hover:border-[#c9a76f] transition-all duration-200 hover:shadow-xl hover:shadow-[#c9a76f]/40 hover:scale-[1.02] hover:-translate-y-1 min-h-[140px] will-change-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a76f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="flex flex-col items-center justify-center h-full">
                    <FaCheckCircle className="text-[#c9a76f] text-4xl mb-3" />
                    <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase text-center">Total Vouches</p>
                    <p className="text-3xl font-black text-white tracking-tight">
                      {summary?.totalVouches || 0}
                    </p>
                  </div>
                </div>

                {/* Total INR - Money Green Card */}
                <div
                  className="relative group overflow-hidden bg-gradient-to-br from-[#22c55e]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#22c55e]/40 rounded-2xl p-5 hover:border-[#22c55e] transition-all duration-200 hover:shadow-xl hover:shadow-[#22c55e]/40 hover:scale-[1.02] hover:-translate-y-1 min-h-[140px] will-change-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-5xl mb-3">₹</div>
                    <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase text-center">Total INR</p>
                    <p className="text-2xl font-black text-[#22c55e]">
                      ₹{summary?.totalINR?.toLocaleString('en-IN') || 0}
                    </p>
                  </div>
                </div>

                {/* Nitro - Pink Premium Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#ff6bde]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#ff6bde]/40 rounded-2xl p-5 hover:border-[#ff6bde] transition-all duration-500 hover:shadow-2xl hover:shadow-[#ff6bde]/50 min-h-[140px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6bde]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex flex-col items-center justify-center h-full">
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        filter: [
                          "drop-shadow(0 0 8px rgba(255,107,222,0.6))",
                          "drop-shadow(0 0 16px rgba(255,107,222,1))",
                          "drop-shadow(0 0 8px rgba(255,107,222,0.6))",
                        ],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="mb-3"
                    >
                      <Image 
                        src="https://media.discordapp.net/attachments/1415272793788121248/1439346779136069883/Unknown-removebg-preview.png?ex=691a2fa5&is=6918de25&hm=9cb68d076911e5e72d0869ab7535d4b17147f30500c6c0dba3c991c23c520afd&=&format=webp&quality=lossless&width=450&height=450" 
                        alt="Nitro" 
                        width={48}
                        height={48}
                        quality={85}
                        className="w-12 h-12 object-contain"
                      />
                    </motion.div>
                    <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase text-center">Nitro</p>
                    <motion.p 
                      className="text-3xl font-black text-[#ff6bde]"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {summary?.nitro || 0}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Decor - Purple Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#8a67ff]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#8a67ff]/40 rounded-2xl p-5 hover:border-[#8a67ff] transition-all duration-500 hover:shadow-2xl hover:shadow-[#8a67ff]/50 min-h-[140px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8a67ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex flex-col items-center justify-center h-full">
                    <motion.div
                      animate={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="mb-3"
                    >
                      <FaGift className="text-[#8a67ff] text-4xl drop-shadow-[0_0_12px_rgba(138,103,255,0.8)]" />
                    </motion.div>
                    <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase text-center">Decor</p>
                    <motion.p 
                      className="text-3xl font-black text-[#8a67ff]"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {summary?.decors || 0}
                    </motion.p>
                  </div>
                </motion.div>

                {/* OWO - Light Pink Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#ffb6c1]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#ffb6c1]/40 rounded-2xl p-5 hover:border-[#ffb6c1] transition-all duration-500 hover:shadow-2xl hover:shadow-[#ffb6c1]/50 min-h-[140px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffb6c1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex flex-col items-center justify-center h-full">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        filter: [
                          "drop-shadow(0 0 8px rgba(255,182,193,0.6))",
                          "drop-shadow(0 0 16px rgba(255,182,193,1))",
                          "drop-shadow(0 0 8px rgba(255,182,193,0.6))",
                        ],
                      }}
                      transition={{ 
                        rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                        filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className="mb-3"
                    >
                      <Image 
                        src="https://i.imgur.com/zNBBkdl.png" 
                        alt="OWO" 
                        width={48}
                        height={48}
                        quality={85}
                        className="w-12 h-12 object-contain rounded-full"
                      />
                    </motion.div>
                    <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase text-center">OWO</p>
                    <motion.p 
                      className="text-3xl font-black text-[#ffb6c1]"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {summary?.owo ? (
                        summary.owo >= 1000000 ? 
                          `${(summary.owo / 1000000).toFixed(1)}M` : 
                          summary.owo >= 1000 ? 
                            `${(summary.owo / 1000).toFixed(1)}K` : 
                            summary.owo.toLocaleString()
                      ) : 0}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Crypto - Bitcoin Orange Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -5,
                  }}
                  className="relative group overflow-hidden bg-gradient-to-br from-[#f7931a]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#f7931a]/40 rounded-2xl p-5 hover:border-[#f7931a] transition-all duration-500 hover:shadow-2xl hover:shadow-[#f7931a]/50 min-h-[140px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7931a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex flex-col items-center justify-center h-full">
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        filter: [
                          "drop-shadow(0 0 8px rgba(247,147,26,0.6))",
                          "drop-shadow(0 0 16px rgba(247,147,26,1))",
                          "drop-shadow(0 0 8px rgba(247,147,26,0.6))",
                        ],
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="mb-3"
                    >
                      <Image 
                        src="https://cdn-icons-png.flaticon.com/512/7048/7048906.png" 
                        alt="Crypto" 
                        width={48}
                        height={48}
                        quality={85}
                        className="w-12 h-12 object-contain"
                      />
                    </motion.div>
                    <p className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase text-center">Crypto Giveaways</p>
                    <motion.p 
                      className="text-3xl font-black text-[#f7931a]"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {summary?.cryptoGiveaways || 0}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
