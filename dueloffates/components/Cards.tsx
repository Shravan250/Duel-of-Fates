import { Icon } from "@iconify/react";

interface CardProps {
  header: string;
  icon: string;
  effect: string;
  type:string;
  onCooldown:boolean;
}

const styles = {
  attack: "card-attack",
  defense: "card-defense",
  buff: "card-buff",
  neutral: "card-neutral",
  poison: "card-poison",
};

const Cards = ({ header, icon, effect,type,onCooldown }: CardProps) => {
  return (
    <div className="ml-20 mt-30 card card-debuff  w-60 flex flex-col justify-around items-center ">
      <h2>{header}</h2>
      <Icon icon={icon} width={100} height={100} />
      <h3>{effect}</h3>
    </div>
  );
};

export default Cards;
