import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getPublicKey } from "../utils";

const publicKey = getPublicKey();

export const checkBalance = async (connection: Connection) => {
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
  console.log(`Key: ${publicKey}; Balance: ${balanceInSOL}SOL`);
};
