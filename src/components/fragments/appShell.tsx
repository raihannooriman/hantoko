import { Lato } from "next/font/google";
import { useRouter } from "next/router";
import Toaster from "../ui/toaster";
import Navbar from "./navbar";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const disableNavbar = ["auth", "admin", "member"];

type Proptypes = {
  children: React.ReactNode;
};
const AppShell = (props: Proptypes) => {
  const { children } = props;
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);
  return (
    <>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
      </div>
    </>
  );
};
export default AppShell;
