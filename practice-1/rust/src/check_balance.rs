use solana_client::rpc_client::RpcClient;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

const LAMPORTS_PER_SOL: f64 = 1_000_000_000.0;

pub fn get_connection() -> RpcClient {
    let cluster = "https://api.devnet.solana.com";
    RpcClient::new(cluster.to_string())
}

pub fn check_balance(pubkey: &str) {
    let connection = get_connection();
    let public_key = Pubkey::from_str(pubkey).expect("Invalid PUB_KEY");
    let balance_in_lamports = connection
        .get_balance(&public_key)
        .expect("Failed to get balance");
    let balance_in_sol = balance_in_lamports as f64 / LAMPORTS_PER_SOL;
    println!("Public Key: {pubkey}: Balance: {balance_in_sol} SOL");
}
