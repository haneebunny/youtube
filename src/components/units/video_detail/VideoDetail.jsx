/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function VideoDetail() {
  const { id } = useParams();
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [detailData, setDetailData] = useState();

  useEffect(() => {
    relatedRefetch();

    async function fetchDetailData() {
      await detailRefetch();
      if (videoDetail) setDetailData(videoDetail.items[0]);
    }
    fetchDetailData();
    channelRefetch();
  }, [window.location.pathname]);

  const { data: videoDetail, refetch: detailRefetch } = useQuery(
    ["video", "detail", id],
    async () => {
      return fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${apiKey}`,
        {
          headers: {
            Accept: "application / json",
          },
        }
      ).then((res) => {
        return res.json();
      });
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: false,
    }
  );
  const { data: relatedVideo, refetch: relatedRefetch } = useQuery(
    ["videos", id],
    async () => {
      return fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=25&key=${apiKey}`,
        {
          headers: {
            Accept: "application / json",
          },
        }
      ).then((res) => {
        return res.json();
      });
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: false,
    }
  );

  const { data: channelData, refetch: channelRefetch } = useQuery(
    ["videos", id],
    async () => {
      return fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${detailData?.snippet.channelId}&key=${apiKey}`,
        {
          headers: {
            Accept: "application / json",
          },
        }
      ).then((res) => {
        return res.json();
      });
    },
    {
      staleTime: 1000 * 60 * 3,
      enabled: false,
    }
  );

  console.log("detailData::", detailData);
  console.log(channelData);

  return (
    <div className="flex flex-row justify-center gap-5 text-white">
      <div className="flex flex-col items-center ">
        <iframe
          className="aspect-video min-h-[360px] w-full"
          id="player"
          type="text/html"
          // width="640"
          // height="360"
          src={`http://www.youtube.com/embed/${id}`}
          frameborder="0"
          allowFullScreen
          title="video"
        ></iframe>
        <div className="flex w-full flex-col">
          <p className="text-lg font-bold">{detailData?.snippet.title}</p>
          <p className="">{detailData?.snippet.channelTitle}</p>
          <p className="text-sm">{detailData?.snippet.description}</p>
        </div>
      </div>
      <div className="w-full min-w-[300px] max-w-xs">
        {relatedVideo?.items?.map((video) => (
          <div key={video.id.videoId}>
            <Link
              to={`/video/${
                typeof video.id === "object" ? video.id.videoId : video.id
              }`}
            >
              <img src={video.snippet.thumbnails.high.url} alt="relatedVideo" />
              <p className="h-10 text-sm font-bold line-clamp-2">
                {video.snippet.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
