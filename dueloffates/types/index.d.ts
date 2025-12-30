interface Card{
    name: string;
    type: "attack" | "defense" | "buff" | "debuff" | "status damage" | "utility" | "heal";
    cooldown: number;
    priority: number;
    multiplier?: string;
    additional_effect?: string;
    effect?: string;
    damage?: number;
    shield_gain?: number;
}

export interface CardProps {
  header: string;
  icon: string;
  effect: string;
  type: "attack" | "defense" | "buff" | "debuff" | "status damage" | "utility" | "heal";
  onCooldown: boolean;
  userCards: boolean;
}