"use client";

import { useState } from "react";

import Link from "next/link";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import { oppCode, profileBucketName } from "@/libs/constant";
import { useQuery } from "@tanstack/react-query";
import { getFile } from "../actions/file";
import { getUser } from "../actions/user";
import { ProfileFormCard } from "../components/ProfileFormCard";
import { ProfilePreviewCard } from "../components/ProfilePreviewCard";

export default function ProfilePage() {
  const [tab, setTab] = useState<"PREVIEW" | "UPDATE">("PREVIEW");
  const handleChangeTab = (tab: "PREVIEW" | "UPDATE") => {
    setTab(tab);
  };

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

  if (isProfileLoading) return <div>Loading...</div>;

  if (!profileData || profileData?.code === oppCode.NOT_FOUND) {
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200">
      <p className="absolute left-1/2 top-8 -translate-x-1/2 font-cursive text-lg font-500 text-slate-400/70">
        OpenArena
      </p>
      {tab === "PREVIEW" && (
        <ProfilePreviewCard
          user={profileData.user!}
          profileImageLink={profileImageLink}
          isProfileImageLoading={isProfileImageLoading}
          handleChangeTab={handleChangeTab}
        />
      )}
      {tab === "UPDATE" && (
        <ProfileFormCard
          user={profileData.user!}
          profileImageLink={profileImageLink}
          isProfileImageLoading={isProfileImageLoading}
          handleChangeTab={handleChangeTab}
        />
      )}
    </main>
  );
}
