'use client';

import React from "react";
import { useRouter } from "next/navigation";

interface BoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  pushUrl?: string;
}

const Box: React.FC<BoxProps> = ({ children, className, onClick, pushUrl, ...rest }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    if (pushUrl) router.push(pushUrl);
  };

  return (
    <div
      className={`bg-[#F8F8F8] dark:bg-[#232323] p-2 font-poppins rounded-lg ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Box;
