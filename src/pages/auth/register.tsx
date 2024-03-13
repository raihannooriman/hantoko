import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };
    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email sudah terdaftar");
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
      <h1 className="text-3xl mb-2.5">Register</h1>
      {error && <p className="text-[#fd4141] mb-2.5">{error}</p>}
      <div className="w-[30%] p-5 border mb-2">
        <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Fullname" name="fullname" type="text" />
          <Input label="Phone" name="phone" type="number" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" className="w-full">
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
      <p>
        Have an account? sign in{" "}
        <Link className="text-[#23bebe]" href="/auth/login">
          here
        </Link>
      </p>
    </div>
  );
};
export default RegisterPage;
