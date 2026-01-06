export interface Modifiers {
  nextAttackMultiplier?: number;
  incomingAttackMultiplier?: number;
  nextShieldMultiplier?: number;
  cooldownReduction?: number;
  halveShield?: boolean;
}

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
  modifiers?: Modifiers;
  damage?: number;
  shield_gain?: number;
  health_gain?: number;
  condition?: {
    self?: {
      hpBelow?: number;
      fatigueAbove?: number;
      fatigueBelow?: number;
      hasShield?: boolean;
    };
    target?: {
      hasShield?: boolean;
      hasFatigue?: boolean;
    };
  };
  sideEffects?: {
    self?: {
      fatigue?: number;
      poison?: number;
      hp?: number;
    };
    target?: {
      fatigue?: number;
      poison?: number;
      hp?: number;
    };
  };
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
  cooldown?: number;
  userCards: boolean;
}
