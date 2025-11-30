import { PrismaClient } from '@prisma/client';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

async function testWebsiteData() {
  console.log(`${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.cyan}🌐 Website Database Test${colors.reset}`);
  console.log(`${colors.cyan}========================================${colors.reset}\n`);

  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  try {
    // Test 1: Database Connection
    console.log(`${colors.yellow}Test 1: Database Connection${colors.reset}`);
    await prisma.$connect();
    console.log(`${colors.green}✓ Successfully connected to database${colors.reset}\n`);

    // Test 2: Database Info
    console.log(`${colors.yellow}Test 2: Database Information${colors.reset}`);
    const dbInfo = await prisma.$queryRaw<Array<{ current_database: string }>>`SELECT current_database()`;
    console.log(`${colors.green}✓ Connected to database:${colors.reset} ${dbInfo[0].current_database}`);
    
    const result = await prisma.$queryRaw<Array<{ version: string }>>`SELECT version()`;
    console.log(`${colors.green}✓ PostgreSQL Version:${colors.reset}`);
    console.log(`  ${result[0].version.split(',')[0]}\n`);

    // Test 3: Vouch Data Analysis
    console.log(`${colors.yellow}Test 3: Vouch Data Collection${colors.reset}`);
    
    const totalVouches = await prisma.vouch.count();
    console.log(`${colors.green}✓ Total Vouches:${colors.reset} ${totalVouches}`);

    if (totalVouches > 0) {
      // Get date range
      const oldestVouch = await prisma.vouch.findFirst({
        orderBy: { timestamp: 'asc' },
        select: { timestamp: true },
      });
      
      const newestVouch = await prisma.vouch.findFirst({
        orderBy: { timestamp: 'desc' },
        select: { timestamp: true },
      });

      console.log(`${colors.green}✓ Date Range:${colors.reset}`);
      console.log(`  Oldest: ${oldestVouch?.timestamp.toLocaleDateString()}`);
      console.log(`  Newest: ${newestVouch?.timestamp.toLocaleDateString()}`);

      // Vouches with attachments
      const vouchesWithAttachments = await prisma.vouch.count({
        where: {
          attachments: {
            isEmpty: false,
          },
        },
      });
      console.log(`${colors.green}✓ Vouches with Attachments:${colors.reset} ${vouchesWithAttachments}`);

      // Vouches with proof URLs
      const vouchesWithProof = await prisma.vouch.count({
        where: {
          proofUrl: {
            not: null,
          },
        },
      });
      console.log(`${colors.green}✓ Vouches with Proof URLs:${colors.reset} ${vouchesWithProof}`);

      // Unique authors
      const uniqueAuthors = await prisma.vouch.findMany({
        select: { authorId: true },
        distinct: ['authorId'],
      });
      console.log(`${colors.green}✓ Unique Authors:${colors.reset} ${uniqueAuthors.length}`);

      // Unique channels
      const uniqueChannels = await prisma.vouch.findMany({
        select: { channelId: true, channelName: true },
        distinct: ['channelId'],
      });
      console.log(`${colors.green}✓ Unique Channels:${colors.reset} ${uniqueChannels.length}`);
      uniqueChannels.forEach((channel) => {
        console.log(`  - ${channel.channelName} (${channel.channelId})`);
      });

      // Top 5 authors by vouch count
      console.log(`\n${colors.magenta}Top 5 Contributors:${colors.reset}`);
      const authorStats = await prisma.vouch.groupBy({
        by: ['authorId', 'authorName'],
        _count: true,
        orderBy: {
          _count: {
            authorId: 'desc',
          },
        },
        take: 5,
      });
      authorStats.forEach((stat, index) => {
        console.log(`  ${index + 1}. ${stat.authorName}: ${stat._count} vouches`);
      });
    }

    console.log('');

    // Test 4: Proof Data
    console.log(`${colors.yellow}Test 4: Proof Data Collection${colors.reset}`);
    
    const totalProofs = await prisma.proof.count();
    console.log(`${colors.green}✓ Total Proofs:${colors.reset} ${totalProofs}`);

    if (totalProofs > 0) {
      const proofsWithImages = await prisma.proof.count({
        where: {
          imageUrls: {
            isEmpty: false,
          },
        },
      });
      console.log(`${colors.green}✓ Proofs with Images:${colors.reset} ${proofsWithImages}`);

      // Recent proofs
      const recentProofs = await prisma.proof.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          authorName: true,
          message: true,
          createdAt: true,
        },
      });
      
      if (recentProofs.length > 0) {
        console.log(`\n${colors.magenta}Recent Proofs:${colors.reset}`);
        recentProofs.forEach((proof, index) => {
          const message = proof.message.substring(0, 50) + (proof.message.length > 50 ? '...' : '');
          console.log(`  ${index + 1}. ${proof.authorName}: "${message}"`);
          console.log(`     ${proof.createdAt.toLocaleDateString()}`);
        });
      }
    }

    console.log('');

    // Test 5: Auto Vouch Channels
    console.log(`${colors.yellow}Test 5: Auto Vouch Channels${colors.reset}`);
    
    const autoVouchChannels = await prisma.autoVouchChannel.findMany();
    console.log(`${colors.green}✓ Auto Vouch Channels:${colors.reset} ${autoVouchChannels.length}`);
    
    autoVouchChannels.forEach((channel) => {
      console.log(`  - Guild: ${channel.guildId}, Channel: ${channel.channelId}`);
    });

    console.log('');

    // Test 6: Capture Sessions
    console.log(`${colors.yellow}Test 6: Capture Sessions${colors.reset}`);
    
    const sessions = await prisma.captureSession.findMany({
      orderBy: { startedAt: 'desc' },
      take: 5,
    });
    console.log(`${colors.green}✓ Total Capture Sessions:${colors.reset} ${sessions.length}`);
    
    if (sessions.length > 0) {
      console.log(`\n${colors.magenta}Recent Capture Sessions:${colors.reset}`);
      sessions.forEach((session, index) => {
        console.log(`  ${index + 1}. ${session.channelName}`);
        console.log(`     Vouches: ${session.totalVouches}, Pushed: ${session.isPushed ? 'Yes' : 'No'}`);
        console.log(`     Started: ${session.startedAt.toLocaleDateString()}`);
      });
    }

    console.log('');

    // Test 7: API Endpoint Simulation
    console.log(`${colors.yellow}Test 7: API Data Retrieval (Simulating Website)${colors.reset}`);
    
    // Simulate /api/vouches endpoint
    const apiVouches = await prisma.vouch.findMany({
      take: 10,
      orderBy: { vouchNumber: 'desc' },
      select: {
        vouchNumber: true,
        authorName: true,
        message: true,
        timestamp: true,
        attachments: true,
        proofUrl: true,
      },
    });
    console.log(`${colors.green}✓ Latest 10 vouches retrieved (as shown on website)${colors.reset}`);
    
    if (apiVouches.length > 0) {
      console.log(`\n${colors.magenta}Sample Vouch Data:${colors.reset}`);
      const sample = apiVouches[0];
      console.log(`  Vouch #${sample.vouchNumber}`);
      console.log(`  Author: ${sample.authorName}`);
      console.log(`  Message: ${sample.message.substring(0, 60)}...`);
      console.log(`  Timestamp: ${sample.timestamp.toLocaleDateString()}`);
      console.log(`  Attachments: ${sample.attachments.length}`);
      console.log(`  Has Proof: ${sample.proofUrl ? 'Yes' : 'No'}`);
    }

    console.log('');

    // Test 8: Data Integrity Check
    console.log(`${colors.yellow}Test 8: Data Integrity${colors.reset}`);
    
    // Check for duplicate vouch numbers
    const duplicateVouchNumbers = await prisma.$queryRaw<Array<{ vouchNumber: number, count: number }>>`
      SELECT "vouchNumber", COUNT(*) as count
      FROM "Vouch"
      GROUP BY "vouchNumber"
      HAVING COUNT(*) > 1
    `;
    
    if (duplicateVouchNumbers.length > 0) {
      console.log(`${colors.red}✗ Found duplicate vouch numbers: ${duplicateVouchNumbers.length}${colors.reset}`);
    } else {
      console.log(`${colors.green}✓ No duplicate vouch numbers${colors.reset}`);
    }

    // Check for missing required fields
    const vouchesWithoutMessage = await prisma.vouch.count({
      where: { message: '' },
    });
    console.log(`${colors.green}✓ Vouches without messages:${colors.reset} ${vouchesWithoutMessage}`);

    console.log('');

    // Final Summary
    console.log(`${colors.cyan}========================================${colors.reset}`);
    console.log(`${colors.green}✅ Website Data Test Completed!${colors.reset}`);
    console.log(`${colors.cyan}========================================${colors.reset}\n`);
    
    console.log(`${colors.blue}Summary:${colors.reset}`);
    console.log(`  Database: ${dbInfo[0].current_database}`);
    console.log(`  Total Vouches: ${totalVouches}`);
    console.log(`  Total Proofs: ${totalProofs}`);
    console.log(`  Auto Channels: ${autoVouchChannels.length}`);
    console.log(`  Capture Sessions: ${sessions.length}`);
    console.log(`\n${colors.blue}Database URL:${colors.reset}`);
    console.log(`  ${process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@')}\n`);

  } catch (error) {
    console.error(`${colors.red}❌ Test failed:${colors.reset}`, error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log(`${colors.yellow}📡 Disconnected from database${colors.reset}`);
  }
}

// Run the test
testWebsiteData()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
