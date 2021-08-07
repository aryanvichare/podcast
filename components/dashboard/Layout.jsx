import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-no-wrap w-full">
      <Navigation />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;
