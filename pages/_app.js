import "@/styles/globals.css";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className={`${inter.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
