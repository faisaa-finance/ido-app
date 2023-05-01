import React from "react";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
//import { publicProvider } from "wagmi/providers/public";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
const coreTestnetChain = {
  id: 1115,
  name: 'Core Testnet',
  network: 'Core Testnet',
  iconUrl: 'https://scan.test.btcs.network/images/Core_logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Core Testnet',
    symbol: 'tCore',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.test.btcs.network'],
    },
  },
  blockExplorers: {
    default: { name: 'Core Scan', url: 'https://scan.test.btcs.network/' },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [coreTestnetChain],
  [
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Faisaa IDO',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#00107f",
            overlayBlur: "small",
          })}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </MoralisProvider>
  );
}

export default MyApp;
