import React, { useState, useEffect } from "react";
import Heading from "@/components/dashboard/Heading";
import Layout from "@/components/dashboard/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import crypto from "crypto";
import EpisodeItem from "@/components/podcast/EpisodeItem";
import PodcastItemSkeleton from "../../components/skeleton/PodcastItemSkeleton";

const API_KEY = process.env.NEXT_PUBLIC_PODCAST_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_PODCAST_API_SECRET;
const API_HEADER_TIME = Math.floor(Date.now() / 1000);
const sha1Hash = crypto.createHash("sha1");
const HASH_DATA = API_KEY + API_SECRET + API_HEADER_TIME;
sha1Hash.update(HASH_DATA);
const API_HASH_HEADER = sha1Hash.digest("hex");

const PodcastPage = () => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "SuperPodcastPlayer/1.8",
      "X-Auth-Key": API_KEY,
      "X-Auth-Date": API_HEADER_TIME,
      Authorization: API_HASH_HEADER,
    };

    const r1 = axios.get(
      `https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=${id}&pretty`,
      { headers }
    );

    const r2 = axios.get(
      `https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=${id}&pretty`,
      { headers }
    );

    axios
      .all([r1, r2])
      .then(
        axios.spread((...responses) => {
          const feedResponse = responses[0].data;
          const episodeResponse = responses[1].data;

          setFeed(feedResponse.feed);
          setEpisodes(episodeResponse.items);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });

    setLoading(false);
  }, [id]);

  return (
    <Layout>
      <div className="w-full min-h-screen">
        <Heading
          crumbs={[
            { name: "Home", link: "/", clickable: true },
            { name: "Dashboard", link: "/", clickable: false },
            { name: "Browse", link: "/dashboard/browse", clickable: true },
            { name: feed?.title, link: "/", clickable: false },
          ]}
        />
        <div className="container max-w-screen-lg mx-auto px-4 py-12">
          <div className="flex flex-row border-b-2 border-gray-300 pb-12">
            {loading ? (
              <PodcastItemSkeleton />
            ) : (
              <img
                className="w-48 h-48 rounded"
                src={feed?.artwork}
                alt={feed?.title}
              />
            )}
            <div className=" pl-6">
              <h1 className="text-blue-600 font-extrabold text-4xl">
                {feed?.title}
              </h1>
              <p className="ml-1 mt-2 font-medium text-gray-700">
                {feed?.author}
              </p>
              <p className="ml-1 mt-2 text-md text-gray-600 leading-loose">
                {feed?.description}
              </p>
            </div>
          </div>
          <div className="my-4">
            {episodes &&
              episodes.map((item) => <EpisodeItem key={item.id} {...item} />)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PodcastPage;
