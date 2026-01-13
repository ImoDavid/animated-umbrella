import Box from "@/components/ui/box";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useRef } from "react";
import { useClickAway } from "react-use";

const Item = ({
  icon: Icon,
  icon2: Icon2 = IoIosArrowForward,
  title,
  subtitle,
  url,
  children,
  noShow,
  onClick,
  altText,
  iconStyle,
  icon2Menu, // new
}: {
  icon?: React.ElementType;
  icon2?: React.ElementType;
  title?: string;
  subtitle?: string;
  url?: string;
  children?: React.ReactNode;
  noShow?: boolean;
  onClick?: () => void;
  altText?: string;
  iconStyle?: string;
  icon2Menu?: React.ReactNode; // dynamic menu content
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const isCustomIcon2 = Icon2 !== IoIosArrowForward;

  useClickAway(menuRef, () => setShowMenu(false));

  const handleIcon2Click = (e: React.MouseEvent) => {
    if (!isCustomIcon2 || !icon2Menu) return;
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  return (
    <Box pushUrl={url} className="cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-center p-3 lg:p-5 relative">
        <div className="flex gap-5 items-center justify-center">
          {Icon && (
            <span
              className={`${
                iconStyle ? iconStyle : "text-black dark:text-white"
              }`}
            >
              <Icon size={24} />
            </span>
          )}
          <div className="flex flex-col">
            <span className="lg:text-lg font-medium text-[#040404] dark:text-[#F6F6F6]">
              {title}
            </span>
            <span className="text-[12px] lg:text-sm text-[#6C737F] dark:text-[#6B6B6B]">
              {subtitle}
            </span>
            {children}
          </div>
        </div>

        {!noShow && (
          <span
            onClick={handleIcon2Click}
            className={`text-black dark:text-white ${
              isCustomIcon2 && icon2Menu ? "cursor-pointer" : ""
            }`}
          >
            <Icon2 size={24} />
          </span>
        )}

        {altText && (
          <span className="text-black dark:text-white">{altText}</span>
        )}

        {showMenu && icon2Menu && (
          <div
            ref={menuRef}
            className="absolute right-5 top-14 z-10 bg-white dark:bg-[#2A2A2A] shadow-lg rounded-md py-2 w-fit"
          >
            {icon2Menu}
          </div>
        )}
      </div>
    </Box>
  );
};

export default Item;
