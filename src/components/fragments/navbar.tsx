import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const NavItems = [
  { title: "Home", url: "/" },
  { title: "Products", url: "/products" },
];
const Navbar = () => {
  const { data }: any = useSession();
  const { pathname, push } = useRouter();
  return (
    <nav className="flex items-center justify-between w-full h-14 bg-white text-black fixed py-4 px-[2vw]">
      <h1>Hantoko</h1>
      <div className="flex gap-5">
        {NavItems.map((item) => (
          <Link
            key={`nav-${item.title}`}
            href={item.url}
            className={`${"text-lg flex items-center"} ${
              pathname === item.url
                ? "font-bold border-b border-solid border-black"
                : ""
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="">
        <div className="relative">
          <Image
            width={40}
            height={40}
            src={data?.user.image}
            alt={data?.user.name}
            className="rounded-full"
          />
          <div className="absolute border shadow-none bg-opacity-50 right-0 rounded-lg flex flex-col">
            <button
              className="w-28 text-left py-1 px-4 bg-transparent hover:bg-[#eee]"
              onClick={() => push("/member/profile")}
            >
              Profile
            </button>
            <button
              className="w-28 text-left py-1 px-4 bg-transparent hover:bg-[#eee]"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
