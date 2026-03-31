"use client";
import CardsLibrary from "@/components/CardsLibrary";
import MatchmakingScreen from "@/components/MatchmakingScreen";
import { socket } from "@/network/socket";
import { initializeSocketListeners } from "@/network/socketListner";
import { useCardLibraryStore } from "@/store/useCardsLibraryStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  useEffect(() => {
    async function getCardsLibrary() {
      const res = await fetch("http://localhost:3001/cards");
      const data = await res.json();
      console.log(data);
      useCardLibraryStore.getState().setCards(data);
    }
    getCardsLibrary();
  }, []);

  useEffect(() => {
    socket.connect();
    initializeSocketListeners();

    const handleMatch = () => {
      router.push("/game");
    };

    socket.on("matchJoined", handleMatch);

    return () => {
      socket.off("matchJoined", handleMatch);
    };
  }, [router]);

  function initializeSockets() {
    socket.connect();
    initializeSocketListeners();
  }

  const handleOpenLibrary = () => setIsLibraryOpen(true);
  const handleCloseLibrary = () => setIsLibraryOpen(false);

  const handleStartGame = () => {
    initializeSockets();
    console.log("Joining matchmaking...");
    setIsSearching(true);
    socket.emit("joinQueue");
  };

  const handleLeaveQueue = () => {
    console.log("Leaving matchmaking...");
    setIsSearching(false);
    socket.emit("leaveQueue");
    router.push("/");
  };

  return (
    <div className="font-fell start-screen flex flex-col items-center justify-center ">
      {isLibraryOpen && <CardsLibrary onClose={handleCloseLibrary} />}

      {isSearching ? (
        <>
          <MatchmakingScreen handleLeaveQueue={handleLeaveQueue} />
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
            className="mt-18 font-inter uppercase tracking-[0.35em] px-14 py-4 text-amber-200 bg-black/70 border-2 hover:cursor-pointer border-amber-400 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:bg-black/85 hover:text-white hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] active:scale-95"
            onClick={handleOpenLibrary}
          >
            Open Library
          </button>
          <button
            className="mt-18 font-inter uppercase tracking-[0.35em] px-14 py-4 text-amber-200 bg-black/70 border-2 hover:cursor-pointer border-amber-400 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:bg-black/85 hover:text-white hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] active:scale-95"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </>
      )}
    </div>
  );
}
