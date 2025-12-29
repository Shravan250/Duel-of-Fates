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
  selectCard: (card: CardProps, side: PlayerSide) => void;
  userSelectedCard?: CardProps;
  opponentSelectedCard?: CardProps;
  userCardSelected: boolean;
  opponentCardSelected: boolean;
}

export type PlayerSide = "PLAYER" | "OPPONENT";

const CardsContext = createContext<UseCardsContextProps | undefined>(undefined);

export const CardsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userCards, setUserCards] = useState<CardProps[]>(Player1);
  const [opponentCards, setOpponentCards] = useState<CardProps[]>(Player2);
  const [userSelectedCard, setUserSelectedCard] = useState<
    CardProps | undefined
  >(undefined);
  const [opponentSelectedCard, setOpponentSelectedCard] = useState<
    CardProps | undefined
  >(undefined);
  const [userCardSelected, setUserCardSelected] = useState<boolean>(false);
  const [opponentCardSelected, setOpponentCardSelected] =
    useState<boolean>(false);

  // functions
  const selectCard = (card: CardProps, side: PlayerSide): void => {
    console.log(card);
    if (side === "PLAYER") {
      setUserSelectedCard(card === userSelectedCard ? undefined : card);
      setUserCardSelected(!userCardSelected);
    } else {
      setOpponentSelectedCard(card === opponentSelectedCard ? undefined : card);
      setOpponentCardSelected(!opponentCardSelected);
    }
  };

  return (
    <CardsContext.Provider
      value={{
        //state
        userCards,
        opponentCards,
        userSelectedCard,
        opponentSelectedCard,
        userCardSelected,
        opponentCardSelected,

        //setters
        setOpponentCards,
        setUserCards,

        //functions
        selectCard,
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
