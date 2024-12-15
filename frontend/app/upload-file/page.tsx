"use client";

import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { getFile, uploadFile } from "../actions/file";
import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileLink, setFileLink] = useState<string>("");

  const handleInputFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      await uploadFile(formData);
    }
  };

  const handleGetFile = async () => {
    const fileLink = await getFile("profile-images-bucket", fileName);
    if (fileLink) {
      setFileLink(fileLink);
    }
  };
  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center gap-5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
          onChange={(data) => {
            setFile(data.target.files![0]);
          }}
        />
        <Button disabled={file === null} onClick={handleInputFile}>
          Submit
        </Button>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Retieving Image</Label>
        <Input
          onChange={(event) => {
            setFileName(event.target.value);
          }}
        />
        <Button onClick={handleGetFile}>Submit</Button>
      </div>
      {fileLink.length > 0 && (
        <Image alt="example" src={fileLink} width={100} height={100} />
      )}
    </div>
  );
}
