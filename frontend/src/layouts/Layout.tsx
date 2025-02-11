import { Footer, Header } from "@/components";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex-1 py-10 bg-blue-700">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
 