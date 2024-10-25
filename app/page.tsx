"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Boxes } from "./components/ui/background-boxes";

export default function Home() {
  const router = useRouter();
  const [bet, setBet] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [number, setNumber] = useState<string>("");


  const handleBetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bet && amount) {
      router.push("/dice-roll");
    }
  };

  const betOptions = ["Big", "Small", "Specific Triple", "Any Triple"];

  return (
    <div>
    <div className="relative w-full overflow-hidden min-h-screen bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
 
      <Boxes />
      <div className="flex z-20 flex-col items-center justify-center z-999999 p-4 bg-gradient-to-b from-gray-900 to-black text-white">
        <h1 className="text-5xl font-bold mb-8">Sic Bo</h1>
        <p className="text-lg mb-12 text-gray-300">
          Place your bet to start the game
        </p>
        <form
          onSubmit={handleBetSubmit}
          className="flex flex-col items-center space-y-6 w-full max-w-md"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            {betOptions.map((option) => (
              <motion.button
                key={option}
                type="button"
                onClick={() => setBet(option)}
                className={`p-4 text-lg rounded-lg transition-all duration-300 ${
                  bet === option
                    ? "bg-blue-600"
                    : "bg-gray-800 hover:bg-blue-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Bet Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white w-half text-center outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Bet Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white w-full text-center outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <motion.button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-blue-700 focus:outline-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Place Bet
          </motion.button>
        </form>
      </div>
    </div>
    </div>
  );
}
