import React, { memo } from "react";
import Link from "next/link";
import crypto from "crypto";
import { useQuery } from "react-query";
import moment from "moment";

const API_KEY = process.env.NEXT_PUBLIC_PODCAST_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_PODCAST_API_SECRET;
const API_HEADER_TIME = Math.floor(Date.now() / 1000);
const sha1Hash = crypto.createHash("sha1");
const HASH_DATA = API_KEY + API_SECRET + API_HEADER_TIME;
sha1Hash.update(HASH_DATA);
const API_HASH_HEADER = sha1Hash.digest("hex");

const RecommendationItem = ({
  id,
  title,
  image,
  author,
  newestItemPublishTime,
}) => {
  return (
    <Link href={`/podcast/${id}`}>
      <a>
        <div className="cursor-pointer inline-flex flex-row items-center px-4 py-2 hover:bg-gray-50">
          <img className="w-24 h-24 rounded-md" src={image} alt={title} />
          <div className="ml-4">
            <h2 className="font-bold text-blue-600 text-xl">{title}</h2>
            <p className="text-sm font-medium text-blue-600">{author}</p>
            <p className="text-xs text-gray-400">
              {moment(new Date(newestItemPublishTime * 1000)).format(
                "MMMM Do YYYY"
              )}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Recommendations = () => {
  const { isLoading, error, data } = useQuery(
    "trending",
    () =>
      fetch(
        "https://api.podcastindex.org/api/1.0/podcasts/trending?pretty&max=20&lang=en",
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

  /* Durstenfeld shuffle algorithm */
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  return (
    <div className="mt-8 flex flex-col">
      {data &&
        shuffleArray(data.feeds)
          .slice(0, 8)
          .map((item) => <RecommendationItem key={item.id} {...item} />)}
    </div>
  );
};

export default memo(Recommendations);
