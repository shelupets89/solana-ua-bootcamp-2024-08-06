import { Cluster, Connection, clusterApiUrl } from "@solana/web3.js";

export const getConnection = (cluster: Cluster = "devnet"): Connection => {
  const connection = new Connection(clusterApiUrl(cluster));
  return connection;
};
