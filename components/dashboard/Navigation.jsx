import React from "react";
import {
  LibraryIcon,
  SearchIcon,
  BookmarkIcon,
  CogIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const links = [
  {
    name: "Browse",
    href: "/dashboard/browse",
    icon: LibraryIcon,
  },
  {
    name: "Search",
    href: "/dashboard/search",
    icon: SearchIcon,
  },
  {
    name: "Bookmark",
    href: "/dashboard/bookmark",
    icon: BookmarkIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: CogIcon,
  },
];

const Navigation = () => {
  const router = useRouter();

  return (
    <div className="overflow-y-scroll lg:overflow-y-auto sticky min-h-screen z-40 top-0 bg-blue-600 w-64 lg:w-72">
      <div className="h-full flex flex-col items-start justify-between">
        <div className="w-full block">
          <h1 className="text-white font-bold text-3xl pt-6 px-4">Podcast+</h1>
          <div className="pt-6">
            <h2 className="pl-4 pb-2 text-sm uppercase text-blue-200 font-bold">
              Menu
            </h2>
            <nav className="pl-4 flex flex-col space-y-2 pr-4">
              {links.map((l) => (
                <Link href={l.href}>
                  <a
                    className={clsx(
                      "pl-2 w-full flex flex-row items-center py-2 text-white transition-all ease-in-out duration-150 hover:bg-blue-500 bg-opacity-50 rounded-md",
                      router.pathname === l.href && "bg-blue-500"
                    )}
                  >
                    <l.icon className="w-6 h-6 text-white mr-2" />
                    {l.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="block w-full bg-blue-500 h-24">
          <div className="h-full flex pl-4 justify-start items-center">
            <img
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
              src="https://media-exp1.licdn.com/dms/image/C4E03AQFru0RCZ7iBCA/profile-displayphoto-shrink_400_400/0/1623107074140?e=1633564800&v=beta&t=krsdhC-VBWnxJPdvTRfhyHf54OJ05mVnTqui_WQAXpk"
              alt="Aryan Vichare"
            />
            <div className="flex flex-col pl-2">
              <p className="text-white font-bold">Aryan Vichare</p>
              <p className="text-white text-[10px] w-24 sm:w-auto truncate">
                aryanvichare10@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
