import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../../../util/date";

export default function Video({ video, type }) {
  const { title, thumbnails, publishedAt, channelTitle } = video.snippet;
  const navigate = useNavigate();
  const isList = type === "list";
  return (
    <>
      <li
        className={isList ? "m-2 flex list-none gap-1" : "list-none"}
        onClick={() => {
          navigate(`/videos/watch/${video.id}`, { state: { video } });
        }}
        key={typeof video.id === "object" ? video.id.videoId : video.id}
      >
        {/* <Link to={`/videos/watch/${video.id}`}> */}
        <img
          className={isList ? "mr-2 w-60" : "w-full"}
          src={thumbnails.high.url}
          alt={title}
        />
        <div>
          <p className="my-2 font-semibold line-clamp-2">{title}</p>
          <p className="opactiy-80 pt-3 text-sm">{channelTitle}</p>
          <p className="opactiy-80 pt-3 text-sm">
            {formatAgo(publishedAt, "ko")}
          </p>
        </div>
      </li>
    </>
  );
}
