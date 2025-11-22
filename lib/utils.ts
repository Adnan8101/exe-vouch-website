// Parse vouch messages to extract currency amounts
export function extractCurrencyData(vouches: Array<{ message: string }>) {
  const stats = {
    totalINR: 0,
    nitro: 0,
    decors: 0,
    owo: 0,
    crypto: 0,
    cryptoGiveaways: 0,
  };

  vouches.forEach((vouch) => {
    const message = vouch.message;

    // Extract INR amounts - case insensitive, multiple variations
    // Matches: inr, INR, Inr, rupees, rupee, rs, ₹
    // Also handles comma-separated numbers (Indian format)
    const inrMatch = message.match(/([\d,]+)\s*(?:inr|rupees?|rs|₹)/i);
    if (inrMatch) {
      // Remove commas and parse
      const amount = parseInt(inrMatch[1].replace(/,/g, ''), 10);
      // Ignore unrealistic amounts (over 1 crore = 10,000,000)
      if (!isNaN(amount) && amount <= 10000000) {
        stats.totalINR += amount;
      }
    }

    // Count Nitro mentions - case insensitive, multiple variations
    // Matches: nitro, Nitro, NITRO, gift link, server boost, booster, nitro booster
    if (/nitro\s*booster|server\s*boost|gift\s*link|booster|nitro/i.test(message)) {
      stats.nitro += 1;
    }

    // Count Decor mentions - case insensitive, multiple variations
    // Matches: profile deco, profile decoration, deco, decor, decoration, decorations
    if (/profile\s*deco(?:ration)?s?|deco(?:ration)?s?/i.test(message)) {
      stats.decors += 1;
    }

    // Extract OWO amounts - case insensitive, multiple variations
    // Matches: owo, Owo, OWO, uwu, Uwu, UWU, owo cash, uwu cash
    const owoMatch = message.match(/([\d.]+)\s*([km])?\s*(?:owo|uwu)(?:\s*cash)?/i);
    if (owoMatch) {
      let amount = parseFloat(owoMatch[1]);
      const multiplier = owoMatch[2]?.toLowerCase();
      
      if (multiplier === 'm') {
        amount *= 1000000;
      } else if (multiplier === 'k') {
        amount *= 1000;
      }
      
      stats.owo += Math.floor(amount);
    }

    // Count Crypto Giveaways - case insensitive, multiple variations
    // Matches: crypto giveaways, ltc, LTC, bitcoin, Bitcoin, btc, BTC
    // Also matches any message with $ sign
    if (/crypto\s*giveaways?|litecoin|bitcoin|ltc|btc|eth|ethereum|usdt|doge|dogecoin|\$/i.test(message)) {
      stats.cryptoGiveaways += 1;
    }

    // Extract Crypto amounts in USD (e.g., "0.10$ ltc", "$5 btc", "got 20$ crypto")
    const cryptoMatch = message.match(/(?:\$|usd)?\s*(\d+\.?\d*)\s*(?:\$|usd)?\s*(?:ltc|btc|bitcoin|eth|ethereum|crypto|usdt|doge|dogecoin|litecoin)/i);
    if (cryptoMatch) {
      const amount = parseFloat(cryptoMatch[1]);
      if (!isNaN(amount)) {
        stats.crypto += amount;
      }
    }
  });

  return stats;
}

// User mapping for Discord mentions
const userMapping: Record<string, { name: string; id: string }> = {
  '@imunknown69': { name: 'Unknown', id: '959653911923396629' },
  'imunknown69': { name: 'Unknown', id: '959653911923396629' },
  '@rex.f': { name: 'Rex', id: '643480211421265930' },
  'rex.f': { name: 'Rex', id: '643480211421265930' },
  '@alexx': { name: 'Alexx', id: '283127777383809024' },
  'alexx': { name: 'Alexx', id: '283127777383809024' },
};

// Map user IDs to display names
const userIdMapping: Record<string, string> = {
  '959653911923396629': 'Unknown',
  '643480211421265930': 'Rex',
  '283127777383809024': 'Alexx',
};

// Parse message and replace user mentions with clickable tags
export function parseMessageWithMentions(message: string) {
  const parts: Array<{ type: 'text' | 'mention'; content: string; userId?: string; displayName?: string }> = [];
  
  // Regex to match Discord user ID format: <@USER_ID>
  const mentionRegex = /<@(\d+)>/g;
  let lastIndex = 0;
  let match;

  while ((match = mentionRegex.exec(message)) !== null) {
    const userId = match[1];
    const displayName = userIdMapping[userId] || 'User';
    
    // Add text before the mention
    if (match.index > lastIndex) {
      const textBefore = message.slice(lastIndex, match.index);
      if (textBefore) {
        parts.push({ type: 'text', content: textBefore });
      }
    }
    
    // Add the mention
    parts.push({
      type: 'mention',
      content: `@${displayName}`,
      userId: userId,
      displayName: displayName,
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text after last mention
  if (lastIndex < message.length) {
    const remainingText = message.slice(lastIndex);
    if (remainingText) {
      parts.push({ type: 'text', content: remainingText });
    }
  }
  
  // If no mentions were found, return the entire message as text
  if (parts.length === 0) {
    parts.push({ type: 'text', content: message });
  }

  return parts;
}

export function getDiscordMessageUrl(messageId: string, guildId: string = '1306533976809185323', channelId: string = '1306534181093675052') {
  return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
}

export function getProofDiscordUrl(messageId: string) {
  return `https://discord.com/channels/449751480375705601/1330868077570691134/${messageId}`;
}

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
