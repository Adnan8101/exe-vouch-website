import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const [proofs, total] = await Promise.all([
      prisma.proof.findMany({
        skip,
        take: limit,
        orderBy: {
          timestamp: 'desc',
        },
        select: {
          id: true,
          messageId: true,
          authorId: true,
          authorName: true,
          authorAvatar: true,
          message: true,
          timestamp: true,
          imageUrls: true,
          channelId: true,
        },
      }),
      prisma.proof.count(),
    ]);

    // Override avatars for specific users (matching by name since authorId is 'unknown')
    const proofsWithCorrectAvatars = proofs.map(proof => ({
      ...proof,
      authorAvatar: proof.authorName.toLowerCase().includes('damonn') || proof.authorName === '_.damonn'
        ? 'https://cdn.discordapp.com/attachments/1439226823404687472/1439247946783916263/f2f44ccfdb64d4e16b948e010c66cfc7.jpg?ex=6919d39a&is=6918821a&hm=cd75421354976686d7bc11e67cb902681464117c37220882116055721eb29622&'
        : proof.authorName.toLowerCase().includes('rex') || proof.authorName === 'rex.f'
        ? 'https://cdn.discordapp.com/avatars/643480211421265930/0ccf29cf250013d91b12dd21a149ca9c.png?size=1024'
        : proof.authorAvatar
    }));

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      proofs: proofsWithCorrectAvatars,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching proofs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proofs' },
      { status: 500 }
    );
  }
}
