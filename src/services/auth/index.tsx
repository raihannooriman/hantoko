import instance from "@/lib/axios/instance";

export const authServices = {
  registerAccount: (data: any) =>
    instance.post("/api/user/register", data, {
      headers: { "Content-Type": "application/json" },
    }),
};

export default authServices;
