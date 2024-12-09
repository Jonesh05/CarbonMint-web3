import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const { chains, provider } = configureChains(
  [arbitrum, mainnet, polygon],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <h1 className="text-xl font-bold">Vendor Dashboard</h1>
          <nav className="flex gap-4">
            <button className="hover:text-green-400">Information</button>
            <button className="hover:text-green-400">Transfers</button>
          </nav>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}