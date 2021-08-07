import Head from "next/head";
import Image from "next/image";
import Logo from "../public/logo.png";
import Person from "../public/home-person.png";

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
    </div>
  );
}
