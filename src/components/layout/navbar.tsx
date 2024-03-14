import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../ui/button";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-end w-full h-14 bg-black text-white fixed p-4">
      <Button
        type="button"
        className="bg-white !text-black !py-2 !px-3"
        onClick={() => (data ? signOut() : signIn())}
      >
        {data ? "Logout" : "Login"}
      </Button>
    </div>
  );
};
export default Navbar;
