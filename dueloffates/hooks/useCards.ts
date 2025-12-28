import {
  OpponentCards as Player2,
  userCards as Player1,
} from "@/mock/mockHand";
import { useState } from "react";

interface CardProps {
  header: string;
  icon: string;
  effect: string;
  type: "attack" | "defense" | "buff" | "neutral" | "poison";
  onCooldown: boolean;
  userCards: boolean;
}

const useCards = () => {
  const [userCards, setUserCards] = useState<CardProps[]>(Player1);
  const [opponentCards, setOpponentCards] = useState<CardProps[]>(Player2);

  // functions
  const selectCard = () => {};

  return {
    //state
    userCards,
    opponentCards,

    //setters
    setOpponentCards,
    setUserCards,
  };
};

export default useCards;
