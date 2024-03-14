import AuthLayout from "@/components/layout/authlayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import authServices from "@/services/auth";
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
    const result = await authServices.registerAccount(data);
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
    <AuthLayout
      title="Register"
      error={error}
      link="/auth/login"
      linkText="Have an account? sign in"
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Fullname" name="fullname" type="text" />
        <Input label="Phone" name="phone" type="number" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit" className="w-full">
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};
export default RegisterPage;
