import Head from "next/head";
import Image from "next/image";
import Logo from "../public/logo.png";
import Person from "../public/home-person.png";
import Transcript from "../public/transcript.png";
import Translate from "../public/translate.png";
import Bookmarks from "../public/bookmarks.png";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Podcare</title>
        <meta
          name="description"
          content="Making podcast accessible to everyone"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Blue section */}
      <div className="flex-col bg-primary h-screen">
        {/* nav */}
        <div className="flex flex-row px-20 py-5">
          <div className="py-3">
            <Image src={Logo} alt="Podcare" height="40" width="40" />
          </div>
          <h1 className="text-3xl font-bold text-highlight px-2 py-3 w-auto">
            Podcare+
          </h1>
        </div>

        {/* splash */}
        <div className="flex flex-row pl-20 my-20">
          <div className="flex-row">
            <p className="text-4xl font-bold text-white inline pr-4">
              Make podcast accessible <br />
              for
            </p>
            <p className="text-4xl font-bold text-white bg-highlight rounded  inline-block p-1">
              everyone
            </p>
            <p className="text-xl text-white my-5">- No exception.</p>
            <div className="bg-secondary font-bold inline-block rounded-lg text-white px-5 py-2 cursor-pointer mb-20">
              Try our app
            </div>
          </div>
          <div className="absolute bottom-0 right-0 self-end ">
            <Image src={Person} alt="Person with glasses" />
          </div>
        </div>
      </div>
      {/* Text section */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-primary px-2 py-3 w-auto mt-20 mb-2 text-center">
          Deaf and hard of hearing people <br /> want access to podcasts.
        </h1>
        <p className="text-xl text-info px-2 w-auto mb-5 text-center">
          We all want to be able to have the same opportunities.
          <br /> To be able to learn and grow, to be entertained, to be
          inspired.
        </p>

        <h1 className="text-4xl font-bold text-primary px-2 py-3 w-auto mt-10 mb-2 text-center">
          How it works?
        </h1>
        {/* Transcript section */}
        <div className="my-10 mx-5 flex flex-row items-center">
          <div className="w-1/2">
            <Image src={Transcript} alt="Transcripts" />
          </div>
          <div className="w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold text-primary px-2 py-3 w-auto mt-10 mb-2 text-center">
              Podcast Transcript
            </h1>
            <p className="text-xl text-info px-2 w-auto mb-5 text-center">
              Select a podcast episode, and let us transcribe it for you.
              <br /> Fast and simple.
            </p>
          </div>
        </div>
        {/* Translate section */}
        <div className="m-10 w-4/5 flex flex-row items-center justify-center">
          <div className="w-1/3">
            <Image src={Translate} alt="Translation" />
          </div>
          <div className="w-2/3">
            <h1 className="text-4xl font-bold text-primary px-2 py-3 w-auto mt-10 mb-2 text-center">
              Available in many languages
            </h1>
            <p className="text-xl text-info px-2 w-auto mb-5 text-center">
              Available in many languages. You’re a non-native speaker? Don’t
              worry! All podcast episodes can be translated to any language you
              wish!
            </p>
          </div>
        </div>
        {/* Bookmark section */}
        <div className="m-10 w-4/5 flex flex-row items-center justify-center mb-48">
          <div className="">
            <h1 className="text-4xl font-bold text-primary px-2 py-3 w-auto mt-10 mb-2 text-center">
              Bookmark Snippets
            </h1>
            <p className="text-xl text-info px-2 w-auto mb-5 text-center">
              Found something interesting while reading? Bookmark it and save
              for later.
            </p>
          </div>
          <Image src={Bookmarks} alt="Bookmarks" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
