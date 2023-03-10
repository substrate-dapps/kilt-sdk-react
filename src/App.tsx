import { useState, useEffect } from "react";
import * as Kilt from "@kiltprotocol/sdk-js";

import "./App.css";

function App() {
  const [did, setDid] = useState("");

  useEffect(() => {
    const resolveWeb3Name = async () => {
      const api = await Kilt.connect("wss://spiritnet.kilt.io");
      const encodedDidDetails = await api.call.did.queryByWeb3Name("john_doe");

      try {
        const {
          document: { uri },
        } = Kilt.Did.linkedInfoFromChain(encodedDidDetails);
        setDid(uri);
      } catch {
        setDid("unknown");
      }
    };
    resolveWeb3Name();
  });

  return <div className="App">john_doe is {did}</div>;
}

export default App;
