import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@/context/themeContext";

export default function Home() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    router.push("/auth/login");
  
  });
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if ((isDark && theme !== "dark") || (!isDark && theme !== "light")) {
      toggleTheme();
    }
  });
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="flex lg:w-200 w-[75%] lg:h-[400px] h-50 rounded-lg items-center justify-center lg:bg-cover bg-contain bg-center bg-no-repeat"
     
      />
    </div>
  );
}
