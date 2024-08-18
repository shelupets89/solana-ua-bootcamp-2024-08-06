import { PublicKey } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";
import { getConnection, loadKeypairs } from "../utils";

export const mintTokens = async () => {
  const sender = loadKeypairs();
  const connection = getConnection();

  const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

  const tokenMintAccount = new PublicKey(
    "3LDVexPo1NVSDfYE1PqeBFm4ih8UfTvu2m5XcA445Rb4"
  );

  const recipientAssociatedTokenAccount = new PublicKey(
    "4x2t12jaiMXqzR9Ufce8uknZaKgBq6cWYpBe1nKSB6qz"
  );

  const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );

  const link = getExplorerLink("transaction", transactionSignature, "devnet");
  // https://explorer.solana.com/tx/5xtZJ6GFaj4JuyjmUwUxzqjDnVtrx4q5BxM1W6sUQvS36RLFDWjU3qzh4jLVcGpruy9ABn5rSjrvhq9J33cKHVzh?cluster=devnet
  console.log(`✅ Success! Mint Token Transaction: ${link}`);
};
