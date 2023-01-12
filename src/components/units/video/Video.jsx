import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Video({ category }) {
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ["videos", "main"],
    async () => {
      return fetch(`data/keyword.json`).then((res) => res.json());
    },
    {
      staleTime: 1000 * 60 * 3,
    }
  );

  console.log(category);
  return (
    <>
      {category?.items?.map((video) => (
        <div key={typeof video.id === "object" ? video.id.videoId : video.id}>
          <Link
            to={`/video/${
              typeof video.id === "object" ? video.id.videoId : video.id
            }`}
          >
            <img src={video.snippet.thumbnails.high.url} alt="thumbnail" />
            <div className="h-10 text-sm font-bold line-clamp-2">
              {video.snippet.title}
            </div>
            <div className="pt-3 text-xs">{video.snippet.channelTitle}</div>
          </Link>
        </div>
      ))}
    </>
  );
}
