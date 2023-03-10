import { useState, useEffect } from "react";
import {
  MantineProvider,
  Text,
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Space,
} from "@mantine/core";
import * as Kilt from "@kiltprotocol/sdk-js";

import "./App.css";

function App() {
  const [did, setDid] = useState("");
  const [name, setName] = useState("john_doe");

  useEffect(() => {
    const resolveWeb3Name = async () => {
      const api = await Kilt.connect("wss://spiritnet.kilt.io");
      const encodedDidDetails = await api.call.did.queryByWeb3Name(name);

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
  }, [name]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <TextInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Space h="md" />
      <div className="App">
        {name} is {did}
      </div>
    </MantineProvider>
  );
}

export default App;
