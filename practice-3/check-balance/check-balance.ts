import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getConnection, getPublicKey } from "../utils";

const publicKey = getPublicKey();

export const checkBalance = async () => {
  const balanceInLamports = await getConnection().getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
  console.log(`Key: ${publicKey}; Balance: ${balanceInSOL}SOL`);
};
