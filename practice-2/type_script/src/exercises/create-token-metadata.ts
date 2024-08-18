import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
import { getExplorerLink } from "@solana-developers/helpers";
import { getConnection, loadKeypairs } from "../utils";

const TOKEN_METADATA_ID =
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s" as const;

export const createTokenMetadata = async () => {
  const sender = loadKeypairs();
  const connection = getConnection();

  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(TOKEN_METADATA_ID);

  const tokenMintAccount = new PublicKey(
    "3LDVexPo1NVSDfYE1PqeBFm4ih8UfTvu2m5XcA445Rb4"
  );

  const metadataData = {
    name: "Solana UA Bootcamp KING_KONG",
    symbol: "$KING_KONG",
    // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

  const [metadataPDA, _metadataBump] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  const transaction = new Transaction();
  const createMetadataAccountInstruction =
    createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: sender.publicKey,
        payer: sender.publicKey,
        updateAuthority: sender.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          collectionDetails: null,
          data: metadataData,
          isMutable: true,
        },
      }
    );
  transaction.add(createMetadataAccountInstruction);

  await sendAndConfirmTransaction(connection, transaction, [sender]);

  const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
  );
  // https://explorer.solana.com/address/FFQSwZc2zvnLie5S7A1ZpsYofTnBHLd93czuKAVawQCH?cluster=devnet!
  console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);
};
