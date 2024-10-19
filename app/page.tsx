import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

import styles from "./page.module.css";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import BiconomyTest from "./components/test";

import { ThreeDCardDemo } from "./cards";

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api`
  );
  return {
    other: frameTags,
  };
}

const cardData = [
  {
    id: 1,
    title: "Election Prediction",
    description: "Vote and predict the next winner",
    imageUrl:
      "https://i.abcnewsfe.com/a/4849d1a2-c1bb-4212-ba38-0ed57a829483/donald-trump-rt-jef-241017_1729173339293_hpMain.jpg",
    link: "/api/dev?url=%2Fapi%2Ftrans",
    warpLink: "https://warpcast.com/~/developers/frames?url=https%3A%2F%2Fvoting-frog-frame.vercel.app%2Fapi%2Ftrans"
  },
  {
    id: 2,
    title: "Crypto Price",
    description: "Predict the price of Bitcoin next week",
    imageUrl:
      "https://chainfluent.io/wp-content/uploads/2022/01/ARTICLE-CRYPTO-2-1.png",
    link: "/api/dev",
    warpLink: "https://warpcast.com/~/developers/frames?url=https%3A%2F%2Fvoting-frog-frame.vercel.app%2Fapi%2Ftrans"
  },
  {
    id: 3,
    title: "Stock Market",
    description: "Will the stock market go up tomorrow?",
    imageUrl:
      "https://www.livemint.com/lm-img/img/2023/10/01/1600x900/Sectoral_Index_change_1696146869322_1696146869610.jpg",
    link: "/api/dev",
    warpLink: "https://warpcast.com/~/developers/frames?url=https%3A%2F%2Fvoting-frog-frame.vercel.app%2Fapi%2Ftrans"
  },
];

export default function Home() {
  return (
    <main className="p-2">
        <div className="flex justify-center items-center">
      <DynamicWidget />
      <BiconomyTest />
      </div>
      <div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-x-10 w-full">
            {cardData.map((card) => (
              <div key={card.id} className="w-full sm:w-auto">
                <ThreeDCardDemo
                  title={card.title}
                  description={card.description}
                  imageUrl={card.imageUrl}
                  link={card.link}
                  warpLink={card.warpLink}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
function useBiconomyAccount(): { smartAccount: any } {
  throw new Error("Function not implemented.");
}
