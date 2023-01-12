import React from "react";
import { useParams } from "react-router-dom";

export default function VideoDetail() {
  const { id } = useParams();
  console.log(useParams());
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //   const onYouTubeIframeAPIRedy = () => {
  //     let player = new YT.Player("player", {
  //       height: "360",
  //       width: "640",
  //       videoId: "M7lc1UVf-VE",
  //       events: {
  //         onReady: onPlayerReady,
  //         onStateChange: onPlayerStateChange,
  //       },
  //     });
  //   };

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
    </div>
  );
}
