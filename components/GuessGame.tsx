"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'

type Difficulty = "easy" | "medium" | "hard" | "insane";

const DIFFICULTY_SETTINGS = {
  easy: { maxTries: 15, label: "EASY", color: "text-green-400" },
  medium: { maxTries: 10, label: "MEDIUM", color: "text-yellow-400" },
  hard: { maxTries: 7, label: "HARD", color: "text-orange-400" },
  insane: { maxTries: 5, label: "INSANE", color: "text-red-400" }
};

const GuessGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "low" | "high" | "error">("error");
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!difficulty) return;
    
    const numGuess = parseInt(guess, 10);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage("ERROR! ENTER NUMBER 1-100");
      setMessageType("error");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numGuess === target) {
      setMessage(`★ WINNER! ${newAttempts} ${newAttempts === 1 ? 'TRY' : 'TRIES'}! ★`);
      setMessageType("success");
      setGameWon(true);
    } else if (newAttempts >= DIFFICULTY_SETTINGS[difficulty].maxTries) {
      setMessage(`☠ GAME OVER! NUMBER WAS ${target} ☠`);
      setMessageType("error");
      setGameLost(true);
    } else if (numGuess < target) {
      const triesLeft = DIFFICULTY_SETTINGS[difficulty].maxTries - newAttempts;
      setMessage(`↑ TOO LOW! ${triesLeft} ${triesLeft === 1 ? 'TRY' : 'TRIES'} LEFT ↑`);
      setMessageType("low");
    } else {
      const triesLeft = DIFFICULTY_SETTINGS[difficulty].maxTries - newAttempts;
      setMessage(`↓ TOO HIGH! ${triesLeft} ${triesLeft === 1 ? 'TRY' : 'TRIES'} LEFT ↓`);
      setMessageType("high");
    }
    
    setGuess("");
  };

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
    setGameWon(false);
    setGameLost(false);
    setDifficulty(null);
  };
  
  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
    setGameWon(false);
    setGameLost(false);
  };

  const getAlertStyle = () => {
    switch (messageType) {
      case "success": return "bg-green-500 text-white border-4 border-green-700";
      case "low": return "bg-cyan-500 text-white border-4 border-cyan-700";
      case "high": return "bg-orange-500 text-white border-4 border-orange-700";
      case "error": return "bg-red-500 text-white border-4 border-red-700";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-purple-900 p-4">
      {/* Scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,black_2px,black_4px)]" />
      
      {/* CRT Glow effect */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-purple-950 opacity-60" />
      
      {!difficulty ? (
        // Difficulty Selection Screen
        <Card className="w-full max-w-md border-8 border-yellow-400 bg-black shadow-[0_0_30px_rgba(234,179,8,0.5)] relative z-10">
          <CardHeader className="text-center space-y-4 pb-6 bg-gradient-to-b from-purple-800 to-black border-b-4 border-yellow-400">
            <div className="flex justify-center">
              <div className="px-4 py-2 bg-yellow-400 transform -skew-x-12">
                <CardTitle className="text-3xl font-black text-black tracking-wider transform skew-x-12" style={{ fontFamily: 'monospace' }}>
                  GUESS MASTER
                </CardTitle>
              </div>
            </div>
            <p className="text-yellow-300 font-bold tracking-wide text-lg" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
              SELECT DIFFICULTY
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4 pt-8 pb-8 bg-gradient-to-b from-black to-purple-950">
            {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((diff) => {
              const setting = DIFFICULTY_SETTINGS[diff];
              return (
                <Button
                  key={diff}
                  onClick={() => startGame(diff)}
                  className="w-full h-16 text-xl font-black tracking-widest bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 border-4 border-pink-300 shadow-[0_6px_0_rgba(219,39,119,0.8),0_0_20px_rgba(219,39,119,0.6)] active:shadow-[0_2px_0_rgba(219,39,119,0.8)] active:translate-y-1 transition-all"
                  style={{ fontFamily: 'monospace' }}
                >
                  <span className={setting.color}>{setting.label}</span>
                  <span className="text-white ml-3">-</span>
                  <span className="text-cyan-400 ml-3">{setting.maxTries} TRIES</span>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      ) : (
        // Game Screen
        <Card className="w-full max-w-md border-8 border-yellow-400 bg-black shadow-[0_0_30px_rgba(234,179,8,0.5)] relative z-10">
          <CardHeader className="text-center space-y-4 pb-2 bg-gradient-to-b from-purple-800 to-black border-b-4 border-yellow-400">
            <div className="flex justify-center">
              <div className="px-4 py-2 bg-yellow-400 transform -skew-x-12">
                <CardTitle className="text-3xl font-black text-black tracking-wider transform skew-x-12" style={{ fontFamily: 'monospace' }}>
                  GUESS MASTER
                </CardTitle>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <p className={`font-bold tracking-wide ${DIFFICULTY_SETTINGS[difficulty].color}`} style={{ fontFamily: 'monospace', textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                {DIFFICULTY_SETTINGS[difficulty].label}
              </p>
              <span className="text-yellow-300">|</span>
              <p className="text-yellow-300 font-bold tracking-wide" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                1-100
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6 bg-gradient-to-b from-black to-purple-950">
            {/* Score Display */}
            <div className="flex justify-center gap-4">
              <div className="bg-black border-4 border-cyan-400 px-6 py-3 shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                <p className="text-cyan-400 text-xl font-black tracking-widest" style={{ fontFamily: 'monospace', textShadow: '0 0 10px rgba(34,211,238,0.8)' }}>
                  USED: {attempts.toString().padStart(2, '0')}
                </p>
              </div>
              <div className="bg-black border-4 border-orange-400 px-6 py-3 shadow-[0_0_20px_rgba(251,146,60,0.6)]">
                <p className="text-orange-400 text-xl font-black tracking-widest" style={{ fontFamily: 'monospace', textShadow: '0 0 10px rgba(251,146,60,0.8)' }}>
                  LEFT: {(DIFFICULTY_SETTINGS[difficulty].maxTries - attempts).toString().padStart(2, '0')}
                </p>
              </div>
            </div>

            <form onSubmit={handleGuess} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="text-center text-2xl h-16 bg-black text-green-400 border-4 border-green-500 font-black tracking-wider shadow-[inset_0_0_20px_rgba(34,197,94,0.3)] focus-visible:ring-0 focus-visible:border-green-300 focus-visible:shadow-[inset_0_0_30px_rgba(34,197,94,0.5),0_0_20px_rgba(34,197,94,0.8)]"
                  placeholder="???"
                  disabled={gameWon || gameLost}
                  min="1"
                  max="100"
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full h-16 text-xl font-black tracking-widest bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 border-4 border-pink-300 shadow-[0_6px_0_rgba(219,39,119,0.8),0_0_20px_rgba(219,39,119,0.6)] active:shadow-[0_2px_0_rgba(219,39,119,0.8)] active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={gameWon || gameLost}
                style={{ fontFamily: 'monospace' }}
              >
                {gameWon ? "★ YOU WIN! ★" : gameLost ? "☠ GAME OVER ☠" : "► GUESS ◄"}
              </Button>
            </form>

            {message && (
              <Alert className={`${getAlertStyle()} animate-pulse`}>
                <AlertDescription className="text-center font-black text-xl tracking-wide" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                  {message}
                </AlertDescription>
              </Alert>
            )}

            <div className="pt-4">
              <Button
                onClick={resetGame}
                variant="outline"
                className="w-full h-12 font-black tracking-wider bg-black text-yellow-400 border-4 border-yellow-400 hover:bg-yellow-400 hover:text-black shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all"
                style={{ fontFamily: 'monospace' }}
              >
                ⟲ NEW GAME ⟲
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Retro footer */}
      <div className="mt-8 flex gap-8 text-yellow-300 font-bold" style={{ fontFamily: 'monospace' }}>
        <span className="animate-pulse">● INSERT COIN ●</span>
        <span>|</span>
        <span className="animate-pulse">● PRESS START ●</span>
      </div>
    </div>
  )
}

export default GuessGame