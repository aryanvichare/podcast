import React from "react";
import Heading from "@/components/dashboard/Heading";
import Layout from "@/components/dashboard/Layout";
import { useQuery } from "react-query";
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

const BrowsePodcasts = () => {
  const { isLoading, error, data } = useQuery(
    "trending",
    () =>
      fetch(
        "https://api.podcastindex.org/api/1.0/podcasts/trending?pretty&lang=en",
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "SuperPodcastPlayer/1.8",
            "X-Auth-Key": API_KEY,
            "X-Auth-Date": API_HEADER_TIME,
            Authorization: API_HASH_HEADER,
          },
        }
      ).then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  return (
    <Layout>
      <div className="w-full min-h-screen">
        <Heading
          crumbs={[
            { name: "Home", link: "/", clickable: true },
            { name: "Dashboard", link: "/", clickable: false },
            { name: "Browse", link: "/", clickable: false },
          ]}
        />
        <div className="container max-w-screen-lg mx-auto px-4 py-12">
          <h1 className="text-primary text-xl font-bold">Trending</h1>
          {isLoading || error ? (
            <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 60 }, (_, i) => i + 1).map((_, idx) => (
                <PodcastItemSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {data.feeds.map((item) => (
                <PodcastItem key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BrowsePodcasts;
