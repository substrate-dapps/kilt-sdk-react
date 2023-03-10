import { useState, useEffect } from "react";
import {
  MantineProvider,
  Text,
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
} from "@mantine/core";
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

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <TextInput label="Name" placeholder="Enter your name" />
      <div className="App">john_doe is {did}</div>
    </MantineProvider>
  );
}

export default App;
