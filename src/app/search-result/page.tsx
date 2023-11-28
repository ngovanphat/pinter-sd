"use client";

import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NextImage from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import thumbnailIcon from "@/public/thumbnail-icon/thumbnail-icon@3x.webp";

import "./Mansory.css";
import searchService from "@/src/services/search.service";

type ResultResponse = {
  search_prompt: string;
  result_count: number;
  request_time: number;
  result: ImageResult[];
};

type ImageResult = {
  pi_id: number;
  path: string;
};

export default function ResultPage() {
  const [result, setResult] = useState<ResultResponse | null>(null);
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt") || "";
  const router = useRouter();
  useEffect(() => {
    searchService
      .searchFromPrompt(prompt)
      .then((data) => {
        setResult(data);
      })
      .catch((error) => console.log(error));
  }, [prompt]);

  const handleClick = (id: number) => {
    router.push(`/item-detail?id=${id}`);
  };

  const renderImage = () => {
    if (!result || result?.result_count === 0) return <></>;

    return result.result.map((item, index) => (
      <div
        className="flex flex-col cursor-pointer	items-center rounded-lg relative h-fit w-full scale-100 2xl:hover:scale-90 2xl:hover:z-10 duration-200 mb-3 2xl:hover:cursor-pointer"
        key={item.pi_id}
        onClick={() => handleClick(item.pi_id)}
      >
        <NextImage
          src={item.path}
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
    <main className="flex min-h-screen flex-col  sm:items-center min-h-[100vh] px-5 bg-white">
      <h1 className="text-md text-left sm:text-center sm:text-lg md:text-xl lg:text-2xl text-black">
        About {result?.result_count} results (
        {(result?.request_time || 0).toFixed(2)} seconds)
      </h1>
      <div className="flex w-full flex-col gap-4 mt-3">
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
