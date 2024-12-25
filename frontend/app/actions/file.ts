"use server";

import { oppCode, profileBucketName } from "@/libs/constant";
import { minioClient } from "@/libs/minio";

export async function uploadFileProfile(imageId: string, objectFile: File) {
  const file = objectFile;

  if (!file) {
    throw new Error("File or path can't be empty");
  }

  const exists = await minioClient.bucketExists(profileBucketName);
  if (!exists) {
    await minioClient.makeBucket(profileBucketName, "us-east-1");
  }

  const metadata = {
    "Content-Type": file.type,
  };

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response = await minioClient.putObject(
    profileBucketName,
    imageId,
    buffer,
    buffer.length,
    metadata,
  );

  console.log("resp: ", response);
}

export async function uploadFileTournament(formData: FormData) {
  const tournamentPicture = formData.get("tournamentPicture") as File;
  const imageId = formData.get("tournamentPictureId") as string;

  if (!tournamentPicture) {
    return {
      code: oppCode.INVALID_DATA,
      message: "Invalid data",
    };
  }

  const exists = await minioClient.bucketExists(profileBucketName);
  if (!exists) {
    await minioClient.makeBucket(profileBucketName, "us-east-1");
  }

  const metadata = {
    "Content-Type": tournamentPicture.type,
  };

  const arrayBuffer = await tournamentPicture.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response = await minioClient.putObject(
    profileBucketName,
    imageId,
    buffer,
    buffer.length,
    metadata,
  );

  console.log("resp: ", response);
}

export async function getFile(bucket: string, imageId: string) {
  // expires in a day, but the default will be a week
  const link = await minioClient.presignedGetObject(
    bucket,
    imageId,
    24 * 60 * 60,
  );
  console.log(link);
  return link;
}
