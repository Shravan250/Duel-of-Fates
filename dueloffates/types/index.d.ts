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
  desc?: string;
  effect?: {
    poison?: number;
    fatigue?: number;
    random?: {
      poison?: number[];
      fatigue?: number[];
    };
  };
  damage?: number;
  shield_gain?: number;
  health_gain?: number;
  sideEffects?: string;
  condition?: string;
}

export interface CardInstance {
  id: string;
  definitionId: string;
  cooldown: number;
  multiplier: number;
  owner: "PLAYER" | "OPPONENT";
}

export interface CardProps {
  instanceId: string;
  definitionId: string;
  header: string;
  icon: string;
  effect?: string;
  desc?: string;
  type:
    | "attack"
    | "defense"
    | "buff"
    | "debuff"
    | "status damage"
    | "utility"
    | "heal";
  // onCooldown: boolean;
  userCards: boolean;
}
