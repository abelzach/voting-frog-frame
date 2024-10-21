import { MiddlewareHandler } from "frog";
import { validateFramesPost } from "@xmtp/frames-validator";

export function xmtpSupport(): MiddlewareHandler<{
  Variables: { client?: 'xmtp' | 'farcaster'; verifiedWalletAddress?: string }
}> {
  return async (c, next) => {
    // Check if the request is a POST and relevant for XMTP processing
    if (c.req.method === "POST") {
      const requestBody = (await c.req.json().catch(() => {})) || {};
      if (requestBody?.clientProtocol?.includes("xmtp")) {
        c.set("client", "xmtp");
        const { verifiedWalletAddress } = await validateFramesPost(requestBody);
        c.set("verifiedWalletAddress", verifiedWalletAddress);
      } else {
        // Add farcaster check
        c.set("client", "farcaster");
      }
    }
    await next();
  }
}
