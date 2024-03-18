import MemberLayout from "@/components/layout/memberlayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>({});
  const session: any = useSession();
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getProfile(session.data?.accessToken);
      setProfile(data.data);
    };
    getAllUsers();
  }, [session]);
  console.log(profile);
  return (
    <MemberLayout>
      <h1 className="text-3xl">Profile</h1>
      <div className="flex gap-5 mt-5">
        <div className="flex items-center justify-center w-[25%] h-[300px] flex-col p-10 mt-5">
          <Image
            src={profile.profile?.image}
            width={200}
            height={100}
            alt="profile"
            className="rounded-[50%]"
          />
          <label
            className="mt-5 bg-[#eee] flex flex-col items-center justify-center text-center gap-5 p-5 cursor-pointer rounded-lg"
            htmlFor="upload-image"
          >
            <p>
              Upload a new avatar. Max size: <b>1 MB</b>
            </p>
          </label>
          <input
            type="file"
            name="image"
            id="upload-image"
            className="absolute opacity-0 -z-[1]"
          />
        </div>
        <div className="w-[75%] p-3 border">
          <form action="">
            <Input
              label="Fullname"
              type="text"
              name="fullname"
              defaultValue={profile.profile?.fullname}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              defaultValue={profile.profile?.email}
            />
            {/* <Input
              label="Password"
              type="password"
              name="password"
              defaultValue={profile.profile?.password}
            /> */}
            <Input
              label="Phone"
              type="number"
              name="phone"
              defaultValue={profile.profile?.phone}
            />
            {/* <Input
            label="Password"
            type="password"
            name="password"
            defaultValue={profile.profile.password}
          /> */}
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};
export default ProfilePage;
