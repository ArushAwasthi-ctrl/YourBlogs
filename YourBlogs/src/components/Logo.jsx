import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div
      className="select-none flex items-center justify-center"
      style={{ width }}
    >
      <span className="gradient-text text-2xl md:text-3xl font-extrabold tracking-tight leading-none">
        YourBlogs
      </span>
    </div>
  );
}

export default Logo;
