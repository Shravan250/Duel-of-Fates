import { Icon } from "@iconify/react";
import clsx from "clsx";

interface CardProps {
  header: string;
  icon: string;
  effect: string;
  type: "attack" | "defense" | "buff" | "neutral" | "poison";
  onCooldown: boolean;
}

const styles = {
  attack: "card-attack",
  defense: "card-defense",
  buff: "card-buff",
  neutral: "card-neutral",
  poison: "card-poison",
};

const Cards = ({ header, icon, effect, type, onCooldown }: CardProps) => {
  return (
    <div
      className={clsx(
        "card flex flex-col justify-around items-center",
        styles[type],
        {
          "on-cooldown": onCooldown,
        }
      )}
    >
      <h2>{header}</h2>
      <Icon icon={icon} width={100} height={100} />
      <h3>{effect}</h3>
    </div>
  );
};

export default Cards;
