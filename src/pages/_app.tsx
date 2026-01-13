import { ThemeProvider } from "@/context/themeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {


  return (
    <ThemeProvider>
      <div className={poppins.variable}>
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          <ToastContainer />
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
}
