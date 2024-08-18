import "dotenv/config";
import { Keypair } from "@solana/web3.js";

export const loadKeypairs = (): Keypair => {
  const privateKey = process.env["SECRET_KEY"];

  if (!privateKey) {
    console.log(">> Add SECRET_KEY to .env");
    process.exit(1);
  }

  const keyFromEnv = Uint8Array.from(JSON.parse(process.env["SECRET_KEY"]!));
  const keypair = Keypair.fromSecretKey(keyFromEnv);
  console.log(`Public key: `, keypair.publicKey.toBase58());
  return keypair;
};
