import React, { useState } from "react";

export const TextField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  multiline = false,
  rows = 4,
  className = "",
  required = false,
  error,
  ...props
}) => {
  // Track value if uncontrolled to ensure shadow stays when text is entered
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const currentValue = value !== undefined ? value : internalValue;
  const hasContent = Boolean(currentValue && String(currentValue).length > 0);

  // Common styles for both input and textarea
  const baseInputStyles = [
    "w-full px-4 py-3",
    "font-inter text-base text-black placeholder:text-gray-400 font-medium",
    "border-2 border-black outline-none",
    "transition-all duration-150 ease-in-out",
    
    // Default state: white bg, no shadow
    "bg-white shadow-none",

    // Active state (Focused OR has content entered): Light cyan background + 4px solid black shadow
    hasContent ? "bg-[#dcf8ff] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "",
    "focus:bg-[#dcf8ff] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
  ].join(" ");

  const Component = multiline ? "textarea" : "input";

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="font-inter font-bold text-xs uppercase tracking-wider text-black mb-1.5 block select-none"
        >
          {label} {required && <span className="text-cyan-600">*</span>}
        </label>
      )}

      <Component
        id={id}
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        required={required}
        className={baseInputStyles}
        {...props}
      />

      {error && (
        <span className="font-inter text-xs text-red-600 font-bold mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextField;
