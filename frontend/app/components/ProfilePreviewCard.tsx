"use client";

import { FC, useEffect } from "react";

import Image from "next/image";
import { useAccount } from "wagmi";

import { Label } from "@/components/ui/label";
import { profileBucketName } from "@/libs/constant";
import { AppKitButton } from "@reown/appkit";
import { useQuery } from "@tanstack/react-query";
import { getFile } from "../actions/file";
import { getUser } from "../actions/user";

const ProfilePreviewCard: FC = () => {
  const { address } = useAccount();

  if (!address) return <AppKitButton />;

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
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
    },
  );

  if (isProfileLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <div className="relative flex flex-col items-center gap-6 self-stretch overflow-hidden rounded-2xl border border-slate-300 bg-gradient-to-b from-slate-100 to-slate-50 p-10 shadow-2xl shadow-slate-300 before:absolute before:inset-0 before:rounded-2xl before:shadow-inner-sm before:shadow-white">
        <h1 className="font-cursive text-3xl font-500 text-slate-900">
          Profile
        </h1>

        <div className="flex w-full flex-col items-center justify-center gap-6">
          {!profileImageLink && (
            <Image
              alt="example"
              src="/placeholder.jpg"
              fill
              width={0}
              height={0}
            />
          )}

          {profileImageLink && (
            <Image
              alt="example"
              src={profileImageLink}
              width={100}
              height={100}
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
        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4 self-stretch"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3">Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="playerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3">Player name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your player name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel className="pl-3">Profile picture</FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={(files) => {
                        onChange(files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4" disabled={isPending}>
              {isPending ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </Form> */}
      </div>
    </div>
  );
};
export { ProfilePreviewCard };
