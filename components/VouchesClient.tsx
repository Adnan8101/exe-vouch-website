'use client';

import { useState, useEffect, memo } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import { VouchSkeleton } from '@/components/Skeletons';
import { getDiscordMessageUrl } from '@/lib/utils';
import { MessageWithMentions } from './MessageWithMentions';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Vouch {
  id: string;
  vouchNumber: number;
  messageId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string | null;
  message: string;
  timestamp: string;
  channelId: string;
  proofUrl: string | null;
}

export default function VouchesClient() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, error, isLoading } = useSWR(
    `/api/vouches?page=${page}&limit=30${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ''}`,
    fetcher,
    {
      refreshInterval: debouncedSearch ? 0 : 5000, // Don't auto-refresh during search
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load vouches</p>
      </div>
    );
  }

  const vouches: Vouch[] = data?.vouches || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };
  const totalCount = pagination.total || 0;

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Vouches</h2>
            <p className="text-xs text-gray-400">
              {totalCount} total {!searchQuery && `• Page ${pagination.page}/${pagination.totalPages}`}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search vouches by author or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a76f] transition-colors"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Vouches Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <VouchSkeleton key={i} />
          ))}
        </div>
      ) : vouches.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
          <p className="text-gray-400 text-lg">No vouches found</p>
        </div>
      ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouches.map((vouch, index) => (
            <div
              key={vouch.id}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c9a76f] transition-all duration-200 hover:shadow-xl hover:shadow-[#c9a76f]/10 flex flex-col h-full relative"
              style={{ contain: 'layout style paint' }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  {vouch.authorAvatar ? (
                    <Image
                      src={vouch.authorAvatar}
                      alt={vouch.authorName}
                      width={124}
                      height={124}
                      quality={80}
                      unoptimized={vouch.authorAvatar.includes('.gif')}
                      className="w-16 h-16 rounded-full border-3 border-[#c9a76f]/50 shadow-lg shadow-[#c9a76f]/30"
                    />
                  ) : (
                    <div 
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a76f] to-[#d4b786] flex items-center justify-center text-black font-bold text-2xl shadow-lg shadow-[#c9a76f]/30"
                    >
                      {vouch.authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <a
                        href={`https://id.rappytv.com/${vouch.authorId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group relative inline-block text-[#c9a76f] font-semibold text-base hover:text-[#d4b786] transition-all duration-300 truncate"
                      >
                        <span className="relative z-10">{vouch.authorName}</span>
                        <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-[#c9a76f] to-[#d4b786] transition-all duration-300 ease-out transform origin-left" />
                      </a>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {new Date(vouch.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-500">
                          {new Date(vouch.timestamp).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="bg-[#c9a76f]/10 border border-[#c9a76f]/30 rounded-full px-2 py-1 text-xs font-bold text-[#c9a76f]">
                        #{vouch.vouchNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed flex-grow line-clamp-4 mb-3">
                <MessageWithMentions message={vouch.message} />
              </p>

              {/* Proof Link */}
              {vouch.proofUrl && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (vouch.proofUrl) {
                      window.open(vouch.proofUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="inline-block mt-auto text-[#c9a76f] hover:text-[#d4b786] font-semibold text-sm transition-colors duration-200 cursor-pointer hover:underline"
                >
                  <span className="relative">
                    Proof
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c9a76f] group-hover:w-full transition-all duration-200" />
                  </span>
                  <span className="ml-1">→</span>
                </span>
              )}
            </div>
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
