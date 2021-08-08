import React from "react";
import Link from "next/link";

const PodcastItem = ({ id, title, image }) => {
  return (
    <Link href={`/podcast/${id}`}>
      <a>
        <img
          src={image}
          className="cursor-pointer w-48 h-48 rounded transition-all transform duration-150 hover:scale-105"
          alt={title}
        />
      </a>
    </Link>
  );
};

export default PodcastItem;
