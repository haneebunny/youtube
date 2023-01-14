import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword("");
    navigate(`/videos/${keyword}`);
  };
  return (
    <div className="flex w-full max-w-7xl  p-2.5">
      <div className="mr-40 flex w-48 flex-row items-center text-white">
        <Link to="/">
          <img src="/img/yt_logo.png" alt="youtube logo" />
        </Link>
      </div>
      <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="h-8 w-3/6 rounded-full border border-neutral-700 bg-transparent p-3 text-white focus:outline-none"
          value={keyword}
          onChange={(e) => handleChange(e)}
          placeholder="검색"
        />
      </form>
    </div>
  );
}
