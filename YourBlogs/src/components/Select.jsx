import React, { useId, forwardRef } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full flex flex-col gap-1 mb-4">
      {label && (
        <label
          htmlFor={id}
          className="text-sm sm:text-base font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        {...props}
        className={`glass w-full px-3 py-2.5 sm:py-3 rounded-xl bg-white text-gray-900 border border-white/60 outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 shadow-sm transition-all duration-200 ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
