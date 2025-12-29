"use client";

import {
  OpponentCards as Player2,
  userCards as Player1,
} from "@/mock/mockHand";
import { createContext, useContext, useState } from "react";

interface CardProps {
  header: string;
  icon: string;
  effect: string;
  type: "attack" | "defense" | "buff" | "neutral" | "poison";
  onCooldown: boolean;
  userCards: boolean;
}

interface UseCardsContextProps {
  userCards: CardProps[];
  opponentCards: CardProps[];
  setUserCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
  setOpponentCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
  selectCard: (card: CardProps) => void;
  userSelectCard?: CardProps;
  opponentSelectCard?: CardProps;
}

const CardsContext = createContext<UseCardsContextProps | undefined>(undefined);

export const CardsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userCards, setUserCards] = useState<CardProps[]>(Player1);
  const [opponentCards, setOpponentCards] = useState<CardProps[]>(Player2);
  const [userSelectCard, setUserSelectedCard] = useState<CardProps>();
  const [opponentSelectCard, setOpponentSelectCard] = useState<CardProps>();

  // functions
  const selectCard = (card: CardProps): void => {
    console.log(card);
  };

  return (
    <CardsContext.Provider
      value={{
        userCards,
        opponentCards,
        setUserCards,
        setOpponentCards,
        selectCard,
        userSelectCard,
        opponentSelectCard,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default function useCardsContext() {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error("useCardsContext must be used within CardsProvider");
  }

  return context;
}
