import React from "react";
import { useQuery } from "react-query";
import { useYoutubeApi } from "../../../context/YoutubeApiContext";

export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(["channel", id], () =>
    youtube.channelImageURL(id)
  );

  return (
    <div className="my-4 mb-8 flex items-center">
      {url && <img className="h-10 w-10 rounded-full" src={url} alt={name} />}
      <p className="ml-2 text-lg font-medium">{name}</p>
    </div>
  );
}
