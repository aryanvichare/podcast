import React, { useState, useEffect } from "react";
import Heading from "@/components/dashboard/Heading";
import Layout from "@/components/dashboard/Layout";
import { useAuth } from "@/lib/auth";
import { fetchBookmarks } from "@/lib/firestore";
import striptags from "striptags";
import Link from "next/link";

const BookmarkedItem = ({
  episode: { id, title, image, description },
  formattedText,
}) => {
  return (
    <Link href={`/episode/${id}`}>
      <a>
        <div className="flex flex-row items-center p-4 rounded-md border border-gray-300">
          <img className="w-48 h-48 rounded" src={image} alt={title} />
          <div className="ml-4">
            <h3 className="text-blue-600 text-2xl font-bold">{title}</h3>
            <p className="text-gray-500 leading-relaxed line-clamp-2 mb-2">
              {striptags(description)}
            </p>
            <p className="text-black">
              <span className="bg-yellow-400 bg-opacity-40 mr-2">
                Highlighted Text:
              </span>
              {formattedText}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Bookmark = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetchBookmarks({ uid: user.uid }).then((data) => setBookmarks(data));
  }, [user]);

  return (
    <Layout>
      <div className="w-full min-h-screen">
        <Heading
          crumbs={[
            { name: "Home", link: "/", clickable: true },
            { name: "Dashboard", link: "/", clickable: false },
            { name: "Bookmark", link: "/", clickable: false },
          ]}
        />
        <div className="container max-w-screen-lg mx-auto px-4 py-12">
          <h1 className="text-blue-600 text-xl font-bold">
            Bookmarked Episodes
          </h1>
          <div className="mt-4 flex flex-col space-y-2">
            {bookmarks &&
              bookmarks.map((item) => (
                <BookmarkedItem key={item.id} {...item} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookmark;
