import AuthLayout from "@/components/layout/authlayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";

const RegisterPage = () => {
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
        setToaster({
          className: "success",
          message: "Register success",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        className: "error",
        message: "Email sudah terdaftar",
      });
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Have an account? sign in "
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input className="my-2" label="Email" name="email" type="email" />
        <Input className="my-2" label="Fullname" name="fullname" type="text" />
        <Input className="my-2" label="Phone" name="phone" type="number" />
        <Input
          className="my-2"
          label="Password"
          name="password"
          type="password"
        />
        <Button type="submit" className="w-full my-2">
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
