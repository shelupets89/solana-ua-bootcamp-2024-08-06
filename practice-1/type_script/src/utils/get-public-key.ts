import "dotenv/config";
import { PublicKey } from "@solana/web3.js";

export const getPublicKey = (): PublicKey => {
  return new PublicKey(process.env["PUBLIC_KEY"]);
};
