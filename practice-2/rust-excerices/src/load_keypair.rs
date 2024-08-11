use dotenv::dotenv;
use serde_json::from_str;
use solana_sdk::signer::keypair::Keypair;
use solana_sdk::signer::Signer;
use std::env;

fn recover_keypair(s: Vec<u8>) -> Keypair {
    Keypair::from_bytes(&s).expect("Failed to create Keypair from SECRET_KEY")
}

pub fn load_keypair() {
    dotenv().ok();
    let key = "SECRET_KEY";
    let secret_key_str = env::var(key).expect("SECRET_KEY not found in .env");
    let secret_key_bytes: Vec<u8> = from_str(&secret_key_str).expect("Failed to parse SECRET_KEY");
    let keypair = recover_keypair(secret_key_bytes);

    println!("Public Key: {}", keypair.pubkey());
}
