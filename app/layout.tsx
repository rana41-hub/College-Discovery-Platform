import type { Metadata } from "next";
import Providers from "./providers";
import Nav from "./Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "College Discovery Platform",
  description: "Find, compare, and save colleges that fit you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
