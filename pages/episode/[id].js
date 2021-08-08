import React, { useState, useEffect, useRef } from "react";
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
import {
  FaPlayCircle,
  FaPauseCircle,
  FaBackward,
  FaForward,
} from "react-icons/fa";
import { transcript } from "data/transcript";

const API_KEY = process.env.NEXT_PUBLIC_PODCAST_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_PODCAST_API_SECRET;
const API_HEADER_TIME = Math.floor(Date.now() / 1000);
const sha1Hash = crypto.createHash("sha1");
const HASH_DATA = API_KEY + API_SECRET + API_HEADER_TIME;
sha1Hash.update(HASH_DATA);
const API_HASH_HEADER = sha1Hash.digest("hex");

const sampleTranscript = transcript;

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
  let [audio, setAudio] = useState(0);
  let [audioPlay, setAudioPlay] = useState(true);

  useEffect(() => {
    const updateTime = setInterval(() => {
      if (audioPlay) {
        setAudio((audio) => audio + 0.1);
      }
    }, 1500);
  }, [audioPlay]);

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
        <div className="container max-w-screen-xl mx-auto px-4 py-12">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <div className="flex items-center">
                <h1 className="text-primary text-2xl font-bold">
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
                          className={`cursor-pointer absolute -ml-48 w-[150px] bg-primary font-bold hover:bg-primaryAccent py-2 text-center text-white rounded`}
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
              <h1 className="text-primary text-2xl font-bold">
                Recommendation
              </h1>
              <Recommendations />
            </div>
          </div>
        </div>
        <audio id="podcast" src={episode?.enclosureUrl} autoPlay="true"></audio>
        <div className="sticky bottom-0 right-0 bg-white h-32 flex flex-col items-center">
          {/* seekbar */}
          <div className="w-full flex flex-row items-center mb-2">
            <div
              className="h-2 bg-primary self-start mt-1 transition duration-700 ease-in-out"
              style={{ width: `${audio}%` }}
            ></div>
            <div className="bg-primary rounded-full h-4 w-4"></div>
            <div
              className="h-2 bg-gray-200 self-start mt-1"
              style={{ width: `${99 - audio}%` }}
            ></div>
          </div>
          {/* player */}
          <div className="flex flex-row content-between w-full items-center">
            <div className="flex flex-row w-3/4">
              {episode ? (
                <img
                  src={episode?.image}
                  className=" ml-8 p-1 h-24 w-24 rounded-xl "
                  alt={episode?.title}
                />
              ) : (
                <div className="ml-8 p-1 h-24 w-24 bg-gray-200 animate-pulse" />
              )}
              <div className="h-24 flex flex-col justify-center ml-5">
                <div className="text-primary font-bold">
                  {episode ? episode.title : "..."}
                </div>
                <div className="text-subheading">
                  {episode ? episode.feedTitle : "-"}
                </div>
              </div>
            </div>
            {/* Controls */}
            <div className="w-1/5 flex flex-row content-between mr-32 items-center">
              <FaBackward className="cursor-pointer text-primary text-4xl w-32 " />
              {audioPlay ? (
                <FaPauseCircle
                  className="cursor-pointer text-primary text-5xl w-32"
                  onClick={() => {
                    console.log("CLICKED");
                    setAudioPlay(false);
                  }}
                />
              ) : (
                <FaPlayCircle
                  className="cursor-pointer text-primary text-5xl w-32"
                  onClick={() => setAudioPlay(true)}
                />
              )}

              <FaForward className="cursor-pointer text-primary text-4xl w-32 " />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EpisodePage;
