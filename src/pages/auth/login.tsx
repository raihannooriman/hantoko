import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
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
      } else {
        setIsLoading(false);
        setError("Email atau password salah");
      }
    } catch (error) {
      setIsLoading(false);
      setError("email atau password salah");
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
      <h1 className="text-3xl mb-2.5">Login</h1>
      {error && <p className="text-[#fd4141] mb-2.5">{error}</p>}
      <div className="w-[30%] p-5 border mb-5">
        <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" className="w-full">
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
      </div>
      <p>
        Dont have an account? sign up{" "}
        <Link className="text-[#23bebe]" href="/auth/register">
          here
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
