import { createMint } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";
import { loadKeypairs, getConnection } from "../utils";

export const createTokenMint = async () => {
  const sender = loadKeypairs();
  const connection = getConnection();

  const tokenMint = await createMint(
    connection,
    sender,
    sender.publicKey,
    null,
    2
  );
  
  const link = getExplorerLink("address", tokenMint.toString(), "devnet");
  // https://explorer.solana.com/address/3LDVexPo1NVSDfYE1PqeBFm4ih8UfTvu2m5XcA445Rb4?cluster=devnet
  console.log(`✅ Token Mint: ${link}`);
};
