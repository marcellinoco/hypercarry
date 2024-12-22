"use server";

import { minioClient } from "@/libs/minio";

export async function uploadImage(formData: FormData) {
  const bucket = "profile-images-bucket";

  const file = formData.get("file") as File | null;

  if (!file) {
    throw new Error("File or path can't be empty");
  }

  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    await minioClient.makeBucket(bucket, "us-east-1");
  }

  const metadata = {
    "Content-Type": file.type,
  };

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response = await minioClient.putObject(
    bucket,
    file.name,
    buffer,
    buffer.length,
    metadata
  );

  console.log("resp: ", response);
}
