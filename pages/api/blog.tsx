import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const interBlack = fetch(
  new URL(`../../assets/Inter-Black.ttf`, import.meta.url)
).then((f) => f.arrayBuffer());

const interSemibold = fetch(
  new URL(`../../assets/Inter-Semibold.ttf`, import.meta.url)
).then((f) => f.arrayBuffer());

export default async function handler(req: NextRequest) {
  const interBlackData = await interBlack;
  const interSemiboldData = await interSemibold;

  const { searchParams } = new URL(req.url);

  const date = searchParams.get("date");
  const readTime = searchParams.get("readTime");
  const title = searchParams.get("title");

  return new ImageResponse(
    (
      <div tw="w-full h-full pl-24 pt-20 pr-20 pb-20 flex flex-col items-start justify-between bg-neutral-900 text-white">
        <div tw="flex-1 text-3xl flex flex-row w-full">
          <div tw="w-full flex flex-row items-center">
            <span>{date}</span>
            <span tw="ml-16">{readTime}</span>
            <div tw="flex-1" />
            <img
              alt="avatar"
              width={8 * 12}
              src={`https://github.com/brendonovich.png`}
              tw="rounded-full"
            />
          </div>
        </div>
        <div tw="flex-1 text-7xl text-left">{title}</div>
        <div tw="flex-1 w-full flex items-end justify-between flex-row">
          <span tw="text-yellow-400 text-5xl">Brendan</span>
          <span
            tw="mb-1 text-3xl text-neutral-300"
            style={{ fontFamily: "InterSemibold" }}
          >
            brendonovich.dev
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "InterBlack",
          data: interBlackData,
          style: "normal",
        },
        {
          name: "InterSemibold",
          data: interSemiboldData,
          style: "normal",
        },
      ],
    }
  );
}
