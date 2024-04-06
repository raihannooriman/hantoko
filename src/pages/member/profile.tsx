import MemberLayout from "@/components/layout/memberlayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};
const ProfilePage = ({ setToaster }: PropTypes) => {
  const [profile, setProfile] = useState<User | any>({});
  const [changeImage, setChangeImage] = useState<File | any>({});
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
  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(
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
  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("picture");
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = { image: newImageURL };
            const result = await userServices.updateProfile(
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
              form.reset();
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
  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    try {
      const result = await userServices.updateProfile(
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
      }
    } catch (error) {
      setIsLoading("");
      setToaster({
        message: "Failed change password.",
        className: "error",
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
              className="my-2"
            />
            <Input
              label="Phone"
              type="number"
              name="phone"
              defaultValue={profile.phone}
              placeholder="Input your phone number"
              className="my-2"
            />
            <Input
              label="Email"
              type="email"
              name="email"
              defaultValue={profile.email}
              disabled
              className="my-2"
            />
            <Input
              label="Role"
              type="text"
              name="role"
              defaultValue={profile.role}
              disabled
              className="my-2"
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
              disabled={profile.type === "google"}
              placeholder="Enter your current password"
              className="my-2"
            ></Input>
            <Input
              name="new-password"
              label="New password"
              type="password"
              disabled={profile.type === "google"}
              placeholder="Enter your new password"
              className="my-2"
            ></Input>
            <Button
              type="submit"
              disabled={isLoading === "password" || profile.type === "google"}
            >
              {isLoading === "password" ? "loading" : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};
export default ProfilePage;
