import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/lib/auth";
import router from "next/router";

const SocialSignIn = ({ setOpen, disableClose = false }) => {
  const auth = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      className="fixed inset-0 z-50 overflow-auto h-screen w-full flex flex-row items-center justify-center md:px-0 px-12"
    >
      <div
        style={{ backgroundColor: "#101F35" }}
        className="z-20 bg-[#101F35] shadow-lg rounded-sm relative p-4 w-full max-w-md m-auto flex-col flex border-primary border-t-4 pb-8"
      >
        {!disableClose && (
          <svg
            className="w-6 h-6 absolute top-4 right-4 text-gray-300 cursor-pointer"
            onClick={() => setOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        <div className="flex flex-col justify-center items-center w-full p-4">
          <div className="flex items-center mr-4 mb-6">
            <img className="h-12" src="/logo.png" alt="Podcare+ Logo" />
            <h1 className="text-white font-bold text-2xl ml-2">Podcare+</h1>
          </div>
          <p className="text-center text-md mt-2 text-white font-bold">
            Login to get full access to your account
          </p>
        </div>
        <div className="mt-2 px-4 flex flex-col space-y-4 items-center justify-center">
          <button
            onClick={() =>
              auth.signInWithGoogle().then(() => {
                setOpen(false);
                router.push("/dashboard/browse");
              })
            }
            className="bg-white border-2 w-full flex flex-row justify-center items-center rounded shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <div className="bg-white inline-block p-2 rounded m-1">
              <FcGoogle size={32} />
            </div>
            <span className="mx-auto pr-12 text-lg text-primary font-bold">
              Google
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialSignIn;
