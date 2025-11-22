import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About EXE - Our Team & Community',
  description: 'Meet the EXE team - founders, owners, managers, and early supporters. Learn about our pure chill community with daily VCs, giveaways, and nonstop good vibes.',
  keywords: 'EXE team, discord community, gaming community, founders, staff, moderators',
  openGraph: {
    title: 'About EXE - Our Team & Community',
    description: 'Meet the EXE team - founders, owners, managers, and early supporters.',
    type: 'website',
    url: 'https://www.exevouches.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EXE - Our Team & Community',
    description: 'Meet the EXE team - founders, owners, managers, and early supporters.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
