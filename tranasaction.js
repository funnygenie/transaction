const solanaWeb3 = require('@solana/web3.js');

// Your private key as Uint8Array (Base64 string decoded)
const secretKey = Uint8Array.from([
  156, 188, 240, 191, 20, 142, 219, 67, 211, 228, 228, 27, 96, 58, 95, 140,
  224, 106, 18, 88, 186, 55, 96, 102, 243, 243, 61, 140, 55, 84, 158, 36, 
  122, 88, 144, 203, 154, 87, 156, 109, 118, 100, 92, 220, 97, 183, 12, 60,
  248, 245, 92, 46, 104, 37, 70, 57, 54, 82, 192, 214, 160, 159, 15, 95
]);
const sender = solanaWeb3.Keypair.fromSecretKey(secretKey);

// Recipient's public key
const recipient = new solanaWeb3.PublicKey('Hmvrbx3PXvsoyupKAHXvVTRbu79mibXqJSqiAeaxS4gk');

// Create a Solana connection to Devnet
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

// Function to send SOL
async function sendSolanaTransaction() {
    // Get the balance of the sender before sending SOL
    let senderBalance = await connection.getBalance(sender.publicKey);
    console.log(`Sender balance: ${senderBalance / solanaWeb3.LAMPORTS_PER_SOL} SOL`);

    // Create a transaction to transfer 0.0001 SOL to the recipient
    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: recipient,
            lamports: 0.0001 * solanaWeb3.LAMPORTS_PER_SOL,  // 0.0001 SOL in lamports
        })
    );

    // Sign and send the transaction
    const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [sender]
    );

    console.log('Transaction signature:', signature);
}

// Call the function
sendSolanaTransaction().catch(err => {
    console.error(err);
});
