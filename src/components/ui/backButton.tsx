import { FC } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface BackButtonProps {
    onClick?: () => void;
  }
  
  export const BackButton: FC<BackButtonProps> = ({ onClick }) => {
    return (
      <div
        onClick={onClick}
        className="flex items-center w-10 gap-2 p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
      >
        <FiArrowLeft className="text-gray-600" />
      </div>
    );
  };