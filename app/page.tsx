// @ts-nocheck
"use client";
import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import BiconomyTest from "./components/test";
import Link from "next/link";
import { useRouter } from "next/navigation";

const games = [
  {
    id: 1,
    title: "Game 1",
    description: "This is the description for Game 1. Who are you betting on?",
    challenger_1: "Challenger 1A",
    challenger_2: "Challenger 1B",
  },
  {
    id: 2,
    title: "Game 2",
    description: "This is the description for Game 2. Who are you betting on?",
    challenger_1: "Challenger 2A",
    // challenger_2 is missing
  },
  {
    id: 3,
    title: "Game 3",
    description: "Do you want to join this game?",
    // challengers are missing
  },
  {
    id: 4,
    title: "Game 4",
    description: "This is the description for Game 4. Who are you betting on?",
    challenger_1: "Challenger 4A",
    challenger_2: "Challenger 4B",
  },
  {
    id: 5,
    title: "Game 5",
    description: "This is the description for Game 5. Who are you betting on?",
    challenger_1: "Challenger 5A",
    // challenger_2 is missing
  },
];

const MainPage = () => {
  const [challenger_1_Address, setChallenger_1_Address] = useState("address1");
  const [challenger_2_Address, setChallenger_2_Address] = useState("address2");
  const router = useRouter();
  const handleJoinClick = (id:string) => {
    router.push(`/terms/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <DynamicWidget />
          <BiconomyTest />
          <div className="flex justify-between items-center">
            <Link
              href="/chat"
              className="mr-8 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Chat
              </span>
            </Link>
            <button
              onClick={handleJoinClick}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Create a game
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Card
              key={game.id}
              className="transform hover:scale-105 transition-all duration-300 bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              <CardHeader
                title={game.title}
                onDetailsClick={game.challenger_1 && game.challenger_2 ? () => {
                  console.log(`More details for ${game.title}`);
                  router.push(`/decide/${game.id}`);
                } : undefined}
              ></CardHeader>

              <CardContent>
                <p className="mb-4 text-gray-400">{game.description}</p>
                <div className="flex justify-between space-x-4 items-center">
                  {game.challenger_1 && game.challenger_2 ? (
                    <>
                      <div className="flex flex-col items-center">
                        <img
                          src={`https://noun-api.com/beta/pfp?name=${game.challenger_1}`}
                          alt="Avatar 1"
                          className="w-10 h-10 rounded-full mb-2"
                        />
                        <Button
                          variant="secondary"
                          className="hover:text-white border-gray-600 hover:bg-gray-700 bg-gray-200"
                        >
                          Vote
                        </Button>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          src={`https://noun-api.com/beta/pfp?name=${game.challenger_2}`}
                          alt="Avatar 2"
                          className="w-10 h-10 rounded-full mb-2"
                        />
                        <Button
                          variant="secondary"
                          className="hover:text-white border-gray-600 hover:bg-gray-700 bg-gray-200"
                        >
                          Vote
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleJoinClick(game.id)}
                      variant="secondary"
                      className="hover:text-white border-gray-600 hover:bg-gray-700 w-1/2 bg-gray-200"
                    >
                      Join game
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
