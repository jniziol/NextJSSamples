import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className={`${inter.variable}`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
