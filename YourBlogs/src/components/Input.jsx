import React, { forwardRef, useId } from "react";

function Input(
  { type = "text", label, className = "", placeholder = "", error, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && (
        <label
          htmlFor={id}
          className="font-medium text-gray-700 tracking-wide"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`glass border rounded-xl px-4 py-3 outline-none 
          focus:ring-2 focus:ring-sky-400 focus:border-sky-400 
          transition-all duration-200 ease-in-out shadow-sm 
          placeholder:text-gray-400 ${error ? "border-red-400" : "border-gray-300"} ${className}`}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
}

export default forwardRef(Input);
