"use client";
import { socket } from "@/network/socket";
import { initializeSocketListeners } from "@/network/socketListner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();
    initializeSocketListeners();

    socket.on("matchJoined", () => {
      setIsSearching(false);
      router.push("/game");
    });

    return () => {};
  }, []);

  const handleStartGame = () => {
    console.log("Joining matchmaking...");
    setIsSearching(true);
    socket.emit("joinQueue");
  };

  return (
    <div className="font-fell start-screen flex flex-col items-center justify-center ">
      {isSearching ? (
        <>
          <h1 className="text-4xl tracking-widest uppercase animate-pulse">
            Searching for Opponent...
          </h1>

          <div className="mt-8 w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        </>
      ) : (
        <>
          <h1 className="text-7xl tracking-[0.22em] uppercase text-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Duel of
          </h1>
          <h1 className=" text-7xl tracking-[0.22em] uppercase text-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Fates
          </h1>
          <button
            className="mt-18 font-inter uppercase tracking-[0.35em] px-14 py-4 text-amber-200 bg-black/70 border-2 border-amber-400 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:bg-black/85 hover:text-white hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] active:scale-95"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </>
      )}
    </div>
  );
}
