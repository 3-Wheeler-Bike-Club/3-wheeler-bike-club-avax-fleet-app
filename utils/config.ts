import { injected } from "wagmi/connectors";
import { createConfig, http } from "wagmi";
import { avalanche } from "wagmi/chains";

export const config = createConfig({
    connectors: [injected()],
    chains: [avalanche],
    ssr: true,
    transports: {
      [avalanche.id]: http(),
    },
});
