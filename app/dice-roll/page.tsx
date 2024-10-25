"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DiceRoll() {
  const [diceResult, setDiceResult] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    const rollDice = setInterval(() => {
      setDiceResult([
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(rollDice);
      setIsRolling(false);
      clearInterval(countdownInterval);
    }, 3000);

    return () => {
      clearInterval(rollDice);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <AnimatePresence>
        {isRolling ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-8">Rolling the Dice...</h1>
            <p className="text-4xl text-gray-400 mb-4">Starting in {countdown}...</p>
            <div className="flex space-x-6">
              {diceResult.map((value, index) => (
                <motion.div
                  key={index}
                  className="text-6xl"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isRolling ? 360 : 0 }}
                  transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
                >
                  🎲
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-8">Final Result</h1>
            <div className="flex space-x-6 text-6xl">
              {diceResult.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  🎲 {value}
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => router.push('/')}
              className="mt-10 py-3 px-6 bg-blue-600 rounded-lg text-lg font-semibold transition duration-300 hover:bg-blue-700"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
