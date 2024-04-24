import AuthLayout from "@/components/layout/authlayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { ToasterContext } from "@/contexts/ToasterContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";

const LoginPage = () => {
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
        setToaster({
          className: "success",
          message: "Login success",
        });
      } else {
        setIsLoading(false);
        setToaster({
          className: "error",
          message: "Email atau password salah",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        className: "error",
        message: "Login gagal, hubungi developer",
      });
    }
  };
  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? sign up "
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input className="my-2" label="Email" name="email" type="email" />
        <Input
          className="my-2"
          label="Password"
          name="password"
          type="password"
        />
        <Button type="submit" className="w-full my-2">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className="my-5" />
      <Button
        type="submit"
        className="w-full gap-1"
        onClick={() => signIn("google", { callbackUrl, redirect: false })}
      >
        <i className="bx bxl-google text-2xl" />
        Login with Google
      </Button>
    </AuthLayout>
  );
};
export default LoginPage;
