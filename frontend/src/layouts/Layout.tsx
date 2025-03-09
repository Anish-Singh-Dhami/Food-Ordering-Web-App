import { Footer, Header, Hero } from "@/components";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  showHero?: boolean;
};

export function Layout({ children, showHero = false }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}
