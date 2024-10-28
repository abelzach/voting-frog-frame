"use client";
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import BiconomyTest from "./components/test";

const games = [
  {
    id: 1,
    title: "Game 1",
    description: "This is the description for Game 1. Who are you betting on?",
  },
  {
    id: 2,
    title: "Game 2",
    description: "This is the description for Game 2. Who are you betting on?",
  },
  {
    id: 3,
    title: "Game 3",
    description: "This is the description for Game 3. Who are you betting on?",
  },
  {
    id: 4,
    title: "Game 4",
    description: "This is the description for Game 4. Who are you betting on?",
  },
  {
    id: 5,
    title: "Game 5",
    description: "This is the description for Game 5. Who are you betting on?",
  },
];

const MainPage = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Physical Game");

  const handleJoinClick = () => {
    setIsJoinModalOpen(true);
  };

  const handleJoinModalClose = () => {
    setIsJoinModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <DynamicWidget />
          <BiconomyTest />
          <button onClick={handleJoinClick} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Join a game
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Card
              key={game.id}
              className="transform hover:scale-105 transition-all duration-300 bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              <CardHeader>
                <CardTitle>{game.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-400">{game.description}</p>
                <div className="flex justify-between space-x-4">
                  <Button
                    variant="secondary"
                    className="hover:text-white border-gray-600 hover:bg-gray-700"
                  >
                    Vote
                  </Button>
                  <Button
                    variant="secondary"
                    className="hover:text-white border-gray-600 hover:bg-gray-700"
                  >
                    Bet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {isJoinModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <Alert className="w-full max-w-md">
            <AlertTitle>Join Game</AlertTitle>
            <AlertDescription>
              <div className="space-y-4">
                <div className="relative">
                  <button
                    type="button"
                    className="w-full bg-gray-200 rounded-md py-2 px-4 text-left"
                    onClick={() =>
                      setSelectedOption((prev) =>
                        prev === "Physical Game" ? "Web3" : "Physical Game"
                      )
                    }
                  >
                    {selectedOption}
                  </button>
                  {selectedOption === "Web3" && (
                    <div className="absolute bg-white rounded-md shadow-lg p-2 w-full z-10">
                      <button
                        type="button"
                        className="w-full py-2 px-4 hover:bg-gray-100"
                        onClick={() => setSelectedOption("Physical Game")}
                      >
                        Physical Game
                      </button>
                      <button
                        type="button"
                        className="w-full py-2 px-4 hover:bg-gray-100"
                        onClick={() => setSelectedOption("Quiz")}
                      >
                        Quiz
                      </button>
                    </div>
                  )}
                </div>
                <Input placeholder="Enter your name" />
              </div>
            </AlertDescription>
            <div className="flex justify-end mt-4">
              <Button variant="default" className="text-black" onClick={handleJoinModalClose}>
                Join
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default MainPage;
