'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import Pagination from '@/components/Pagination';
import { ProofSkeleton } from '@/components/Skeletons';
import { getDiscordMessageUrl } from '@/lib/utils';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Proof {
  id: string;
  messageId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string | null;
  message: string;
  timestamp: string;
  imageUrls: string[];
  channelId: string;
}

// Image component with loading state
function ProofImage({ url, alt, index }: { url: string; alt: string; index: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-[#c9a76f] transition-colors relative group"
    >
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] min-h-[200px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#c9a76f]/20 border-t-[#c9a76f] rounded-full animate-spin" />
            <p className="text-xs text-gray-500">Loading proof...</p>
          </div>
        </div>
      )}
      {hasError ? (
        <div className="flex items-center justify-center bg-[#1a1a1a] min-h-[200px] p-4">
          <p className="text-sm text-gray-500">Failed to load image</p>
        </div>
      ) : (
        <img
          src={url}
          alt={alt}
          className={`w-full h-auto object-contain max-h-[600px] group-hover:scale-105 transition-all duration-300 ${
            isLoading ? 'opacity-0 absolute' : 'opacity-100'
          }`}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </a>
  );
}

export default function ProofClient() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useSWR(
    `/api/proof?page=${page}&limit=10`,
    fetcher,
    {
      refreshInterval: 5000, // Auto-refresh every 5 seconds
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load proofs</p>
      </div>
    );
  }

  const proofs: Proof[] = data?.proofs || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Proof Gallery</h2>
            <p className="text-gray-400">
              {pagination.total || 0} total proofs • Page {pagination.page} of{' '}
              {pagination.totalPages}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Live Updates</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proofs Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProofSkeleton key={i} />
          ))}
        </div>
      ) : proofs.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
          <p className="text-gray-400 text-lg">No proofs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proofs.map((proof, index) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c9a76f] transition-all duration-300 hover:shadow-xl hover:shadow-[#c9a76f]/10 hover:scale-[1.02] flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  {proof.authorAvatar ? (
                    <img
                      src={proof.authorId === '643480211421265930' 
                        ? 'https://cdn.discordapp.com/avatars/643480211421265930/0ccf29cf250013d91b12dd21a149ca9c.png?size=1024'
                        : proof.authorAvatar
                      }
                      alt={proof.authorName}
                      className="w-14 h-14 rounded-full border-2 border-[#c9a76f]/30"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#c9a76f] flex items-center justify-center text-black font-bold text-xl">
                      {proof.authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <a
                    href={`https://id.rappytv.com/${proof.authorId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block text-white font-semibold text-lg mb-1 truncate hover:text-[#c9a76f] transition-colors"
                  >
                    {proof.authorName}
                    <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-[#c9a76f] transition-all duration-300" />
                    <span className="absolute left-0 -bottom-5 opacity-0 group-hover:opacity-100 text-xs text-[#c9a76f] whitespace-nowrap transition-opacity duration-300">
                      Check Proof
                    </span>
                  </a>
                  <span className="text-xs text-gray-500 block mt-1">
                    {new Date(proof.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {proof.message && proof.message !== '[No content]' && (
                <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {proof.message}
                </p>
              )}

              {/* Image Gallery */}
              {proof.imageUrls && proof.imageUrls.length > 0 && (
                <div className="mb-4 space-y-2">
                  {proof.imageUrls.map((url, idx) => (
                    <ProofImage
                      key={idx}
                      url={url}
                      alt={`Proof ${idx + 1} from ${proof.authorName}`}
                      index={idx}
                    />
                  ))}
                </div>
              )}

              <motion.a
                href={getDiscordMessageUrl(proof.messageId, '1306533976809185323', proof.channelId)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#5865F2] via-[#7289DA] to-[#5865F2] text-white rounded-xl font-bold text-sm overflow-hidden mt-auto"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(88, 101, 242, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundSize: "200% 100%" }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                {/* Shine effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                
                {/* Discord Icon with bounce animation */}
                <motion.svg
                  className="w-5 h-5 relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                >
                  <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                </motion.svg>
                
                {/* Text with hover animation */}
                <motion.span 
                  className="relative z-10 font-black tracking-wide uppercase"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0.5)",
                      "0 2px 4px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0.5)",
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  View on Discord
                </motion.span>
                
                {/* Pulsing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-[#5865F2]"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.a>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
