import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
// import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">🦋영상들 날아오는 중🦋</h1>
      </div>
      <BounceLoader
        cssOverride={override}
        color="#ffdd12"
        height={15}
        width={5}
      />
    </div>
  );
}
