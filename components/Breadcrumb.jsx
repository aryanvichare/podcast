import React, { Fragment } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Breadcrumb = ({ crumbs }) => {
  return (
    <div className="flex flex-row items-center mt-1">
      {crumbs.map((c, idx) => (
        <Fragment key={idx}>
          <p className="font-sans font-medium text-gray-700 leading-snug">
            {c.clickable ? (
              <Link href={c.link}>
                <a className="underline text-primaryAccent">{c.name}</a>
              </Link>
            ) : (
              c.name
            )}
          </p>
          {idx < crumbs.length - 1 && (
            <ChevronRightIcon className="font-medium w-4 h-4 mx-2" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
