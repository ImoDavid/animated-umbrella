import React, { useState } from "react";

const OTPInput = ({
  onChange,
  className,
}: {
  onChange: (otp: string) => void;
  className?: string;
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const newOtp = [...otp];

    // if (value.match(/^\d$/)) {
    if (value.match(/^[a-zA-Z0-9]$/)) {
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(""));

      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    } else if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      onChange(newOtp.join(""));
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index] === "") {
        const prevIndex = Math.max(index - 1, 0);
        newOtp[prevIndex] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));

        const prevInput = document.getElementById(`otp-input-${prevIndex}`);
        if (prevInput) (prevInput as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div className="flex space-x-2 lg:space-x-8 max:space-x-10 mt-4">
      {otp.map((value, index) => (
      <input
        key={index}
        id={`otp-input-${index}`}
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => handleChange(e, index)}
        onKeyUp={(e) => handleKeyUp(e, index)}
        className={`w-12 h-12 text-center text-xl bg-[#E5F5EE] border border-[#00A057] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A057] ${className ?? "lg:w-20 lg:h-20"}`}
        // Removed hardcoded lg:w-20 lg:h-20 so parent can override via className
      />
      ))}
    </div>
  );
};

export default OTPInput;
