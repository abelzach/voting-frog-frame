import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import { createWalletClient, custom, WalletClient } from "viem";

export function useWalletClient(chainId: string): {walletClient: WalletClient} {
  const [walletClient, setWalletClient] = useState<WalletClient>();
  const { primaryWallet } = useDynamicContext();

  const getAndSetSigner = async () => {
    if (!primaryWallet) {
      return;
    }
    const internalWalletClient = await primaryWallet.connector.getMobileOrInstalledWallet().getSigner() as WalletClient;
    const walletClient: WalletClient = createWalletClient({
      chain: internalWalletClient.chain,
      transport: custom(internalWalletClient.transport),
      account: primaryWallet.address as "0x${string}",
    });

    setWalletClient(walletClient);
  };

  useEffect(() => {
    getAndSetSigner();
  }, [primaryWallet]);

  // @ts-ignore
  return { walletClient };
}
