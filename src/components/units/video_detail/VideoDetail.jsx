/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function VideoDetail() {
  const { id } = useParams();
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    relatedRefetch();
    detailRefetch();
  }, [window.location.pathname]);

  const { data: videoDetail, refetch: detailRefetch } = useQuery(
    ["video", "detail", id],
    async () => {
      return fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${apiKey}`
      ).then((res) => {
        console.log("패치");
        return res.json();
      });
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: false,
    }
  );
  const {
    isLoading,
    error,
    data: relatedVideo,
    refetch: relatedRefetch,
  } = useQuery(
    ["videos", id],
    async () => {
      return fetch(
        `ube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=25&key=${apiKey}`
      ).then((res) => {
        return res.json();
      });
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: false,
    }
  );

  console.log(videoDetail);

  return (
    <div>
      아이디는 : {id}입니다.
      <div id="player" />
      <iframe
        id="player"
        type="text/html"
        width="640"
        height="360"
        src={`http://www.youtube.com/embed/${id}`}
        frameborder="0"
        allowFullScreen
        title="video"
      ></iframe>
      <p className=" text-white">{videoDetail?.items[0]?.snippet.title}</p>
      <p className=" text-white">
        {videoDetail?.items[0]?.snippet.channelTitle}
      </p>
      <div>
        {relatedVideo?.items?.map((video) => (
          <div key={video.id.videoId}>
            <img src={video.snippet.thumbnails.high.url} alt="realtedVideo" />
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
