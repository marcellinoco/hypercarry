"use client";

import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { uploadImage } from "../actions/file-upload";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleInputFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      await uploadImage(formData);
    }
  };
  return (
    <div className="flex w-full flex-grow items-center justify-center">
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
    </div>
  );
}
