"use client";

import searchService from '@/src/services/search.service';
import { useState, useEffect } from 'react';
import {NextImage} from 'next/image'

type ItemDetail = {
    id: number;
    item: {
        payload: {
            path: string;
            prompt: string;
            negative_prompt: string;
            checkpoint: string;
            source: string;
        }
    }
}

export default function ItemDetailScreen({params}: {params: {id: number}}) {
    const { id } = params;
    const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);

    useEffect(() => {
        searchService.getItemDetail(id).then((data) => {setItemDetail(data)}).catch(error =>console.log(error))
    }, [])  
    

    return  <section className="flex flex-col max-lg:block w-full h-fit justify-start items-start py-12 lg:pb-20 max-lg:pb-5 lg:space-x-5 max-lg:space-y-5">

    <section
      id="model-detail-content"
      className="w-full h-fit m-0"
      style={{ margin: 0, marginTop: "24px" }}
    >
      <div className="flex lg:flex-row flex-col gap-6">
      <div
        className="h-full w-full flex justify-center rounded-md border-[#545454] relative 2xl:hover:scale-125 2xl:duration-200"
        >
        <NextImage
            alt="..."
            src={itemDetail.item.payload.path}
            className="blur-lg absolute"
            width={0}
            height={0}
            sizes="100vw"
            style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            }}
            unoptimized={true}
        />
        <NextImage
            alt="..."
            src={itemDetail.item.payload.path}
            className="z-10"
            width={0}
            height={0}
            sizes="100vw"
            style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            }}
            priority={true}
            unoptimized={true}
        />
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="w-full mt-16">
            <h4 className="text-2xl text-white font-medium">
              Thông tin
            </h4>
            <div className="mt-4 flex items-center gap-4">
              <p className="text-xl text-[#9e9e9e] font-medium min-w-[100px]">
                Prompt:
              </p>
              <p className="text-base text-white font-bold rounded-md bg-[#1971c2] px-4 py-2">
                {itemDetail.item.payload?.prompt}
              </p>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <p className="text-xl text-[#9e9e9e]  font-medium min-w-[100px]">
                Negative prompt:
              </p>
              <p className="text-base text-[#e0e0e0] font-bold">
                {itemDetail.item.payload?.prompt}
              </p>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <p className="text-xl text-[#9e9e9e]  font-medium min-w-[100px]">
                Checkpoint:
              </p>
              <p className="text-base text-[#e0e0e0] font-bold">
                {itemDetail.item.payload?.checkpoint}
              </p>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <p className="text-xl text-[#9e9e9e]  font-medium min-w-[100px]">
                Source:
              </p>
              <a href={itemDetail.item.payload?.source} className="text-base text-[#e0e0e0] font-bold">
                {itemDetail.item.payload?.source}
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
}
