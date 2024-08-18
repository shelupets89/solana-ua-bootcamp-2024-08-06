import { getConnection, loadKeypairs } from "../utils";
import "dotenv/config";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { checkBalance } from "../utils/check-balance";

const MEMO_PROGRAM_ID = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr" as const;

export const sendSol = async (
  recipientId: string = "3UdMnyJDAUh1mbJGAbENJwLzvqcdp8nziCCwuv11DZk2"
) => {
  const sender = loadKeypairs();
  const connection = getConnection();

  const recipient = new PublicKey(recipientId);
  
  console.log(`💸 Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

  const transaction = new Transaction();

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient,
    lamports: 0.01 * LAMPORTS_PER_SOL,
  });

  const memoInstruction = new TransactionInstruction({
    keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }],
    data: Buffer.from("Coolest memo-memo from Dima"),
    programId: new PublicKey(MEMO_PROGRAM_ID),
  });

  transaction.add(sendSolInstruction, memoInstruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    sender,
  ]);

  console.log(`✅ Transaction confirmed, signature: ${signature}!`);

  console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);
  await checkBalance(connection);
};
