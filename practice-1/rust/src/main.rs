mod generate_keypairs;
mod load_keypair;
mod check_balance;

fn main() {
    generate_keypairs::generate_keypair(true);
    generate_keypairs::generate_keypair_by_search("ua");
    load_keypair::load_keypair();
    check_balance::check_balance("DimaWWyAW2JBrHoESaYeFTmmzpUeuRUMcqwdox1iWxmp");
}
