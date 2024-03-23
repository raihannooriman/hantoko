import Navbar from "@/components/fragments/navbar";
import Toaster from "@/components/ui/toaster";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const disableNavbar = ["auth", "admin", "member"];
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  const [toaster, setToaster] = useState<any>({});
  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 2000);
    }
  }, [toaster]);
  return (
    <SessionProvider session={session}>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        <Component {...pageProps} setToaster={setToaster} />
        {Object.keys(toaster).length > 0 && (
          <Toaster
            className={toaster.className}
            message={toaster.message}
            setToaster={setToaster}
          />
        )}
      </div>
    </SessionProvider>
  );
}
