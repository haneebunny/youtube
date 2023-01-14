import React from "react";
import Video from "../video/Video";
import { useQuery } from "react-query";
import Loading from "../../commons/loading/Loading";
import { useParams } from "react-router-dom";
import { useYoutubeApi } from "../../../context/YoutubeApiContext";

export default function Home() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60 * 3,
  });

  // console.log("popular::::", popularVideos);
  return (
    <div className="w-full bg-neutral-900 text-white">
      {isLoading && <Loading />}
      {error && { error }}
      <div className="grid grid-cols-fill-auto gap-2">
        <Video videos={videos} />
      </div>
    </div>
  );
}
