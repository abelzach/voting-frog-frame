import { Client } from "@xmtp/xmtp-js";
import { useEffect } from "react";
import { useBiconomyAccount } from "../biconomy/useBiconomyAccount";

export async function useXMTP() {
  const {smartAccount} = useBiconomyAccount();

  const xmtp = await Client.create(smartAccount, { env: "dev" });
  console.log("Client created", xmtp.address);
  
}
