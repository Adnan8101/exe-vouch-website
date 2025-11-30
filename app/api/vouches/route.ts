import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    // Build where clause for search
    const whereClause = search
      ? {
          OR: [
            { authorName: { contains: search, mode: 'insensitive' as const } },
            { message: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [vouches, total] = await Promise.all([
      prisma.vouch.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: [
          { vouchNumber: 'desc' },
          { timestamp: 'desc' },
        ],
        select: {
          id: true,
          vouchNumber: true,
          messageId: true,
          authorId: true,
          authorName: true,
          authorAvatar: true,
          message: true,
          timestamp: true,
          channelId: true,
          proofUrl: true,
        },
      }),
      prisma.vouch.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(total / limit);

    const response = NextResponse.json({
      vouches,
      pagination: {
        page,
        limit,
        total: total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
    
    // Disable caching completely
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching vouches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vouches' },
      { status: 500 }
    );
  }
}
