"use client";

import { FC, useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/db/types";
import { oppCode } from "@/libs/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "../actions/user";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  playerName: z.string().min(2, "Player name must be at least 2 characters"),
  profilePicture: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface props {
  user: User;
  profileImageLink: string | undefined;
  isProfileImageLoading: boolean;
  handleChangeTab: (tab: "PREVIEW" | "UPDATE") => void;
}

const ProfileFormCard: FC<props> = ({
  user,
  profileImageLink,
  handleChangeTab,
  isProfileImageLoading,
}) => {
  const [isPending, startTransition] = useTransition();
  const { address } = useAccount();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      playerName: user.playerName,
    },
  });

  async function onSubmit(data: FormData) {
    if (!address) return;

    startTransition(() => {
      const createUserPromise = async () => {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("name", data.name);
        formData.append("playerName", data.playerName);
        formData.append("profilePictureId", user.imageId ?? "");

        formData.append("profilePicture", data.profilePicture[0]);

        const result = await updateUser(formData);

        if (result.code !== oppCode.SUCCESS) {
          throw new Error(result.message);
        }

        form.reset();
        return { playerName: data.playerName };
      };

      toast.promise(createUserPromise, {
        loading: "Updating your account...",
        success: (data) => {
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          queryClient.invalidateQueries({ queryKey: ["profile-image-link"] });
          return `Congrats, ${data.playerName}! Your account has been updated.`;
        },
        error: (error) => {
          return error.message || "Something went wrong. Please try again.";
        },
      });
    });

    handleChangeTab("PREVIEW");
  }

  if (!address) {
    return <appkit-button />;
  }
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <div className="relative flex flex-col items-center gap-6 self-stretch overflow-hidden rounded-2xl border border-slate-300 bg-gradient-to-b from-slate-100 to-slate-50 p-10 shadow-2xl shadow-slate-300 before:absolute before:inset-0 before:rounded-2xl before:shadow-inner-sm before:shadow-white">
        <h1 className="font-cursive text-3xl font-500 text-slate-900">
          Create New Account
        </h1>
        <Form {...form}>
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

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                className="mt-4"
                onClick={() => handleChangeTab("PREVIEW")}
              >
                Back
              </Button>
              <Button type="submit" className="mt-4" disabled={isPending}>
                {isPending ? "Updating..." : "Update Account"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export { ProfileFormCard };
