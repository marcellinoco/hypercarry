import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import {
  verifySignature,
  getChainIdFromMessage,
  getAddressFromMessage,
  SIWESession,
} from "@reown/appkit-siwe";

declare module "next-auth" {
  interface Session extends SIWESession {
    address: string;
    chainId: number;
  }
}

const nextAuthSecret = process.env.NEXTAUTH_SECRET!;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

export const authOptions = {
  secret: nextAuthSecret,
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }) {
      if (!token.sub) return session;

      const [, chainId, address] = token.sub.split(":");
      if (chainId && address) {
        session.address = address;
        session.chainId = parseInt(chainId, 10);
      }

      return session;
    },
  },
  providers: [
    Credentials({
      name: "Ethereum",

      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.message) {
            throw new Error("SiweMessage is undefined");
          }

          const { message, signature } = credentials;
          const address = getAddressFromMessage(message);
          const chainId = getChainIdFromMessage(message);

          const isValid = await verifySignature({
            address,
            message,
            signature,
            chainId,
            projectId,
          });

          if (isValid) {
            return { id: `${chainId}:${address}` };
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
} satisfies AuthOptions;
