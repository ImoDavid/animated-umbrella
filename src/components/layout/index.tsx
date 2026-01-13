import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { useTheme } from "@/context/themeContext";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/router";
import { FiUser, FiInbox } from "react-icons/fi";
import { GoDeviceDesktop } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiUser },
  { href: "/patients", label: "Patients", icon: FiInbox },
  { href: "/appointments", label: "Appointments", icon: GoDeviceDesktop },
  { href: "/profile", label: "Profile", icon: GoDeviceDesktop },
];

export default function Layout({
  children,
  Breadcrumbs,
}: {
  children: React.ReactNode;
  Breadcrumbs: { name: string; link?: string }[];
  }) {
  const { profile } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { theme, toggleTheme } = useTheme();
  const cookies = parseCookies();

  const possibleTokenKeys = ["_currentSession", "token"];
  const token =
    possibleTokenKeys.map((key) => cookies[key]).find((val) => !!val) || "";


  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
    }
  }, [token, router]);
  return (
    <div className="h-screen flex flex-col font-poppins">
      {/* Sidebar + Main layout */}
      <div className="flex flex-1 overflow-hidden bg-[#F8F8F8] dark:bg-[#232323]">
        {/* Sidebar */}
        <span className="lg:px-2 py-3">
          <aside
            className={`bg-white dark:bg-[#2A2A2A] text-gray-800 w-64 p-4 lg:p-7 space-y-4 absolute md:relative z-10 rounded-lg mt-10 lg:mt-0 lg:h-screen
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          >
            <div className="hidden md:flex items-center space-x-5">
              {/* <Image
                src="/icons/Logo.png"
                alt="Logo"
                width={40}
                height={50}
                className="block dark:hidden"
              />
              <Image
                src="/icons/White-Logo.png"
                alt="Logo"
                width={40}
                height={50}
                className="hidden dark:block"
              /> */}
              <span className="text-[#575757] dark:text-white text-sm font-bold">
                Hospyta
              </span>
              <span><Image alt="uy" width={20} height={20} src={"/nigerian_flag.png" }/></span>
            </div>
            <nav className="space-y-5 lg:mt-15">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = router.pathname.includes(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 capitalize lg:text-[14px] pc:text-[15px] ${
                      isActive
                        ? "text-[#00A057]"
                        : "text-gray-600 dark:text-white"
                    } `}
                  >
                    <span
                      className={`p-2 rounded ${
                        isActive
                          ? "bg-[#00A057] text-white"
                          : "bg-[#F5F5F5] text-gray-700 dark:bg-[#252525] dark:text-white"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    {label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </span>

        {/* Main Content */}
        <main className="flex-1 overflow-auto py-0 lg:px-1 lg:py-3 space-y-3">
          {/* Fixed Header */}
          <header className="sticky top-0 z-10 bg-white dark:bg-[#2A2A2A] px-5 lg:px-10 py-3 lg:py-5 rounded-lg text-gray-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="md:hidden flex items-center space-x-5">
                  <Image
                    src="/icons/Logo.png"
                    alt="Logo"
                    width={40}
                    height={50}
                    className="block dark:hidden"
                  />
                  <Image
                    src="/icons/White-Logo.png"
                    alt="Logo"
                    width={40}
                    height={50}
                    className="hidden dark:block mr-4"
                  />
                </div>
                <button
                  className="md:hidden dark:text-white"
                  onClick={toggleSidebar}
                  aria-label="Toggle Sidebar"
                >
                  <RxHamburgerMenu />
                </button>
                <div className="hidden md:flex items-center space-x-2 text-sm">
                  {Breadcrumbs.map((crumb, index, arr) => (
                    <span
                      key={index}
                      className={`flex items-center ${
                        index === arr.length - 1
                          ? "text-[#040404] dark:text-white"
                          : "text-gray-400 dark:text-[#666666]"
                      }`}
                    >
                      <span
                        onClick={() => crumb.link && router.push(crumb.link)}
                        className={`capitalize ${
                          index === arr.length - 1
                            ? "cursor-pointer"
                            : "hover:underline cursor-pointer "
                        }`}
                      >
                        {crumb.name}
                      </span>
                      {index < arr.length - 1 && (
                        <span
                          className={`mx-1 ${
                            index === arr.length - 1
                              ? "text-[#040404]"
                              : "text-gray-400 "
                          }`}
                        >
                          <FaChevronRight />
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Settings Icon */}
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 flex items-center justify-center rounded bg-gray-100 dark:bg-[#252525] text-black dark:text-white cursor-pointer"
                >
                  {theme === "light" ? (
                    <FaMoon className="text-lg" />
                  ) : (
                    <IoMdSunny className="text-lg" color="yellow" />
                  )}
                </button>

                {/* Notification Bell */}
                <button className="w-9 h-9 flex items-center justify-center rounded bg-gray-100 dark:bg-[#252525] text-black dark:text-white cursor-pointer">
                  <FaBell className="text-lg" />
                </button>

                {/* Profile Avatar */}
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                  <Image
                    src={profile?.profile_picture ?? "https://res.cloudinary.com/dfljnnxln/image/upload/v1674009084/Photo_13_hu5kdn.png"}
                    alt="User"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Section */}
          <div className="px-2 lg:px-0">
            <div className="bg-white dark:bg-[#2A2A2A] min-h-[calc(100vh-115px)] rounded-lg p-4">
              {children}
            </div>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              theme="colored"
              limit={1}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
