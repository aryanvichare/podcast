import React from "react";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";

const links = {
  product: [
    { name: "Features", link: "#" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Users", link: "/users" },
    { name: "FAQs", link: "/faqs" },
    { name: "Pricing", link: "/pricing" },
  ],
  services: [
    { name: "Transcription", link: "/podcast-translation" },
    { name: "Translation", link: "/language-translation" },
    { name: "Bookmarking", link: "/bookmark" },
  ],
  about: [
    { name: "Our Story", link: "/story" },
    { name: "Company", link: "/company" },
    { name: "Blog", link: "/blog" },
    { name: "Contact Us", link: "/contact" },
  ],
};

const socialMedia = [
  {
    srName: "Facebook",
    link: "https://www.facebook.com",
    icon: IoLogoFacebook,
  },
  {
    srName: "Instagram",
    link: "https://www.instagram.com",
    icon: IoLogoInstagram,
  },
  { srName: "Twitter", link: "https://www.twitter.com", icon: IoLogoTwitter },
];

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-white pt-5 pb-7">
      <div className="px-8 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 mb-3 md:grid-cols-3 lg:grid-cols-12 lg:gap-20">
          <div className="col-span-3">
            <h1 className="text-xl font-extrabold leading-none text-white select-none">
              Podcast+
            </h1>
            <p className="my-4 text-xs leading-normal text-indigo-100">
              We all want to be able to have the same opportunities. To be able
              to learn and grow, to be entertained, to be inspired.
            </p>
          </div>
          <nav className="col-span-1 lg:col-span-2">
            <p className="mb-3 text-xs font-semibold tracking-wider text-indigo-200 uppercase">
              Product
            </p>
            {links.product.map((item) => (
              <Link key={item.name} href={item.link}>
                <a className="flex mb-3 text-sm font-medium text-blue-100 transition md:mb-2 hover:text-white">
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
          <nav className="col-span-1 lg:col-span-2">
            <p className="mb-3 text-xs font-semibold tracking-wider text-indigo-200 uppercase">
              Services
            </p>
            {links.services.map((item) => (
              <Link key={item.name} href={item.link}>
                <a className="flex mb-3 text-sm font-medium text-blue-100 transition md:mb-2 hover:text-white">
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
          <nav className="col-span-1 lg:col-span-2">
            <p className="mb-3 text-xs font-semibold tracking-wider text-indigo-200 uppercase">
              About
            </p>
            {links.about.map((item) => (
              <Link key={item.name} href={item.link}>
                <a className="flex mb-3 text-sm font-medium text-blue-100 transition md:mb-2 hover:text-white">
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
          <div className="col-span-3 flex space-x-4">
            {socialMedia.map((item) => (
              <a
                key={item.srName}
                rel="noopener noreferrer"
                target="_blank"
                href={item.link}
                className="inline h-6 text-indigo-100 hover:text-white"
              >
                <item.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between pt-10 mt-10 border-t border-indigo-500 md:flex-row md:items-center">
          <p className="mb-6 text-sm text-left text-blue-200 md:mb-0">
            © Copyright {new Date().getFullYear()} Podcast+. All Rights
            Reserved.
          </p>
          <div className="flex items-start justify-start space-x-6 md:items-center md:justify-center">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-sm text-blue-200 transition hover:text-white"
            >
              Terms
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-sm text-blue-200 transition hover:text-white"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
