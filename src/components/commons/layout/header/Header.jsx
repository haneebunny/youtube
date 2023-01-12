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
    navigate(`/search/${keyword}`);
  };
  return (
    <div className="flex bg-gray-800 p-2.5">
      <div className="mr-40 w-16 text-white md:w-32 lg:w-48">
        <Link to="/videos">
          <img src="/img/yt_logo.png" alt="youtube logo" />
        </Link>
      </div>
      <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="h-8 w-3/6 rounded-full border border-gray-500 bg-transparent"
          value={keyword}
          onChange={(e) => handleChange(e)}
        />
      </form>
    </div>
  );
}
