import React, { useEffect, useState } from "react";
import Video from "../video/Video";
import { useQuery } from "react-query";
import Loading from "../../commons/loading/Loading";

export default function Home() {
  const [videos, setVideos] = useState();

  const [filter, setFilter] = useState("popular");
  const [keyword, setKeyword] = useState("");

  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const {
    isLoading,
    error,
    data: popularVideos,
  } = useQuery(
    ["videos", "popular"],
    async () => {
      return fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=25&key=${apiKey}`
      ).then((res) => {
        setFilter("popular");
        return res.json();
      });
    },
    {
      staleTime: 1000 * 60 * 3,
    }
  );

  // console.log("popular::::", popularVideos);
  return (
    <div className="w-full bg-gray-800 text-white">
      {isLoading && <Loading />}
      <div className="grid grid-cols-5 gap-2">
        <Video category={popularVideos} />
      </div>
    </div>
  );
}
