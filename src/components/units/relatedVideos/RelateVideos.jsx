import React from "react";
import { useQuery } from "react-query";
import { useYoutubeApi } from "../../../context/YoutubeApiContext";
import Loading from "../../commons/loading/Loading";
import Video from "../video/Video";

export default function RelateVideos({ id }) {
  const { youtube } = useYoutubeApi();
  const { isLoading, data: videos } = useQuery(
    ["related", id],
    () => youtube.relatedVideos(id),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  return (
    <div>
      {isLoading && <Loading />}
      {videos && (
        <ul>
          {videos?.map((video) => (
            <Video key={video.id} video={video} type="list" />
          ))}
          {/* <Video videos={videos} /> */}
        </ul>
      )}
    </div>
  );
}
