import MemberLayout from "@/components/layout/memberlayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfilePage = ({ setToaster }: any) => {
  const [profile, setProfile] = useState<any>({});
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState("");
  const session: any = useSession();
  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
      };
      getProfile();
    }
  }, [profile, session]);
  const handleChangeProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      setToaster({
        message: "Success update profile.",
        className: "success",
      });
      form.reset();
    } else {
      setIsLoading("");
    }
  };
  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading("picture");
    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = { image: newImageURL };
            const result = await userServices.updateProfile(
              profile.id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading("");
              setProfile({
                ...profile,
                image: newImageURL,
              });
              setChangeImage({});
              e.target[0].value = "";
              setToaster({
                message: "Success change picture.",
                className: "success",
              });
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            setToaster({
              message: "failed change picture.",
              className: "error",
            });
          }
        }
      );
    }
  };
  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading("");
      form.reset();
      setToaster({
        message: "Success change password.",
        className: "success",
      });
    } else {
      setIsLoading("");
      setToaster({
        message: "Failed change picture.",
        className: "failed",
      });
    }
  };
  return (
    <MemberLayout>
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="flex gap-5 mt-5">
        <div className="flex items-center justify-center w-[25%] flex-col p-3">
          <p className="text-2xl mb-5">Edit Picture</p>
          {profile.image ? (
            <Image
              src={profile.image}
              width={200}
              height={100}
              alt="profile"
              className="rounded-[50%] w-48 h-48 bg-[#eee]"
            />
          ) : (
            <div className="rounded-[50%] flex items-center justify-center text-4xl font-bold aspect-square w-[80%] bg-[#eee]">
              {profile?.fullname?.charAt(0)}
            </div>
          )}
          <form onSubmit={handleChangeProfilePicture}>
            <label
              className="mt-5 bg-[#eee] flex flex-col items-center justify-center text-center gap-5 p-5 cursor-pointer rounded-lg float-left w-full mb-5"
              htmlFor="upload-image"
            >
              {changeImage.name ? (
                <p>{changeImage.name}</p>
              ) : (
                <>
                  <p>
                    Upload a new picture. Max size: <b>1 MB</b>
                  </p>
                </>
              )}
            </label>
            <input
              type="file"
              name="image"
              id="upload-image"
              onChange={(e: any) => {
                e.preventDefault();
                setChangeImage(e.currentTarget.files[0]);
              }}
              className="absolute opacity-0 -z-[1]"
            />
            <Button type="submit" className="mt-5 w-full">
              {isLoading === "picture" ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
        <div className="w-[50%] p-3">
          <p className="text-2xl">Edit Profile</p>
          <form onSubmit={handleChangeProfile}>
            <Input
              label="Fullname"
              type="text"
              name="fullname"
              defaultValue={profile.fullname}
            />
            <Input
              label="Phone"
              type="number"
              name="phone"
              defaultValue={profile.phone}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              defaultValue={profile.email}
              disabled
            />
            <Input
              label="Role"
              type="text"
              name="role"
              defaultValue={profile.role}
              disabled
            />
            <Button type="submit">
              {isLoading === "profile" ? "loading" : "Update Profile"}
            </Button>
          </form>
        </div>
        <div className="w-[25%]">
          <p className="text-2xl p-3">Change Password</p>
          <form onSubmit={handleChangePassword}>
            <Input
              name="old-password"
              label="Old password"
              type="password"
            ></Input>
            <Input
              name="new-password"
              label="New password"
              type="password"
            ></Input>
            <Button type="submit">
              {isLoading === "password" ? "loading" : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};
export default ProfilePage;
