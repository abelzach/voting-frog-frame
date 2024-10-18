import { useState, useEffect, useCallback } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createSmartAccount } from "./Biconomy";
import { BiconomySmartAccountV2 } from "@biconomy/account";

export function useBiconomyAccount() {
  const { primaryWallet } = useDynamicContext();
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);

  const createAndSetSmartAccount = useCallback(async () => {
    if (!primaryWallet) {
      setSmartAccount(null);
      return;
    }

    try {
      const walletClient = await primaryWallet.getWalletClient();
      if (walletClient && !smartAccount) {
        console.log("Creating smart account");
        const newSmartAccount = await createSmartAccount(walletClient);
        setSmartAccount(newSmartAccount);
      }
    } catch (error) {
      console.error(
        "Error fetching wallet clients or creating smart account:",
        error
      );
    }
  }, [primaryWallet, smartAccount]);

  useEffect(() => {
    createAndSetSmartAccount();
  }, [createAndSetSmartAccount]);

  return { smartAccount };
}
