

async function main() {
    const address = 'SP139ACXQKDC74AETN9EHP4VYA56TDKWNWNPSHX9R';
    try {
        const res = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/balances`);
        const data = await res.json();
        console.log(`Balance of Master Wallet ${address}:`);
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}
main();
