import { useState, useEffect, useCallback } from "react";
import { createSmartAccount } from "./Biconomy";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { useWalletClient } from "../dynamic/useWalletClient";
import { sepolia } from "viem/chains";

export function useBiconomyAccount() {
  const { walletClient } = useWalletClient(`${sepolia.id}`);
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);

  const createAndSetSmartAccount = useCallback(async () => {
    if (!walletClient) {
      setSmartAccount(null);
      return;
    }

    try {
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
  }, [walletClient, smartAccount]);

  useEffect(() => {
    createAndSetSmartAccount();
  }, [createAndSetSmartAccount]);

  return { smartAccount };
}
