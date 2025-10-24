import React, { forwardRef, useId } from "react";

function Input(
  { type = "text", label, className = "", placeholder = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && (
        <label htmlFor={id} className="font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        {...props} // <-- includes everything from register()
      />

      {props?.error && (
        <p className="text-sm text-red-500 mt-1">
          {props.error.message}
        </p>
      )}
    </div>
  );
}

export default forwardRef(Input);
