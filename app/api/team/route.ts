import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// API endpoint to receive team data from Discord bot
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data, token } = body;

    // Simple authentication - match the bot token
    if (token !== process.env.DISCORD_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Store team data based on type
    if (type === 'team_member') {
      // Upsert team member data
      await prisma.teamMember.upsert({
        where: { userId: data.userId },
        update: {
          username: data.username,
          avatarUrl: data.avatarUrl,
          role: data.role,
          updatedAt: new Date(),
        },
        create: {
          userId: data.userId,
          username: data.username,
          avatarUrl: data.avatarUrl,
          role: data.role,
        },
      });
    } else if (type === 'early_supporters') {
      // Bulk update early supporters
      // First, remove all existing early supporters
      await prisma.teamMember.deleteMany({
        where: { role: 'early_supporter' },
      });

      // Then insert new ones
      for (const member of data.members) {
        await prisma.teamMember.create({
          data: {
            userId: member.userId,
            username: member.username,
            avatarUrl: member.avatarUrl,
            role: 'early_supporter',
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating team data:', error);
    return NextResponse.json(
      { error: 'Failed to update team data' },
      { status: 500 }
    );
  }
}

// Get all team members
export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: [
        { order: 'asc' },
      ],
    });

    // Get core team member IDs
    const coreTeamIds = [
      ...teamMembers.filter(m => m.role === 'Founder').map(m => m.userId),
      ...teamMembers.filter(m => m.role === 'Owner').map(m => m.userId),
      ...teamMembers.filter(m => m.role === 'Girl Owner').map(m => m.userId),
      ...teamMembers.filter(m => m.role === 'Manager').map(m => m.userId),
    ];

    // Group by role, filtering out core team members from Early Support
    const grouped = {
      founder: teamMembers.filter(m => m.role === 'Founder'),
      owners: teamMembers.filter(m => m.role === 'Owner'),
      girlOwners: teamMembers.filter(m => m.role === 'Girl Owner'),
      managers: teamMembers.filter(m => m.role === 'Manager'),
      earlySupport: teamMembers.filter(m => 
        m.role === 'Early Support' && !coreTeamIds.includes(m.userId)
      ),
    };

    return NextResponse.json(grouped);
  } catch (error) {
    console.error('Error fetching team data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}
