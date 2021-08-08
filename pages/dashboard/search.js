import React, { useState, useCallback } from "react";
import Heading from "@/components/dashboard/Heading";
import Layout from "@/components/dashboard/Layout";
import { SearchIcon } from "@heroicons/react/outline";
import debounce from "debounce";
import axios from "axios";
import crypto from "crypto";
import PodcastItem from "@/components/podcast/PodcastItem";
import PodcastItemSkeleton from "../../components/skeleton/PodcastItemSkeleton";

const API_KEY = process.env.NEXT_PUBLIC_PODCAST_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_PODCAST_API_SECRET;
const API_HEADER_TIME = Math.floor(Date.now() / 1000);
const sha1Hash = crypto.createHash("sha1");
const HASH_DATA = API_KEY + API_SECRET + API_HEADER_TIME;
sha1Hash.update(HASH_DATA);
const API_HASH_HEADER = sha1Hash.digest("hex");

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState(null);

  const handleSearch = async (q) => {
    if (q === "") {
      setFeeds(null);
      setLoading(false);
    }
    if (!q) return;
    setFeeds(null); // clear flashing

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "SuperPodcastPlayer/1.8",
      "X-Auth-Key": API_KEY,
      "X-Auth-Date": API_HEADER_TIME,
      Authorization: API_HASH_HEADER,
    };

    const response = await axios.get(
      `https://api.podcastindex.org/api/1.0/search/byterm?q=${q}`,
      { headers }
    );
    const data = response.data;
    setFeeds(data.feeds);

    setLoading(false);
  };

  const debounceOnChange = useCallback(debounce(handleSearch, 1500), []);

  return (
    <Layout>
      <div className="w-full min-h-screen">
        <Heading
          crumbs={[
            { name: "Home", link: "/", clickable: true },
            { name: "Dashboard", link: "/", clickable: false },
            { name: "Search", link: "/", clickable: false },
          ]}
        />
        <div className="container max-w-screen-lg mx-auto px-4 py-12">
          <div className="flex items-center">
            <h1 className="text-blue-600 text-xl font-bold mt-[4px]">
              Search Podcasts
            </h1>
            <div className="flex items-center uppercase text-gray-400 text-sm pt-2 ml-6">
              <span className="mt-[2px]">Integration with</span>
              <img
                className="ml-2 h-8 inline-block"
                src="/spotify.svg"
                alt="Spotify Logo"
              />
              <img
                className="ml-2 h-8 inline-block"
                src="/itunes.svg"
                alt="iTunes Logo"
              />
            </div>
          </div>
          <div className="group relative">
            <input
              type="text"
              className="mt-4 w-full rounded-full bg-white text-gray-700 ring ring-gray-300 px-3 py-3 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Not Overthinking"
              onChange={(e) => {
                setLoading(true);
                debounceOnChange(e.target.value);
              }}
            />
            <SearchIcon className="text-gray-400 w-8 h-8 absolute top-[22px] right-3 group-focus-within:text-blue-500 " />
          </div>
          <div className="mt-12">
            <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {feeds && feeds.map((f) => <PodcastItem key={feeds.id} {...f} />)}
              {loading &&
                Array.from({ length: 10 }, (_, i) => i + 1).map((_, idx) => (
                  <PodcastItemSkeleton key={idx} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
