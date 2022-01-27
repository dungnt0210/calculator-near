use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Contract {
    pub calculation_count: u16
}

#[near_bindgen]
impl Contract {
    pub fn get_calculation_count(&self) -> u16 {
        self.calculation_count
    }
    pub fn set_calculation_count(&mut self, count: u16) {
        self.calculation_count = count;
    }

    pub fn add(&mut self, param1: u16, param2: u16) -> u16 {
        self.calculation_count += 1;
        param1 + param2
    }

    pub fn minus(&mut self, param1: u16, param2: u16) -> u16 {
        self.calculation_count += 1;
        param1 - param2
    }

    pub fn multiple(&mut self, param1: u16, param2: u16) -> u16 {
        self.calculation_count += 1;
        param1 * param2
    }


    pub fn divide(&mut self, param1: u16, param2: u16) -> u16 {
        self.calculation_count += 1;
        param1 / param2
    }


    pub fn square(&mut self, param1: u16) -> u16 {
        self.calculation_count += 1;
        param1 * param1
    }

    pub fn square_root(&mut self, param1: u16) -> u16 {
        self.calculation_count += 1;
        let mut z = (param1 + 1) / 2;
        let mut y = param1.clone();
        while z < y {
            y = z;
            z = (param1 / z + z) / 2;
        }
        y
    }
}

/*
 * the rest of this file sets up unit tests
 * to run these, the command will be:
 * cargo test --package rust-template -- --nocapture
 * Note: 'rust-template' comes from Cargo.toml's 'name' key
 */

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{get_logs, VMContextBuilder};
    use near_sdk::{testing_env, AccountId};

    // part of writing unit tests is setting up a mock context
    // provide a `predecessor` here, it'll modify the default context
    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder
    }

    // TESTS HERE
}
