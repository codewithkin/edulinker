import { sendVerificationEmail } from "@/helpers/email/sendVerificationEmail";
import prisma from "@/helpers/prisma";
import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    sendVerificationEmail: async ({user, url, token}, request) => {
      if (!user.email) {
        console.error(
          "Attempted to send verification email to a user without an email address."
        );
        return;
      }
      await sendVerificationEmail({
        to: user.email,
        subject: "Verify your email address for Edulinker",
        text: `Hello ${
          user.name || "there"
        },\n\nPlease click on the following link to verify your email address:\n\n${url}\n\nThis link will expire soon. If you did not request this, please ignore this email.\n\nBest regards,\nThe Edulinker Team`,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
