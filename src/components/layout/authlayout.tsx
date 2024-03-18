import Link from "next/link";
type Proptypes = {
  error?: string;
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
};
const AuthLayout = (props: Proptypes) => {
  const { error, title, children, link, linkText } = props;
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
      <h1 className="text-3xl mb-2.5">{title}</h1>
      {error && <p className="text-[#fd4141] mb-2.5">{error}</p>}
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
