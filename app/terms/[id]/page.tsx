//@ts-nocheck
"use client";
import { useRouter, useParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import { useState } from "react";

const Terms = () => {
  const [selectedOption, setSelectedOption] = useState("Physical Game");

  const router = useRouter();
  const { id } = useParams();
  console.log("id : ", id);

  const handleAgree = () => {
    router.push("/uploadVideo");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">Choose Game</h1>
        <div className="relative">
          <button
            type="button"
            className="w-full bg-gray-400 text-black rounded-md py-2 px-4 text-center"
            onClick={() =>
              setSelectedOption((prev:any) =>
                prev === "Physical Game" ? "Web3" : "Physical Game"
              )
            }
          >
            {selectedOption}
          </button>
          {selectedOption === "Web3" && (
            <div className="absolute bg-gray-400 text-black rounded-md shadow-lg p-2 w-full z-10">
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
      </div> */}
      <h1 className="text-2xl font-bold mt-6 ">Terms and Conditions</h1>
      <p className="mb-8 flex flex-col p-8 text-center">
        <p>Please read and agree to the terms before continuing.</p>
        <p>1. I agree to record a video for the challenge.</p>
        <p>2. I agree that others are allowed to promote the challenge.</p>
        <p>3. I agree that I am okay with all the rules of this challenge.</p>
      </p>
      <Button
        variant="default"
        className="hover:text-white border-gray-600 hover:bg-gray-700 bg-gray-800"
        onClick={handleAgree}
      >
        I Agree
      </Button>
    </div>
  );
};

export default Terms;
