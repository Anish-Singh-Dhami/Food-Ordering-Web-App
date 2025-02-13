import { Footer, Header, Hero } from "@/components";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}
