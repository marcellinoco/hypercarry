"use client";

import { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import { oppCode, profileBucketName } from "@/libs/constant";
import { AppKitButton } from "@reown/appkit";
import { useQuery } from "@tanstack/react-query";
import { getFile } from "../actions/file";
import { getUser } from "../actions/user";

const ProfilePreviewCard: FC = () => {
  const { address } = useAccount();

  if (!address) return <AppKitButton />;

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await getUser(address.toString());
    },
    refetchOnWindowFocus: false,
  });

  const { data: profileImageLink, isLoading: isProfileImageLoading } = useQuery(
    {
      queryKey: ["profile-image-link"],
      queryFn: async () => {
        return await getFile(
          profileBucketName,
          profileData?.user?.imageId ?? "",
        );
      },
      refetchOnWindowFocus: false,
      enabled: !!profileData?.user?.imageId,
    },
  );

  console.log(profileData);

  if (isProfileLoading) return <div>Loading...</div>;

  if (profileData?.code === oppCode.NOT_FOUND) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div>Please create your account first</div>
        <Link href={"/profile/create"}>
          <Button>Click Here</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <div className="relative flex flex-col items-center gap-6 self-stretch overflow-hidden rounded-2xl border border-slate-300 bg-gradient-to-b from-slate-100 to-slate-50 p-10 shadow-2xl shadow-slate-300 before:absolute before:inset-0 before:rounded-2xl before:shadow-inner-sm before:shadow-white">
        <h1 className="font-cursive text-3xl font-500 text-slate-900">
          Profile
        </h1>
        <div className="flex w-full flex-col items-center justify-center gap-6">
          {isProfileImageLoading && "Loading..."}

          {!profileImageLink && (
            <Image
              alt="placeholder"
              src="/placeholder.jpg"
              width={50}
              height={50}
            />
          )}

          {profileImageLink && (
            <Image
              alt="profileImage"
              src={profileImageLink}
              width={250}
              height={250}
            />
          )}

          <div className="flex w-full flex-col items-center justify-center gap-3 self-stretch px-3 py-1">
            <div className="grid w-full grid-cols-8">
              <h3 className="col-span-3">Name</h3>
              <h5 className="col-span-1 text-center">:</h5>
              <h5 className="col-span-4">{profileData?.user?.name}</h5>
            </div>
            <div className="grid w-full grid-cols-8">
              <h3 className="col-span-3">Player Name</h3>
              <h5 className="col-span-1 text-center">:</h5>
              <h5 className="col-span-4">{profileData?.user?.playerName}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { ProfilePreviewCard };
