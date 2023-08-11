"use client"
import './globals.css'
import { Chicle } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
  safeWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
  goerli,
  gnosis,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    gnosis,
    sepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = 'Smile';

const demoAppInfo = {
  appName: 'Smile Protocol',
};

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId, chains }),
      safeWallet({ chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      coinbaseWallet({ chains, appName: 'Smile Protocol' }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const chicle = Chicle({ subsets: ['latin'], weight:'400' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      
      <body className={chicle.className}>
      <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
      {children}
      </RainbowKitProvider>
          </WagmiConfig></body>

    </html>

  )
}
