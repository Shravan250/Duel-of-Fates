"use client";

import { formattedDeckGenerator } from "@/lib/helper";
import {
  OpponentCards as Player2,
  userCards as Player1,
} from "@/mock/mockHand";
import { CardProps } from "@/types";
import { createContext, useContext, useState } from "react";

interface UseCardsContextProps {
  playerCards: CardProps[];
  opponentCards: CardProps[];
  setPlayerCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
  setOpponentCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
  selectCard: (card: CardProps, side: PlayerSide) => void;
  playerSelectedCard?: CardProps;
  opponentSelectedCard?: CardProps;
  playerCardSelected: boolean;
  opponentCardSelected: boolean;
}

export type PlayerSide = "PLAYER" | "OPPONENT";

const CardsContext = createContext<UseCardsContextProps | undefined>(undefined);

export const CardsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playerCards, setPlayerCards] = useState<CardProps[]>(
    formattedDeckGenerator(Player1)
  );
  const [opponentCards, setOpponentCards] = useState<CardProps[]>(
    formattedDeckGenerator(Player2)
  );
  const [playerSelectedCard, setPlayerSelectedCard] = useState<
    CardProps | undefined
  >(undefined);
  const [opponentSelectedCard, setOpponentSelectedCard] = useState<
    CardProps | undefined
  >(undefined);
  const [playerCardSelected, setPlayerCardSelected] = useState<boolean>(false);
  const [opponentCardSelected, setOpponentCardSelected] =
    useState<boolean>(false);

  // functions
  const selectCard = (card: CardProps, side: PlayerSide): void => {
    console.log(card);
    if (side === "PLAYER") {
      setPlayerSelectedCard(card === playerSelectedCard ? undefined : card);
      setPlayerCardSelected(!playerCardSelected);
    } else {
      setOpponentSelectedCard(card === opponentSelectedCard ? undefined : card);
      setOpponentCardSelected(!opponentCardSelected);
    }
  };

  return (
    <CardsContext.Provider
      value={{
        //state
        playerCards,
        opponentCards,
        playerSelectedCard,
        opponentSelectedCard,
        playerCardSelected,
        opponentCardSelected,

        //setters
        setOpponentCards,
        setPlayerCards,

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
