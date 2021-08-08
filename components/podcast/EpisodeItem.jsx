import React from "react";
import striptags from "striptags";
import moment from "moment";
import router from "next/router";
import { FaPlay } from "react-icons/fa";

const EpisodeItem = ({ id, title, description, datePublished, duration }) => {
  const secToHms = (d) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);

    const hDisplay = h > 0 ? h + (h == 1 ? "h " : "h, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? "m " : "m") : "";
    return hDisplay + mDisplay;
  };

  return (
    <div className="flex flex-row items-center justify-between bg-white py-12">
      <div className="flex-col items-center justify-start min-w-xl">
        <h3 className="text-md font-medium text-gray-700 w-[700px] truncate">
          {title}
        </h3>
        <p className="prose prose-sm line-clamp-3">{striptags(description)}</p>
      </div>
      <p className="font-medium text-sm">
        {moment(new Date(datePublished * 1000)).format("MMMM Do YYYY")}
      </p>
      <p className="font-medium text-sm">{secToHms(duration)}</p>
      <button
        onClick={() => router.push(`/episode/${id}`)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-700"
      >
        <FaPlay className="text-white w-3 text-center ml-0.5" />
      </button>
    </div>
  );
};

export default EpisodeItem;
