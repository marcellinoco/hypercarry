import { getCsrfToken, signIn, signOut, getSession } from "next-auth/react";

import type {
  SIWEVerifyMessageArgs,
  SIWECreateMessageArgs,
  SIWESession,
} from "@reown/appkit-siwe";
import { createSIWEConfig, formatMessage } from "@reown/appkit-siwe";
import { opBNBTestnet } from "@reown/appkit/networks";

export const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    uri: typeof window !== "undefined" ? window.location.origin : "",
    domain: typeof window !== "undefined" ? window.location.host : "",
    chains: [opBNBTestnet.id],
    statement: "Please sign with your account",
  }),

  createMessage: ({ address, ...args }: SIWECreateMessageArgs) =>
    formatMessage(args, address),

  getNonce: async () => {
    const nonce = await getCsrfToken();

    if (!nonce) throw new Error("Failed to get nonce!");
    return nonce;
  },

  getSession: async () => {
    const session = await getSession();
    if (!session) return null;

    if (
      typeof session.address !== "string" ||
      typeof session.chainId !== "number"
    ) {
      return null;
    }

    return {
      address: session.address,
      chainId: session.chainId,
    } satisfies SIWESession;
  },

  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    try {
      const success = await signIn("credentials", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/protected",
      });
      return !!success?.ok;
    } catch {
      return false;
    }
  },

  signOut: async () => {
    try {
      await signOut({ redirect: false });
      return true;
    } catch {
      return false;
    }
  },
});
