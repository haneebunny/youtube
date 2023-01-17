/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ChannelInfo from "../channelInfo/ChannelInfo";
import RelateVideos from "../relatedVideos/RelateVideos";

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;

  const { id } = useParams();
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    relatedRefetch();
  }, [window.location.pathname]);

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

  // const { data: channelData, refetch: channelRefetch } = useQuery(
  //   ["videos", id],
  //   async () => {
  //     return fetch(
  //       `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${detailData?.snippet.channelId}&key=${apiKey}`,
  //       {
  //         headers: {
  //           Accept: "application / json",
  //         },
  //       }
  //     ).then((res) => {
  //       return res.json();
  //     });
  //   },
  //   {
  //     staleTime: 1000 * 60 * 3,
  //     enabled: false,
  //   }
  // );

  return (
    <section className="flex flex-col justify-center text-white lg:flex-row">
      <article className="basis-4/6 ">
        <iframe
          className="aspect-video min-h-[360px] w-full"
          id="player"
          type="text/html"
          // width="640"
          // height="360"
          src={`http://www.youtube.com/embed/${video.id}`}
          frameborder="0"
          allowFullScreen
          title={title}
        ></iframe>
        <div className="flex w-full flex-col p-8">
          <h2 className="text-xl font-bold">{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <p className="">{channelTitle}</p>
          <pre className="whitespace-pre-wrap">{description}</pre>
        </div>
      </article>
      <section className="basis-2/6">
        <RelateVideos id={video.id} />
        <div className="w-full min-w-[300px] max-w-xs">
          {relatedVideo?.items?.map((video) => (
            <div key={video.id.videoId}>
              <Link
                to={`/video/${
                  typeof video.id === "object" ? video.id.videoId : video.id
                }`}
              >
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt="relatedVideo"
                />
                <p className="h-10 text-sm font-bold line-clamp-2">
                  {video.snippet.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
