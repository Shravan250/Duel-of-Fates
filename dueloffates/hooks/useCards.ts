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
  const [userSelectCard, setUserSelectedCard] = useState<CardProps>();
  const [opponentSelectCard, setOpponentSelectCard] = useState<CardProps>();

  // functions
  const selectCard = (card: CardProps): void => {
    console.log(card);
  };

  return {
    //state
    userCards,
    opponentCards,
    userSelectCard,
    opponentSelectCard,

    //setters
    setOpponentCards,
    setUserCards,

    //functions
    selectCard,
  };
};

export default useCards;
