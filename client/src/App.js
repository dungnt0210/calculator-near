import React, { useState } from "react";
import { CalculateProvider } from "./context/CalculateContext";
import getConfig from "./context/config.js";

import "./App.css";
import { Keyboard, Monitor } from "./components";
function App() {
  const [param1, setParam1] = useState(0);
  const [param2, setParam2] = useState(0);
  const [isParam1Done, setIsParam1Done] = useState(false);
  const [opt, setOpt] = useState("");
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");
  const clickLogin = () => {
    window.walletConnection?.requestSignIn(nearConfig.contractName);
  }
  // if (!window.walletConnection?.isSignedIn()) {
  //   return (
  //     <main>
  //       <h1>Welcome to NEAR!</h1>
  //       <p>
  //         To make use of the NEAR blockchain, you need to sign in. The button
  //         below will sign you in using NEAR Wallet.
  //       </p>
  //       <p>
  //         By default, when your app runs in "development" mode, it connects to a
  //         test network ("testnet") wallet. This works just like the main network
  //         ("mainnet") wallet, but the NEAR Tokens on testnet aren't convertible
  //         to other currencies – they're just for testing!
  //       </p>
  //       <p>Go ahead and click the button below to try it out:</p>
  //       <p style={{ textAlign: "center", marginTop: "2.5em" }}>
  //         <button onClick={clickLogin}>Sign in</button>
  //       </p>
  //     </main>
  //   );
  // }
  return (
    <CalculateProvider>
      <div style={{ width: "100vw" }}>
        <div style={{ margin: "100px auto 100px", display:"flex", flexDirection:"column", width: "max-content"}}>
          <Monitor
            param1={param1}
            param2={param2}
            opt={opt}
            isParam1Done={isParam1Done}
          />
          <Keyboard
            setParam1={setParam1}
            setParam2={setParam2}
            setOpt={setOpt}
            isParam1Done={isParam1Done}
            param1={param1}
            param2={param2}
            setIsParam1Done={setIsParam1Done}
            opt={opt}
          />
        </div>
      </div>
    </CalculateProvider>
  );
}

export default App;
