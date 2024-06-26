import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../ui/button";
import { signOut } from "next-auth/react";

type Proptypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};
const Sidebar = (props: Proptypes) => {
  const { lists } = props;
  const { pathname } = useRouter();
  return (
    <div className="bg-black text-white p-5 w-60 h-screen flex justify-between flex-col">
      <div>
        <h1 className="mb-10 text-center">Panel</h1>
        <div className="flex flex-col gap-2.5">
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={list.title}
              className={`text-lg flex gap-2.5 items-center hover:bg-white hover:text-black transition duration-300 py-2 px-2.5 rounded-lg ${
                pathname === list.url ? `bg-white text-black` : ""
              }`}
            >
              <i className={`bx ${list.icon} text-3xl`} />
              <h4>{list.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Button
          type="button"
          onClick={() => signOut()}
          className="bg-white !text-black w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
export default Sidebar;
