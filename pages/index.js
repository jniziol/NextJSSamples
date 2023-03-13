import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Home() {
  return (
    <main className={`${inter.variable}`}>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 px-8" aria-label="Global">
          <div className="flex flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <Link href="/auth/signin" className=" lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900">
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>
    </main>
  );
}
