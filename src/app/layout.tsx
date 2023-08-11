import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/template/Navbar";
import ContentWrapper from "@/container/ContentWrapper";
import BreadCrumb from "@/components/atoms/BreadCrumb";

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
  const steps = ["home", "detail"];

  return (
    <html lang="en">
      <body className={nunito.className}>
        {/* <BreadCrumb steps={steps} /> */}
        <ContentWrapper>{children}</ContentWrapper>
      </body>
    </html>
  );
}
