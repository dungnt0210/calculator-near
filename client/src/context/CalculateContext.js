import React, { useEffect, useState } from "react";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import getConfig from "./config.js";
export const CalculateContext = React.createContext();

export const CalculateProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(0);
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");
  function logout() {
    window.walletConnection?.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  }

  function login() {
    window.walletConnection?.requestSignIn(nearConfig.contractName);
  }
  const init = async () => {
    const near = await connect(
      Object.assign(
        { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
        nearConfig
      )
    );

    // Initializing Wallet based Account. It can work with NEAR testnet wallet that
    // is hosted at https://wallet.testnet.near.org
    window.walletConnection = new WalletConnection(near);
    console.log("init");
    // Getting the Account ID. If still unauthorized, it's just empty string
    window.accountId = window.walletConnection?.getAccountId();

    // Initializing our contract APIs by contract name and configuration
    window.contract = await new Contract(
      window.walletConnection?.account(),
      nearConfig.contractName,
      {
        viewMethods: ["get_calculation_count"],
        changeMethods: [
          "add",
          "minus",
          "divide",
          "multiple",
          "square_root",
          "square"
        ]
      }
    );
    setIsInitialized(true);
  };

  const add = async (param1, param2) => {
    if (!isInitialized) {
      await init();
    }
    var res = await window.contract.add({
      param1: param1,
      param2: param2,
    });
    setResult(res);
  };

  const minus = async (param1, param2) => {
    if (!isInitialized) {
      await init();
    }

    var res = await window.contract.minus({
      param1: param1,
      param2: param2,
    });
    setResult(res);
  };

  const multiple = async (param1, param2) => {
    if (!isInitialized) {
      await init();
    }

    var res = await window.contract.multiple({
      param1: param1,
      param2: param2,
    });
    setResult(res);
  };

  const divide = async (param1, param2) => {
    if (!isInitialized) {
      await init();
    }
    var res = await window.contract.divide({
      param1: param1,
      param2: param2,
    });
    setResult(res);
  };

  const square = async (param1) => {
    if (!isInitialized) {
      await init();
    }

    var res = await window.contract.square({
      param1: param1,
    });
    setResult(res);
  };

  const squareRoot = async (param1) => {
    if (!isInitialized) {
      await init();
    }

    var res = await window.contract.square_root({
      param1: param1,
    });
    setResult(res);
  };

  useEffect(() => {
    if (!isInitialized) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  useEffect(() => {
    if (!window.walletConnection?.isSignedIn()) {
      login();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isInitialized) {
      var res = window.contract.get_calculation_count();
      setCount(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, isInitialized]);

  return (
    <CalculateContext.Provider
      value={{
        add,
        minus,
        square,
        squareRoot,
        divide,
        multiple,
        result,
        count
      }}
    >
      {children}
    </CalculateContext.Provider>
  );
};
