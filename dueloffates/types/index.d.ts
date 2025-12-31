export interface CardDefination {
  definitionId: string;
  name: string;
  type:
    | "attack"
    | "defense"
    | "buff"
    | "debuff"
    | "status damage"
    | "utility"
    | "heal";
  cooldown: number;
  priority: number;
  multiplier?: string;
  additional_effect?: string;
  effect?: string;
  damage?: number;
  shield_gain?: number;
}

export interface CardInstance {
  id: string;
  definitionId: string;
  cooldown: number;
  multiplier: number;
  owner: "PLAYER" | "OPPONENT";
}

export interface CardProps {
  header: string;
  icon: string;
  effect?: string;
  type:
    | "attack"
    | "defense"
    | "buff"
    | "debuff"
    | "status damage"
    | "utility"
    | "heal";
  onCooldown: boolean;
  userCards: boolean;
}
