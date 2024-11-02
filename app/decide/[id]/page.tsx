// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import BiconomyTest from "../../components/test";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const games = [
  {
    id: 1,
    title: "Game 1",
    description: "This is the description for Game 1. Who won this match?",
    videoUrl: "https://example.com/game1-video",
  },
  {
    id: 2,
    title: "Game 2",
    description: "This is the description for Game 2. Who won this match?",
    videoUrl: "https://example.com/game2-video",
  },
  {
    id: 3,
    title: "Game 3",
    description: "This is the description for Game 3. Who won this match?",
    videoUrl: "https://example.com/game3-video",
  },
  {
    id: 4,
    title: "Game 4",
    description: "This is the description for Game 4. Who won this match?",
    videoUrl: "https://example.com/game4-video",
  },
  {
    id: 5,
    title: "Game 5",
    description: "This is the description for Game 5. Who won this match?",
    videoUrl: "https://example.com/game5-video",
  },
];

const MainPage = () => {
  const [challenger_1_Address, setChallenger_1_Address] = useState("address1");
  const [challenger_2_Address, setChallenger_2_Address] = useState("address2");
  const router = useRouter();
  const handleJoinClick = () => {
    router.push("/terms");
  };
  const { id } = useParams();
  console.log("id : ", id);

  const gameToDisplay = games.find((game) => game.id.toString() === id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <DynamicWidget />
          <BiconomyTest />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gameToDisplay ? (
            <Card
              key={gameToDisplay.id}
              className="transform hover:scale-105 transition-all duration-300 bg-gray-800 shadow-xl rounded-lg overflow-hidden"
            >
              <CardHeader title={gameToDisplay.title}></CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-300">
                  {gameToDisplay.description}
                </p>
                <a
                  href={gameToDisplay.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline mb-4 block"
                >
                  Watch the video
                </a>
                <div className="flex justify-between space-x-8 items-center mt-4">
                  <div className="flex flex-col items-center">
                    <img
                      src={`https://noun-api.com/beta/pfp?name=${challenger_1_Address}`}
                      alt="Avatar 1"
                      className="w-14 h-14 rounded-full mb-2 border-2 border-blue-500"
                    />
                    <Button
                      variant="secondary"
                      className="hover:text-white border-gray-600 hover:bg-gray-700"
                    >
                      Challenger 1 Won
                    </Button>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={`https://noun-api.com/beta/pfp?name=${challenger_2_Address}`}
                      alt="Avatar 2"
                      className="w-14 h-14 rounded-full mb-2 border-2 border-purple-500"
                    />
                    <Button
                      variant="secondary"
                      className="hover:text-white border-gray-600 hover:bg-gray-700"
                    >
                      Challenger 2 Won
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-gray-400">Game not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
