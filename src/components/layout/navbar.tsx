import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-end w-full h-20 bg-black text-white fixed p-4">
      <button
        className="bg-white py-3 px-2 text-black cursor-pointer"
        onClick={() => (data ? signOut() : signIn())}
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};
export default Navbar;
