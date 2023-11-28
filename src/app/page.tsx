"use client";
import { useState } from 'react'
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const handleSearch = () => {
    router.push(`/search-result?prompt=${prompt}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center min-h-[100vh] p-24 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-[50px] font-bold">AI Generator Tool</h1>
      <div className="flex w-full flex-col gap-4">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="username3" color="success" value="Prompt" />
          </div>
          <TextInput
            id="prompt"
            placeholder="Input your prompt"
            required
            color="success"
            shadow
            style={{
              height: "40px",
              padding: "10px 20px",
              borderRadius: "20px",
            }}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label
              htmlFor="negativePrompt"
              color="failure"
              value="Negative prompt"
            />
          </div>
          <TextInput
            id="negativePrompt"
            placeholder="Input negative prompt"
            color="failure"
            shadow
            style={{
              height: "40px",
              padding: "10px 20px",
              borderRadius: "20px",
            }}
          />
        </div>
        <Button
          size="lg"
          gradientMonochrome="lime"
          className="mt-4"
          onClick={handleSearch}
        >
          Generate
        </Button>
      </div>
    </main>
  );
}
