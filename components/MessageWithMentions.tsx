'use client';

import { parseMessageWithMentions } from '@/lib/utils';

interface MessageWithMentionsProps {
  message: string;
}

export function MessageWithMentions({ message }: MessageWithMentionsProps) {
  const parts = parseMessageWithMentions(message);

  return (
    <>
      {parts.map((part, index) => {
        if (part.type === 'mention') {
          return (
            <a
              key={index}
              href={`https://discord.com/users/${part.userId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#5865f2]/20 hover:bg-[#5865f2]/30 text-[#5865f2] hover:text-[#6875f5] px-1.5 py-0.5 rounded transition-colors duration-200 font-medium no-underline hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {part.content}
            </a>
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </>
  );
}
