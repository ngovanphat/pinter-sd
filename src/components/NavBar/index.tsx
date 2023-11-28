"use client";

import {useState} from 'react';
import {TextInput, Button} from 'flowbite-react';
import {useRouter} from 'next/navigation';

export default function NavBar() {
    const router = useRouter()
    const [prompt, setPrompt] = useState('')
    const handleSearch = (value) => {
        router.push(`search-result?prompt=${value}`)
    }

    return <header className='w-full h-[50px] flex'>
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
        <Button
          size="md"
          gradientMonochrome="lime"
          className="ml-4"
          onClick={() => handleSearch(prompt)}
        >
          Search
        </Button>
    </header>
}