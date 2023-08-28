import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";

import ContentWrapper from "@/container/ContentWrapper";
import AppWrapper from "@/container/AppContainer";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phone Book",
  description: "Phone Book App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={nunito.className} style={{backgroundColor: "var(--neutral-20)"}}>
        <AppWrapper>
          <ContentWrapper>{children}</ContentWrapper>
        </AppWrapper>
      </body>
    </html>
  );
}
