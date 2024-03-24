import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
type Proptypes = {
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
  setToaster: Dispatch<SetStateAction<{}>>;
};
const AuthLayout = (props: Proptypes) => {
  const { title, children, link, linkText } = props;
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
      <h1 className="text-3xl mb-2.5">{title}</h1>
      <div className="w-[30%] p-5 border mb-5 rounded-lg">{children}</div>
      <p>
        {linkText}
        <Link className="text-[#23bebe]" href={link}>
          here
        </Link>
      </p>
    </div>
  );
};
export default AuthLayout;
