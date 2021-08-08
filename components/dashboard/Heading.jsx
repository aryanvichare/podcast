import React from "react";
import Breadcrumb from "../Breadcrumb";
import { useAuth } from "@/lib/auth";

const Heading = ({ crumbs }) => {
  const auth = useAuth();

  return (
    <nav className="w-full px-12 flex items-center justify-between h-16 bg-white border-b-2 border-gray-300">
      <Breadcrumb crumbs={crumbs} />
      <button
        onClick={() => auth.signOut()}
        className="inline-block px-4 py-2 rounded-md bg-blue-600 focus:outline-none hover:bg-blue-700 text-white font-medium text-sm mt-2"
      >
        Log out
      </button>
    </nav>
  );
};

export default Heading;
