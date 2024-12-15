"use client";

import { useTransition } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import * as z from "zod";

import { createUser } from "@/actions/user";
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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  playerName: z.string().min(2, "Player name must be at least 2 characters"),
  profilePicture: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function NewUserForm() {
  const [isPending, startTransition] = useTransition();
  const { address, isConnecting } = useAccount();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      playerName: "",
    },
  });

  async function onSubmit(data: FormData) {
    if (!address) return;

    startTransition(async () => {
      try {
        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("playerName", data.playerName);
        formData.append("walletAddress", address);

        if (data.profilePicture) {
          formData.append("profilePicture", data.profilePicture[0]);
        }

        const result = await createUser(formData);

        if (result.error) {
          toast.error("Error", {
            description: result.error,
          });
          return;
        }

        toast.success("Your account has been created!");

        // Reset form
        form.reset();
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  if (!address) {
    return <appkit-button />;
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <appkit-button />
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

            <Button type="submit" className="mt-4" disabled={isPending}>
              {isPending ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </div>
      <p className="font-cursive absolute left-1/2 top-8 -translate-x-1/2 text-lg font-500 text-slate-400/70">
        OpenArena
      </p>
    </div>
  );
}
