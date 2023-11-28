"use client";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { MdSearch } from "react-icons/md";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const handleSearch = () => {
    router.push(`/search-result?prompt=${prompt}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center min-h-[100vh] p-4 sm:p-6 md:p-16 lg:p-24 bg-white">
      <h1 className="text-[70px] font-bold text-black">PiSearch</h1>
      <div className="flex w-full flex-col gap-4 mt-5 items-center justify-center">
        <div className="w-full md:w-1/2 w-full">
          {/* <div className="mb-2 block">
            <Label htmlFor="username3" color="success" value="Prompt" />
          </div> */}
          <TextInput
            icon={MdSearch}
            id="prompt"
            shadow
            onChange={(e) => setPrompt(e.target.value)}
            className="rounded-lg"
            style={{
              borderRadius: "40px",
              height: "50px",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        {/* <div className="w-full">
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
        </div> */}
        <div className="w-full md:w-1/2 m-auto flex flex-col md:flex-row items-center justify-center mt-2 gap-2">
          <Button
            size="sm"
            className="w-fit bg-[#303134] hover:bg-[#303134]"
            onClick={handleSearch}
          >
            <p className="text-white text-md font-normal">Pi Search</p>
          </Button>
          <Button
            size="sm"
            className="w-fit bg-[#303134] hover:bg-[#303134]"
            onClick={handleSearch}
          >
            <p className="text-white text-md font-normal">I'm Feeling Lucky</p>
          </Button>
        </div>
      </div>
    </main>
  );
}
