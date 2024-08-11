import { airdropIfRequired } from "@solana-developers/helpers";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getConnection } from "./get-connection";
import { getPublicKey } from "./get-public-key";

export const airdropSol = async () => {
  try {
    const response = await airdropIfRequired(
      getConnection(),
      getPublicKey(),
      1 * LAMPORTS_PER_SOL,
      0.5 * LAMPORTS_PER_SOL
    );

    console.log(">>> response : ", response);
  } catch (error) {
    console.log(">>> error : ", (error as Error).message);
  }
};
