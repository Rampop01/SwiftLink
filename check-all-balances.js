const fs = require('fs');
const path = require('path');

async function main() {
    const fleetPath = '/Users/a/Desktop/StacksDuel/backend/.bot/bot-fleet.json';
    const bots = JSON.parse(fs.readFileSync(fleetPath, 'utf8'));
    console.log(`Checking ${bots.length} participants...`);

    let fundedCount = 0;
    const fundedBots = [];

    // Query in batches to avoid rate limit
    for (let i = 0; i < bots.length; i++) {
        const bot = bots[i];
        try {
            const res = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${bot.address}/balances`);
            const data = await res.json();
            const bal = BigInt(data.stx.balance);
            if (bal >= 16000n) {
                fundedCount++;
                fundedBots.push({ index: i, address: bot.address, balance: bal.toString() });
            }
        } catch (e) {
            console.error(`Error checking bot ${i}: ${e.message}`);
        }
        // Small delay
        await new Promise(r => setTimeout(r, 100));
    }

    console.log(`\nFunded participants: ${fundedCount} / ${bots.length}`);
    console.log(JSON.stringify(fundedBots, null, 2));
}
main();
