import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = "",
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-2 border rounded-md outline-none transition-all
        ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-2 border-gray-300 focus:border-[#00A057]"
        }
        placeholder:text-[#00140B80] dark:placeholder:text-white text-black dark:text-white
        ${className}`}
        {...rest}
      />
      {typeof error === "string" && error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextArea;
