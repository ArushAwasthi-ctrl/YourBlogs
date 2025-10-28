import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-gradient-to-tr from-indigo-600 via-fuchsia-600 to-pink-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn-primary ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
