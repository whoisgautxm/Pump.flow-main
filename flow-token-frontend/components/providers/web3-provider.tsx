"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
// import { flowTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";
import { injected, walletConnect } from "@wagmi/connectors";
import { type Chain } from "viem";

export const neox: Chain = {
  id: 12227332,
  name: "NeoX T4",
  nativeCurrency: {
    decimals: 18,
    name: "NeoX T4",
    symbol: "GAS",
  },
  rpcUrls: {
    default: { http: ["https://neoxt4seed1.ngd.network/"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://xt4scan.ngd.network/" }
  },
  testnet: true,
};


export const config = createConfig(
  getDefaultConfig({
    connectors: [
      injected(),
      walletConnect({
        showQrModal: false,
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
      }),
    ],
    transports: {
      [neox.id]: http(neox.rpcUrls.default.http[0]), // Extract the first URL string
    },
    // Your dApps chains
    chains: [neox],

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: "Pump Poo",

    // Optional App Info
    appDescription: "Pump Flow meme coin gen",
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="retro"
          mode="dark"
          customTheme={{
            "--ck-connectbutton-font-size": "8px",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
