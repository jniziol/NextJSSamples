import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("No user with that email");
        }

        console.log(credentials);

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("No user with that password");
        }

        return { email: user.email, name: user.name };
      },
    }),
  ],
});
