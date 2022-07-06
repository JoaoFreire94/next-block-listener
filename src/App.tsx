import { Flex, Input } from "@chakra-ui/react";

import "./App.css";

import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { Profile } from "./components/Profile";

const alchemyId = "VVbwvDCawpTeWnZ_fZdsWhNHptYj_LqD";
const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon],
    [alchemyProvider({ alchemyId })]
);

const client = createClient({
    autoConnect: true,
    connectors: [
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: "wagmi",
            },
        }),
        new MetaMaskConnector({
            options: {
                shimDisconnect: true,
                shimChainChangedDisconnect: true,
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                qrcode: true,
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: "Injected",
                shimDisconnect: true,
            },
        }),
    ],
    provider,
});

function App() {
    return (
        <WagmiConfig client={client}>
            <Flex className="App-flex">
                <Profile />
                <h1>My First Component using Chakra</h1>
                <Input placeholder="type here" />
            </Flex>
        </WagmiConfig>
    );
}

export default App;
