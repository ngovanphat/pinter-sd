"use client";

import searchService from "@/src/services/search.service";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import thumbnailIcon from "@/public/thumbnail-icon/thumbnail-icon@3x.webp";
import { useSearchParams } from "next/navigation";

type ItemDetail = {
  id: number;
  item: {
    payload: {
      path: string;
      prompt: string;
      negative_prompt: string;
      checkpoint: string;
      source: string;
    };
  };
};

export default function ItemDetailScreen() {
  const searchParams = useSearchParams();
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);

  useEffect(() => {
    const id = searchParams.get("id") || 0;
    searchService
      .getItemDetail(+id)
      .then((data) => {
        setItemDetail(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="flex flex-col max-lg:block w-full h-fit justify-start items-start p-5 lg:pb-20 max-lg:pb-5 lg:space-x-5 max-lg:space-y-5 bg-white">
      <section
        id="model-detail-content"
        className="w-full h-fit m-0"
        style={{ margin: 0 }}
      >
        <div className="flex lg:flex-row flex-col gap-6">
          <div className="h-full w-full md:w-1/2 flex justify-center rounded-md border-[#545454] relative 2xl:hover:scale-125 2xl:duration-200">
            <NextImage
              alt="..."
              src={itemDetail?.item.payload.path || ""}
              blurDataURL={thumbnailIcon.src}
              className="z-10"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "10px",
              }}
              priority={true}
              unoptimized={true}
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="w-full rounded-lg bg-[#545454] p-5">
              <h4 className="text-md sm:text-lg md:text-xl lg:text-2xl text-white font-medium">
                Information:
              </h4>
              <div className="mt-4 flex md:flex-row flex-col md:items-center gap-4">
                <p className="text-md md:text-xl text-[#9e9e9e] font-medium min-w-[100px]">
                  Prompt:
                </p>
                <p className="text-md text-white rounded-md bg-[#1971c2] px-4 py-2">
                  {itemDetail?.item.payload?.prompt}
                </p>
              </div>
              <div className="mt-4 flex md:flex-row flex-col md:items-center gap-4">
                <p className="text-md md:text-xl text-[#9e9e9e] font-medium min-w-[100px]">
                  Negative prompt:
                </p>
                <p className="text-md text-white rounded-md bg-[#1971c2] px-4 py-2">
                  {itemDetail?.item.payload?.negative_prompt}
                </p>
              </div>
              <div className="mt-4 flex md:flex-row flex-col md:items-center gap-4">
                <p className="text-md md:text-xl text-[#9e9e9e] font-medium min-w-[100px]">
                  Checkpoint:
                </p>
                <p className="text-md text-white rounded-md bg-[#1971c2] px-4 py-2">
                  {itemDetail?.item.payload?.checkpoint}
                </p>
              </div>
              <div className="mt-4 flex md:flex-row flex-col md:items-center gap-4">
                <p className="text-md md:text-xl text-[#9e9e9e] font-medium min-w-[100px]">
                  Source:
                </p>
                <a
                  href={itemDetail?.item.payload?.source}
                  className="text-md text-white rounded-md bg-[#1971c2] px-4 py-2"
                >
                  {itemDetail?.item.payload?.source}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {gallery.length !== 0 && (
      <section
        id="gallery"
        className="w-full h-fit"
        style={{ margin: 0, marginTop: "100px" }}
      >
        <h1 className="text-2xl text-white font-medium">Gallery</h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-col-1 gap-6 mt-10">
          {gallery.map((img, index) => (
            <img
              key={index}
              className="aspect-[2/3] rounded-lg"
              src={img}
              alt={`Image no.${index}`}
            />
          ))}
        </div>
      </section>
    )} */}
    </section>
  );
}
