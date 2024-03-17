import instance from "@/lib/axios/instance";
export const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUser: (id: string, data: any) =>
    instance.put("/api/user", { id, data }),
  deleteUser: (id: string, token: string) =>
    instance.delete(`/api/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
export default userServices;
