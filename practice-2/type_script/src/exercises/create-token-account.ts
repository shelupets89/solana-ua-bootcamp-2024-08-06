import { PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";
import { getConnection, loadKeypairs } from "../utils";

export const createTokenAccount = async () => {
  const sender = loadKeypairs();
  const connection = getConnection();

  const tokenMintAccount = new PublicKey( "3LDVexPo1NVSDfYE1PqeBFm4ih8UfTvu2m5XcA445Rb4"
    // "FFQSwZc2zvnLie5S7A1ZpsYofTnBHLd93czuKAVawQCH"
  );

  const recipient = new PublicKey(
    "DimaWWyAW2JBrHoESaYeFTmmzpUeuRUMcqwdox1iWxmp"
  );

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
  );

  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

  const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
  );

  //https://explorer.solana.com/address/4x2t12jaiMXqzR9Ufce8uknZaKgBq6cWYpBe1nKSB6qz?cluster=devnet
  console.log(`✅ Created token account: ${link}`);
};
