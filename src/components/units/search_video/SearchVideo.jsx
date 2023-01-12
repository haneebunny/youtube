import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../commons/loading/Loading";
import Video from "../video/Video";

export default function SearchVideo() {
  const { keyword } = useParams();
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    searchRefetch();
  }, [window.location.pathname]);

  const {
    isLoading,
    error,
    data: searchVideos,
    refetch: searchRefetch,
  } = useQuery(
    ["videos", keyword],
    async () => {
      return fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=${apiKey}`
      ).then((res) => {
        return res.json();
      });
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: false,
    }
  );
  return (
    <div className="w-full bg-gray-800 text-white">
      {isLoading && <Loading />}

      <div className="grid grid-cols-5 gap-2">
        <Video category={searchVideos} />
      </div>
    </div>
  );
}
