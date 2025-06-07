"use client"

import { WagmiProvider } from "wagmi";
import { config } from "@/utils/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient()

export const WagmiContext = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
    )
};
