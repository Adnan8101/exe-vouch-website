'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { StatCardSkeleton, TeamMemberSkeleton, FounderCardSkeleton } from '@/components/Skeletons';
import { FaCheckCircle, FaGift } from 'react-icons/fa';
import FounderUsername from '@/components/FounderUsername';

const OptimizedBackground = dynamic(() => import('@/components/OptimizedBackground'), {
  ssr: false,
  loading: () => null,
});

const AnimatedUsername = dynamic(() => import('@/components/AnimatedUsername'), {
  ssr: false,
  loading: () => <span className="inline-block px-3 py-1.5">Loading...</span>,
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TeamMember {
  userId: string;
  username: string;
  avatarUrl: string | null;
  role: string;
  order: number;
}

interface TeamData {
  founder: TeamMember[];
  owners: TeamMember[];
  girlOwners: TeamMember[];
  managers: TeamMember[];
  earlySupport: TeamMember[];
}

// Suppress console warnings in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  const noop = () => {};
  ['log', 'debug', 'info'].forEach((method) => {
    (console as any)[method] = noop;
  });
}

export default function AboutPage() {
  const { data: team, isLoading: teamLoading } = useSWR<TeamData>('/api/team', fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
  
  const { data: summary, isLoading: summaryLoading } = useSWR('/api/summary', fetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: false,
  });
  return (
    <div className="min-h-screen relative">
      {/* Optimized Sparkle Background */}
      <OptimizedBackground />
      
      {/* Hero Section */}
      <section className="relative py-8 px-6 overflow-hidden z-10">
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-10">
            <div className="mb-4 flex justify-center">
              <Image 
                src="/Extreme_Official.webp" 
                alt="EXE Logo" 
                width={80}
                height={80}
                quality={90}
                priority
                className="h-20 w-20 rounded-full border-4 border-white/20 shadow-2xl shadow-[#c9a76f]/50 backdrop-blur-sm"
              />
            </div>
            
            <h1 
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent tracking-tight"
              style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              EXE
            </h1>
            
            <p 
              className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 font-light"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              EXE is back — louder, richer, and vibing harder than ever. Once a powerhouse in the Indian gaming scene with 22k members, the server was nuked and went silent for 3 years. But now, it's reborn as a pure chill community: daily VCs, music, memes, movie nights, crazy giveaways, and nonstop good vibes. No toxicity, no pressure—just a place where people remember your name and treat you like family. EXE isn't trying to be the biggest; just the best place to vibe, chat, and enjoy real company. Welcome home.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Link
                href="/"
                className="group px-8 py-3 bg-[#c9a76f] text-black font-semibold rounded-full hover:bg-[#d4b786] transition-all duration-200 hover:shadow-xl hover:shadow-[#c9a76f]/30 hover:scale-105 backdrop-blur-sm text-sm"
              >
                <span className="relative z-10">View Vouches</span>
              </Link>
            </div>
          </div>

          {/* Summary Stats */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">
              <span className="text-[#c9a76f]">Live</span> Status
            </h2>

{summaryLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto items-stretch">
                {/* Total Vouches - Premium Golden Card */}
                <div
                  className="relative group overflow-hidden bg-gradient-to-br from-[#c9a76f]/30 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#c9a76f]/60 rounded-2xl p-6 hover:border-[#c9a76f] transition-all duration-150 hover:shadow-[0_0_25px_rgba(201,167,111,0.4)] hover:scale-[1.02] hover:-translate-y-1 flex flex-col items-center justify-center h-full"
                  style={{ willChange: 'transform', contain: 'layout style paint' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a76f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <FaCheckCircle className="text-[#c9a76f] text-4xl mb-3" />
                  <p className="text-sm mb-2 font-black tracking-wider uppercase bg-gradient-to-r from-[#c9a76f] via-[#f4e5c3] to-[#c9a76f] bg-clip-text text-transparent text-center" style={{ letterSpacing: '0.1em' }}>Total Vouches</p>
                  <p className="text-3xl font-black text-white tracking-tight text-center">
                    {summary?.totalVouches || 0}
                  </p>
                </div>

                {/* Total INR - Money Green Card */}
                <div
                  className="relative group overflow-hidden bg-gradient-to-br from-[#22c55e]/30 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#22c55e]/60 rounded-2xl p-6 hover:border-[#22c55e] transition-all duration-200 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center h-full"
                  style={{ willChange: 'transform', contain: 'layout style paint' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="text-4xl mb-2">
                    ₹
                  </div>
                  <p className="text-xs mb-1.5 font-bold tracking-wide uppercase text-[#22c55e]/80 text-center">Total INR</p>
                  <p className="text-xl font-bold text-[#22c55e] text-center">
                    ₹{summary?.totalINR?.toLocaleString('en-IN') || 0}
                  </p>
                </div>

                {/* Nitro - Pink Premium Card */}
                <div
                  className="relative group overflow-hidden bg-gradient-to-br from-[#ff6bde]/30 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#ff6bde]/60 rounded-2xl p-6 hover:border-[#ff6bde] transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,107,222,0.6)] hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center h-full"
                  style={{ willChange: 'transform', contain: 'layout style paint' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6bde]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <Image 
                    src="https://cdn.discordapp.com/emojis/1360507855769305160.gif"
                    alt="Nitro" 
                    width={40}
                    height={40}
                    quality={75}
                    className="w-10 h-10 mb-2 object-contain"
                  />
                  <p className="text-xs mb-1.5 font-bold tracking-wide uppercase text-[#ff6bde]/80 text-center">Nitro Boosters</p>
                  <p className="text-2xl font-bold text-[#ff6bde] text-center">
                    {summary?.nitro || 0}
                  </p>
                </div>

                {/* Decor - Purple Card */}
                <div
                  className="relative group overflow-hidden bg-gradient-to-br from-[#8a67ff]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#8a67ff]/40 rounded-2xl p-6 hover:border-[#8a67ff] transition-all duration-200 hover:shadow-xl hover:shadow-[#8a67ff]/40 hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center h-full"
                  style={{ willChange: 'transform', contain: 'layout style paint' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8a67ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <FaGift className="text-[#8a67ff] text-3xl mb-2" />
                  <p className="text-xs mb-1.5 font-bold tracking-wide uppercase text-[#8a67ff]/80 text-center">Decorations</p>
                  <p className="text-2xl font-bold text-[#8a67ff] text-center">
                    {summary?.decors || 0}
                  </p>
                </div>

                {/* OWO - Light Pink Card */}
                <div
                  className="relative group overflow-hidden bg-gradient-to-br from-[#ffb6c1]/30 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#ffb6c1]/60 rounded-2xl p-6 hover:border-[#ffb6c1] transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,182,193,0.6)] hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center h-full"
                  style={{ willChange: 'transform', contain: 'layout style paint' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffb6c1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <Image 
                    src="https://i.imgur.com/zNBBkdl.png" 
                    alt="OWO" 
                    width={40}
                    height={40}
                    quality={75}
                    className="w-10 h-10 mb-2 object-contain rounded-full"
                  />
                  <p className="text-xs mb-1.5 font-bold tracking-wide uppercase text-[#ffb6c1]/80 text-center">Owo Currency</p>
                  <p className="text-2xl font-bold text-[#ffb6c1] text-center">
                    {summary?.owo ? (
                      summary.owo >= 1000000 ? 
                        `${(summary.owo / 1000000).toFixed(1)}M` : 
                        summary.owo >= 1000 ? 
                          `${(summary.owo / 1000).toFixed(1)}K` : 
                          summary.owo.toLocaleString()
                    ) : 0}
                  </p>
                </div>

                {/* Crypto - Bitcoin Orange Card */}
                <div
                  className="relative group overflow-hidden bg-gradient-to-br from-[#f7931a]/20 via-[#1a1a1a] to-[#0a0a0a] border-2 border-[#f7931a]/40 rounded-2xl p-6 hover:border-[#f7931a] transition-all duration-200 hover:shadow-xl hover:shadow-[#f7931a]/40 hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center h-full"
                  style={{ willChange: 'transform', contain: 'layout style paint' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7931a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <Image 
                    src="https://cdn-icons-png.flaticon.com/512/7048/7048906.png" 
                    alt="Crypto" 
                    width={40}
                    height={40}
                    quality={75}
                    className="w-10 h-10 mb-2 object-contain"
                  />
                  <p className="text-xs mb-1.5 font-bold tracking-wide uppercase text-[#f7931a]/80 text-center">Crypto Giveaways</p>
                  <p className="text-2xl font-bold text-[#f7931a] text-center">
                    {summary?.cryptoGiveaways || 0}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Team Members Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="text-[#c9a76f]">Our</span> Team
            </h2>

            {/* Founder */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3">
                  <Image 
                    src="/founder.png"
                    alt="Founder Badge"
                    width={48}
                    height={48}
                    quality={90}
                    className="w-12 h-12 object-contain"
                  />
                  <h3 className="text-3xl font-black bg-gradient-to-r from-[#c9a76f] via-[#d4b786] to-[#c9a76f] bg-clip-text text-transparent" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em', margin: 0, padding: 0 }}>FOUNDER</h3>
                </div>
              </div>
              <div className="flex justify-center">
                {teamLoading ? (
                  <FounderCardSkeleton />
                ) : team?.founder?.[0] ? (
                  <a 
                    href={`https://id.rappytv.com/${team.founder[0].userId}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative group overflow-hidden bg-gradient-to-br from-[#4a4a3a]/90 via-[#2a2a2a] to-[#1a1a1a] border-4 border-[#c9a76f] rounded-2xl p-12 text-center transition-all duration-500 hover:shadow-[0_0_60px_rgba(201,167,111,0.8)] hover:scale-105 hover:-translate-y-2 max-w-lg"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,167,111,0.15),transparent_70%)]" />
                    <div className="relative z-10 flex flex-col items-center">
                      {team.founder[0].avatarUrl ? (
                        <Image 
                          src={team.founder[0].avatarUrl}
                          alt={team.founder[0].username}
                          width={200}
                          height={200}
                          quality={90}
                          priority
                          unoptimized={team.founder[0].avatarUrl.includes('.gif')}
                          className="w-36 h-36 rounded-full mx-auto mb-5 border-4 border-[#c9a76f] shadow-2xl shadow-[#c9a76f]/50 ring-4 ring-[#c9a76f]/30"
                        />
                      ) : (
                          <div className="w-36 h-36 rounded-full mx-auto mb-5 border-4 border-[#c9a76f] shadow-2xl shadow-[#c9a76f]/50 bg-gradient-to-br from-[#c9a76f] to-[#d4b786] flex items-center justify-center ring-4 ring-[#c9a76f]/30">
                            <span className="text-5xl font-black text-black">{team.founder[0].username.charAt(0).toUpperCase()}</span>
                          </div>
                      )}
                      <FounderUsername username={team.founder[0].username} className="mb-2" />
                      <p className="text-gray-400 text-xs font-mono bg-black/30 rounded-lg px-3 py-1.5 inline-block">{team.founder[0].userId}</p>
                    </div>
                  </a>
                ) : (
                    <a 
                      href="https://id.rappytv.com/959653911923396629" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative group overflow-hidden bg-gradient-to-br from-[#4a4a3a]/90 via-[#2a2a2a] to-[#1a1a1a] border-4 border-[#c9a76f] rounded-2xl p-12 text-center transition-all duration-500 hover:shadow-[0_0_60px_rgba(201,167,111,0.8)] hover:scale-105 hover:-translate-y-2 max-w-lg"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,167,111,0.15),transparent_70%)]" />
                    <div className="relative z-10 flex flex-col items-center">
                        <Image 
                          src="https://cdn.discordapp.com/avatars/959653911923396629/1a829abb7020436cbca22765be4e331b.png?size=1024" 
                          alt="imunknown69" 
                          width={200}
                          height={200}
                          quality={90}
                          priority
                          className="w-36 h-36 rounded-full mx-auto mb-5 border-4 border-[#c9a76f] shadow-2xl shadow-[#c9a76f]/50 ring-4 ring-[#c9a76f]/30"
                        />
                        <FounderUsername username="imunknown69" className="mb-2" />
                        <p className="text-gray-400 text-xs font-mono bg-black/30 rounded-lg px-3 py-1.5 inline-block">959653911923396629</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Owners */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3">
                  <Image 
                    src="/owner.gif"
                    alt="Owner Badge"
                    width={48}
                    height={48}
                    quality={90}
                    unoptimized
                    className="w-12 h-12 object-contain"
                  />
                  <h3 className="text-2xl font-extrabold text-[#c9a76f]" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', margin: 0, padding: 0 }}>OWNERS</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {teamLoading ? (
                  <>
                    <TeamMemberSkeleton />
                    <TeamMemberSkeleton />
                  </>
                ) : team?.owners && team.owners.length > 0 ? (
                  team.owners.map((owner) => (
                    <a 
                      key={owner.userId}
                      href={`https://id.rappytv.com/${owner.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative group overflow-hidden bg-gradient-to-br from-[#1f1f1f] via-[#1a1a1a] to-[#0a0a0a] border-3 border-[#c9a76f]/60 rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#c9a76f] hover:shadow-[0_0_40px_rgba(201,167,111,0.4)] hover:scale-[1.03] hover:-translate-y-1"
                      style={{ willChange: 'transform', contain: 'layout style paint' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a76f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a76f]/10 rounded-full blur-2xl" />
                      <div className="relative z-10">
                        {owner.avatarUrl ? (
                          <Image 
                            src={owner.avatarUrl}
                            alt={owner.username}
                            width={184}
                            height={184}
                            quality={85}
                            unoptimized={owner.avatarUrl.includes('.gif')}
                            className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#c9a76f]/60 shadow-xl shadow-[#c9a76f]/30 ring-2 ring-[#c9a76f]/20"
                          />
                        ) : (
                          <div className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#c9a76f]/60 shadow-xl shadow-[#c9a76f]/30 bg-gradient-to-br from-[#c9a76f]/80 to-[#d4b786]/80 flex items-center justify-center ring-2 ring-[#c9a76f]/20">
                            <span className="text-4xl font-bold text-black">{owner.username.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="mb-2">
                          <AnimatedUsername username={owner.username} role="owner" className="inline-block" />
                        </div>
                        <p className="text-gray-400 text-xs font-mono bg-black/20 rounded-md px-3 py-1.5 inline-block">{owner.userId}</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <>
                    <a 
                      href="https://id.rappytv.com/643480211421265930" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative group overflow-hidden bg-gradient-to-br from-[#1f1f1f] via-[#1a1a1a] to-[#0a0a0a] border-3 border-[#c9a76f]/60 rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#c9a76f] hover:shadow-[0_0_40px_rgba(201,167,111,0.4)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a76f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a76f]/10 rounded-full blur-2xl" />
                      <div className="relative z-10">
                        <Image 
                          src="https://cdn.discordapp.com/avatars/643480211421265930/0ccf29cf250013d91b12dd21a149ca9c.png?size=1024" 
                          alt="rex.f" 
                          width={184}
                          height={184}
                          quality={85}
                          className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#c9a76f]/60 shadow-xl shadow-[#c9a76f]/30 ring-2 ring-[#c9a76f]/20"
                        />
                        <div className="mb-2">
                          <AnimatedUsername username="rex.f" role="owner" className="inline-block" />
                        </div>
                        <p className="text-gray-400 text-xs font-mono bg-black/20 rounded-md px-3 py-1.5 inline-block">643480211421265930</p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://id.rappytv.com/283127777383809024" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative group overflow-hidden bg-gradient-to-br from-[#1f1f1f] via-[#1a1a1a] to-[#0a0a0a] border-3 border-[#c9a76f]/60 rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#c9a76f] hover:shadow-[0_0_40px_rgba(201,167,111,0.4)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a76f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a76f]/10 rounded-full blur-2xl" />
                      <div className="relative z-10">
                        <Image 
                          src="https://images-ext-1.discordapp.net/external/qUqtBKynxouMP3cfozPnjZFJ4kbxSPAv4H4ajaGABjY/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/283127777383809024/1b7166306a4eada744b9f5bc910b2f81.png?format=webp&quality=lossless&width=512&height=512" 
                          alt="Alexx" 
                          width={184}
                          height={184}
                          quality={85}
                          className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#c9a76f]/60 shadow-xl shadow-[#c9a76f]/30 ring-2 ring-[#c9a76f]/20"
                        />
                        <div className="mb-2">
                          <AnimatedUsername username="Alexx" role="owner" className="inline-block" />
                        </div>
                        <p className="text-gray-400 text-xs font-mono bg-black/20 rounded-md px-3 py-1.5 inline-block">283127777383809024</p>
                      </div>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Girl Owners */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3">
                  <Image 
                    src="/girl_owner.gif"
                    alt="Girl Owner Badge"
                    width={48}
                    height={48}
                    quality={90}
                    unoptimized
                    className="w-12 h-12 object-contain"
                  />
                  <h3 className="text-2xl font-extrabold bg-gradient-to-r from-[#ff69b4] via-[#ff1493] to-[#ff69b4] bg-clip-text text-transparent" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', margin: 0, padding: 0 }}>GIRL OWNERS</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {teamLoading ? (
                  <>
                    <TeamMemberSkeleton />
                    <TeamMemberSkeleton />
                  </>
                ) : team?.girlOwners && team.girlOwners.length > 0 ? (
                  team.girlOwners.map((girlOwner: TeamMember) => (
                    <a 
                      key={girlOwner.userId}
                      href={`https://id.rappytv.com/${girlOwner.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative group overflow-hidden bg-gradient-to-br from-[#2a1a2a] via-[#1a1a1a] to-[#0a0a0a] border-3 border-[#ff69b4]/60 rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#ff69b4] hover:shadow-[0_0_40px_rgba(255,105,180,0.4)] hover:scale-[1.03] hover:-translate-y-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#ff69b4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff69b4]/10 rounded-full blur-2xl" />
                      <div className="relative z-10">
                        {girlOwner.avatarUrl ? (
                          <Image 
                            src={girlOwner.avatarUrl}
                            alt={girlOwner.username}
                            width={184}
                            height={184}
                            quality={85}
                            unoptimized={girlOwner.avatarUrl.includes('.gif')}
                            className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#ff69b4]/60 shadow-xl shadow-[#ff69b4]/30 ring-2 ring-[#ff69b4]/20"
                          />
                        ) : (
                          <div className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-[#ff69b4]/60 shadow-xl shadow-[#ff69b4]/30 bg-gradient-to-br from-[#ff69b4]/80 to-[#ff1493]/80 flex items-center justify-center ring-2 ring-[#ff69b4]/20">
                            <span className="text-4xl font-bold text-black">{girlOwner.username.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="mb-2">
                          <AnimatedUsername username={girlOwner.username} role="girlOwner" className="inline-block" />
                        </div>
                        <p className="text-gray-400 text-xs font-mono bg-black/20 rounded-md px-3 py-1.5 inline-block">{girlOwner.userId}</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500">
                    No Girl Owners assigned yet
                  </div>
                )}
              </div>
            </div>

            {/* Managers */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3">
                  <Image 
                    src="/manager.png"
                    alt="Manager Badge"
                    width={48}
                    height={48}
                    quality={90}
                    className="w-12 h-12 object-contain"
                  />
                  <h3 className="text-xl font-bold text-white/90" style={{ fontFamily: 'Inter, sans-serif', margin: 0, padding: 0 }}>MANAGERS</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamLoading ? (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <TeamMemberSkeleton key={i} />
                    ))}
                  </>
                ) : team?.managers && team.managers.length > 0 ? (
                  team.managers.map((manager) => (
                    <a 
                      key={manager.userId}
                      href={`https://id.rappytv.com/${manager.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.03] hover:-translate-y-1"
                      style={{ willChange: 'transform', contain: 'layout style paint' }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        {manager.avatarUrl ? (
                          <Image 
                            src={manager.avatarUrl}
                            alt={manager.username}
                            width={124}
                            height={124}
                            quality={80}
                            unoptimized={manager.avatarUrl.includes('.gif')}
                            className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{manager.username.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="mb-1">
                          <AnimatedUsername username={manager.username} role="manager" className="inline-block" />
                        </div>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">{manager.userId}</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <>
                    <a 
                      href="https://id.rappytv.com/785398118095126570" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.03] hover:-translate-y-1"
                      style={{ willChange: 'transform', contain: 'layout style paint' }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">D</span>
                        </div>
                        <div className="mb-1">
                          <AnimatedUsername username="Damon" role="manager" className="inline-block" />
                        </div>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">785398118095126570</p>
                      </div>
                    </a>

                    <a 
                      href="https://id.rappytv.com/1255565188829155388" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.03] hover:-translate-y-1"
                      style={{ willChange: 'transform', contain: 'layout style paint' }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">D</span>
                        </div>
                        <div className="mb-1">
                          <AnimatedUsername username="Devo" role="manager" className="inline-block" />
                        </div>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">1255565188829155388</p>
                      </div>
                    </a>

                    <a 
                      href="https://id.rappytv.com/1391157574958710835" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.03] hover:-translate-y-1"
                      style={{ willChange: 'transform', contain: 'layout style paint' }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">M</span>
                        </div>
                        <div className="mb-1">
                          <AnimatedUsername username="Mahad" role="manager" className="inline-block" />
                        </div>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">1391157574958710835</p>
                      </div>
                    </a>

                    <a 
                      href="https://id.rappytv.com/930109353137176586" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#3a3a3a] rounded-xl p-6 text-center transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.03] hover:-translate-y-1"
                      style={{ willChange: 'transform', contain: 'layout style paint' }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="w-24 h-24 rounded-xl mx-auto mb-3 border-2 border-white/30 shadow-lg bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">K</span>
                        </div>
                        <div className="mb-1">
                          <AnimatedUsername username="Kuchu" role="manager" className="inline-block" />
                        </div>
                        <p className="text-gray-500 text-xs font-mono bg-black/30 rounded px-2 py-1 inline-block">930109353137176586</p>
                      </div>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Early Supporter */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3">
                  <Image 
                    src="/supporter.png"
                    alt="Early Supporter Badge"
                    width={48}
                    height={48}
                    quality={90}
                    className="w-12 h-12 object-contain"
                  />
                  <h3 className="text-lg font-semibold text-white/70" style={{ fontFamily: 'Inter, sans-serif', margin: 0, padding: 0 }}>EARLY SUPPORTERS</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {teamLoading ? (
                  <>
                    {[...Array(12)].map((_, i) => (
                      <TeamMemberSkeleton key={i} />
                    ))}
                  </>
                ) : team?.earlySupport && team.earlySupport.length > 0 ? (
                  team.earlySupport.map((supporter) => (
                    <a 
                      key={supporter.userId}
                      href={`https://id.rappytv.com/${supporter.userId}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a] border border-[#2a2a2a]/50 rounded-lg p-4 text-center transition-all duration-300 hover:border-[#c9a76f]/40 hover:shadow-lg hover:shadow-[#c9a76f]/10 hover:scale-[1.08] hover:-translate-y-1 backdrop-blur-sm"
                    >
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#c9a76f]/5 rounded-full blur-xl" />
                      <div className="relative z-10">
                        {supporter.avatarUrl ? (
                          <Image 
                            src={supporter.avatarUrl}
                            alt={supporter.username}
                            width={124}
                            height={124}
                            quality={75}
                            unoptimized={supporter.avatarUrl.includes('.gif')}
                            className="w-16 h-16 rounded-lg mx-auto mb-2 border border-[#c9a76f]/20 shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg mx-auto mb-2 border border-[#c9a76f]/20 shadow-md bg-gradient-to-br from-[#c9a76f]/20 to-[#c9a76f]/5 flex items-center justify-center">
                            <span className="text-2xl font-bold text-[#c9a76f]/80">{supporter.username.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="mb-1">
                          <AnimatedUsername username={supporter.username} role="earlySupport" className="inline-block truncate" />
                        </div>
                        <p className="text-gray-500 text-[10px] font-mono bg-black/20 rounded px-1.5 py-0.5 inline-block">{supporter.userId}</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="col-span-full flex justify-center">
                    <a 
                      href="https://id.rappytv.com/1395736628793839646" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a] border border-[#2a2a2a]/50 rounded-lg p-6 text-center transition-all duration-300 hover:border-[#c9a76f]/40 hover:shadow-lg hover:shadow-[#c9a76f]/10 backdrop-blur-sm max-w-xs"
                    >
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#c9a76f]/5 rounded-full blur-xl" />
                      <div className="relative z-10">
                        <div className="w-20 h-20 rounded-lg mx-auto mb-3 border border-[#c9a76f]/20 shadow-md bg-gradient-to-br from-[#c9a76f]/20 to-[#c9a76f]/5 flex items-center justify-center">
                          <span className="text-3xl font-bold text-[#c9a76f]/80">E</span>
                        </div>
                        <p className="text-white/90 font-medium mb-1">Early Supporter</p>
                        <p className="text-gray-500 text-xs font-mono mt-2">1395736628793839646</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
