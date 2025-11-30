import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { extractCurrencyData } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [vouches, maxVouchNumber, decorVouches] = await Promise.all([
      prisma.vouch.findMany({
        select: {
          message: true,
        },
      }),
      // Get the highest vouch number to show total including deleted vouches
      prisma.vouch.findFirst({
        orderBy: { vouchNumber: 'desc' },
        select: { vouchNumber: true },
      }),
      // Count vouches containing deco, pfp, or nameplates
      prisma.vouch.count({
        where: {
          OR: [
            { message: { contains: 'deco', mode: 'insensitive' } },
            { message: { contains: 'pfp', mode: 'insensitive' } },
            { message: { contains: 'nameplates', mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    const stats = extractCurrencyData(vouches);

    const response = NextResponse.json({
      totalVouches: maxVouchNumber?.vouchNumber || 0,
      ...stats,
    });
    
    // Disable caching completely
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary' },
      { status: 500 }
    );
  }
}
