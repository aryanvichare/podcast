import React, { useState, useEffect } from "react";
import Heading from "@/components/dashboard/Heading";
import Layout from "@/components/dashboard/Layout";
import { useRouter } from "next/router";
import crypto from "crypto";
import axios from "axios";
import LanguageDropdown from "@/components/episode/LanguageDropdown";
import Recommendations from "@/components/episode/Recommendations";
import { Popover } from "react-text-selection-popover";
import { useAuth } from "@/lib/auth";
import { addBookmark } from "@/lib/firestore";
import toast, { Toaster } from "react-hot-toast";

const API_KEY = process.env.NEXT_PUBLIC_PODCAST_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_PODCAST_API_SECRET;
const API_HEADER_TIME = Math.floor(Date.now() / 1000);
const sha1Hash = crypto.createHash("sha1");
const HASH_DATA = API_KEY + API_SECRET + API_HEADER_TIME;
sha1Hash.update(HASH_DATA);
const API_HASH_HEADER = sha1Hash.digest("hex");

const sampleTranscript = `Adam Wathan has been obsessed with computers since he was a
                  kid. In fact, he was introduced to computers by his 1st grade
                  librarian.. and his first programming project was using
                  Q-Basic, following a tutorial on how to make a pro wrestling
                  simulator. During his time in university, he wasn’t enjoying
                  the programming curriculum and ended up dropping out to play
                  in his band, and working odd jobs to support his music career.
                  During this, he got into the production side of music, and
                  started a home studio to record local bands. Four years after
                  he quit programming, he started tinkering with the same
                  framework used to make Winamp – called reaper – and fell in
                  love with pogromming all over again. At this point, he tried
                  school again, but post internship, he decided to go straight
                  into the field without finishing his degree. These days, he is
                  married with a young family. Besides staying busy with that,
                  he still finds time to play games with his remote friends, and
                  occasionally trains for powerlifting. He met his business
                  partner, Steve, in college, and hacked on side projects
                  together. These side projects led to the creation of a mini
                  CSS framework, which Wathan started using throughout other
                  projects, growing it into something he was quite proud of. In
                  fact, while live-streaming some coding, he was surprised by
                  the influx of people asking what it was… and where they could
                  get it. He decided to open source the framework in 2017, and
                  it has steadily grown and grown in usage – to the tune of
                  millions of downloads a month. This is the creation story of
                  Tailwind CSS and Tailwind Labs.`;

const EpisodePage = () => {
  const auth = useAuth();
  const [ref, setRef] = useState();
  const [language, setLanguage] = useState({
    name: "English",
    svg: "https://lipis.github.io/flag-icon-css/flags/4x3/us.svg",
    code: "en",
  });
  const [episode, setEpisode] = useState(null);
  const [englishTranscript, _] = useState(sampleTranscript);
  const [episodeTranscript, setEpisodeTranscript] = useState(sampleTranscript);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "SuperPodcastPlayer/1.8",
      "X-Auth-Key": API_KEY,
      "X-Auth-Date": API_HEADER_TIME,
      Authorization: API_HASH_HEADER,
    };

    axios
      .get(
        `https://api.podcastindex.org/api/1.0/episodes/byid?id=${id}&pretty`,
        { headers }
      )
      .then(async (response) => {
        const data = response.data;
        setEpisode(data.episode);
      });
  }, [id]);

  useEffect(() => {
    if (language.code === "en") {
      setEpisodeTranscript(englishTranscript);
      return;
    }

    axios
      .post(`/api/proxy?proxyRoute=translator`, {
        from: "en",
        to: language.code,
        text: englishTranscript,
      })
      .then(async (response) => {
        const data = response.data;
        setEpisodeTranscript(data.result);
      });
  }, [language]);

  const saveBookmark = (cnt) => {
    const formattedText = cnt.trim().replace("\t", "");
    // text, name, author, image
    console.log(episode, formattedText);
    const payload = {
      episode,
      formattedText,
    };

    addBookmark(auth?.user?.uid, payload);

    toast.success("Bookmark Added!");

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
  };

  return (
    <Layout>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 4000 }}
      />
      <div className="w-full min-h-screen">
        <Heading
          crumbs={[
            { name: "Home", link: "/", clickable: true },
            { name: "Dashboard", link: "/", clickable: false },
            { name: "Browse", link: "/dashboard/browse", clickable: true },
            { name: episode?.title, link: "/", clickable: false },
          ]}
        />
        <div className="container max-w-screen-zl mx-auto px-4 py-12">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <div className="flex items-center">
                <h1 className="text-blue-600 text-2xl font-bold">
                  Transcript in
                </h1>
                <LanguageDropdown
                  selected={language}
                  setSelected={setLanguage}
                />
              </div>
              <div className="mt-8">
                <p
                  ref={(el) => el != null && setRef(el)}
                  className="prose prose-md"
                >
                  {episodeTranscript}
                </p>
                {process.browser && (
                  <Popover
                    target={ref}
                    render={({ clientRect, isCollapsed, textContent }) => {
                      if (clientRect == null || isCollapsed) return null;
                      return (
                        <div
                          style={{
                            left: `${clientRect.left + clientRect.width}px`,
                            top: `${clientRect.top - 50}px`,
                          }}
                          className={`cursor-pointer absolute -ml-48 w-[150px] bg-blue-500 font-bold hover:bg-blue-600 py-2 text-center text-white rounded`}
                        >
                          <button
                            className="w-full h-full font-bold"
                            onClick={() => saveBookmark(textContent)}
                          >
                            Bookmark
                          </button>
                        </div>
                      );
                    }}
                  />
                )}
              </div>
            </div>
            <div className="col-span-5">
              <h1 className="text-blue-600 text-2xl font-bold">
                Recommendation
              </h1>
              <Recommendations />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EpisodePage;
