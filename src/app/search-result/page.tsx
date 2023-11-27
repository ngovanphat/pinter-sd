"use client";

import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NextImage from "next/image";
import thumbnailIcon from "@/public/thumbnail-icon/thumbnail-icon@3x.webp";

import "./Mansory.css";

const data: ResultResponse = {
  search_prompt: "house",
  result_count: 3,
  request_time: 0.0115,
  result: [
    {
      id: 1,
      path: "/media/generated/87376acc-7dc0-4e51-b53a-2aad7f6bfaa8.png",
    },
    {
      id: 2,
      path: "/media/generated/4262c979-c341-40e6-90f2-113192941f1a.png",
    },
    {
      id: 3,
      path: "/media/generated/06613fd9-ebb4-4127-8ad3-5c1d2240a08c.png",
    },
    {
      id: 4,
      path: "/media/generated/3a878b24-3e15-4cdd-80bf-9a36b1084382.png",
    },
    {
      id: 5,
      path: "/media/generated/744c5aee-b89b-49db-84df-850b680db913.png",
    },
    {
      id: 6,
      path: "/media/generated/c0f409e2-f851-44b2-837f-e722f326ec40.png",
    },
    {
      id: 7,
      path: "/media/generated/dc7e8b9e-bf1d-4e3c-95e4-4a295f3b2ee5.png",
    },
    {
      id: 8,
      path: "/media/generated/865a4766-359a-46ab-9999-5cc4f0c37b8c.png",
    },
    {
      id: 9,
      path: "/media/generated/245ac9d3-6a9b-43cc-b46d-90d1d28f5bd5.png",
    },
    {
      id: 10,
      path: "/media/generated/94109891-b8aa-4fde-abb1-e15614df33dd.png",
    },
    {
      id: 11,
      path: "/media/generated/c25b56f9-db79-4435-82a4-d3e9632e4d51.png",
    },
    {
      id: 12,
      path: "/media/generated/f3a816be-0412-492c-930b-fd3a14f27631.png",
    },
    {
      id: 13,
      path: "/media/generated/c8ef55f1-b9f0-458f-ad47-99eb8fbef387.png",
    },
    {
      id: 14,
      path: "/media/generated/b1a7db63-f07f-4700-b9ec-a183f56ce05d.png",
    },
    {
      id: 15,
      path: "/media/generated/addd0720-811c-4599-935e-f5a33b490a54.png",
    },
    {
      id: 16,
      path: "/media/generated/fe381d50-ba82-48da-88df-da9ab0672040.png",
    },
    {
      id: 17,
      path: "/media/generated/04797ed5-9ec1-4ecb-94f8-829d4e353936.png",
    },
    {
      id: 18,
      path: "/media/generated/ee425d01-16d5-48c7-9d49-d684c89ac625.png",
    },
    {
      id: 19,
      path: "/media/generated/9787862d-f506-4d99-a7bf-9cfd83fa6bce.png",
    },
    {
      id: 20,
      path: "/media/generated/76999613-82c2-4c4b-9e8e-ea26804e4002.png",
    },
    {
      id: 21,
      path: "/media/generated/90465e3e-a620-4562-8816-b4b4346f0a45.png",
    },
    {
      id: 22,
      path: "/media/generated/556e7276-67fb-4b6c-9690-2738067a1273.png",
    },
    {
      id: 23,
      path: "/media/generated/68620eb0-f0e4-4b00-9101-3c3ec348f06f.png",
    },
    {
      id: 24,
      path: "/media/generated/b3369257-a380-445c-9817-e7898c9e06e7.png",
    },
    {
      id: 25,
      path: "/media/generated/9567117b-7b06-42fe-8c61-515aecb54a5e.png",
    },
    {
      id: 26,
      path: "/media/generated/98276484-bd7a-421b-a6f3-82fc78306506.png",
    },
  ],
};

const getData: () => Promise<ResultResponse> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

type ResultResponse = {
  search_prompt: string;
  result_count: number;
  request_time: number;
  result: ImageResult[];
};

type ImageResult = {
  id: number;
  path: string;
};

const baseUrl = process.env.IMAGE_BASE_URL || "https://nqrt.ai";
export default function ResultPage() {
  const [result, setResult] = useState<ResultResponse | null>(null);

  useEffect(() => {
    getData().then((data) => {
      setResult(data);
    });
  }, []);

  const renderImage = () => {
    if (!result || result?.result_count === 0) return <></>;

    return result.result.map((item, index) => (
      <div className="flex flex-col items-center rounded-lg relative h-fit w-full scale-100 2xl:hover:scale-90 2xl:hover:z-10 duration-200 mb-3 2xl:hover:cursor-pointer">
        <NextImage
          src={`${baseUrl}${item.path}`}
          alt={`image No.${index}`}
          placeholder="blur"
          blurDataURL={thumbnailIcon.src}
          className="object-cover h-full w-full rounded-lg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority={true}
          unoptimized={true}
        />
      </div>
    ));
  };

  return (
    <main className="flex min-h-screen flex-col items-center min-h-[100vh] p-24 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-[50px] font-bold">AI Generator Tool</h1>
      <div className="flex w-full flex-col gap-4">
        <Masonry
          breakpointCols={{
            default: 5,
            1100: 4,
            700: 3,
            500: 2,
            300: 1,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {renderImage()}
        </Masonry>
      </div>
    </main>
  );
}
