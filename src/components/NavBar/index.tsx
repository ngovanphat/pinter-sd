"use client";

import { useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const handleSearch = (value) => {
    if (!value) return;
    router.push(`search-result?prompt=${value}`);
  };

  return (
    <nav className="w-full h-[50px] flex items-center justify-center bg-white p-3">
      <TextInput
        id="prompt"
        placeholder="Input your prompt"
        required
        shadow
        style={{
          height: "40px",
          padding: "10px 20px",
          borderRadius: "20px",
        }}
        className="w-full md:w-1/2"
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(prompt);
          }
        }}
      />
      <Button size="md" className="ml-4" onClick={() => handleSearch(prompt)}>
        Search
      </Button>
    </nav>
  );
}
