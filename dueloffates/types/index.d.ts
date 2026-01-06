export interface Modifiers {
  nextAttackMultiplier?: number;
  incomingAttackMultiplier?: number;
  nextShieldMultiplier?: number;
  cooldownReduction?: number;
  halveShield?: boolean;
}

export type CardType =
  | "attack"
  | "defense"
  | "buff"
  | "debuff"
  | "status"
  | "utility"
  | "heal";

export interface CardDefination {
  definitionId: string;
  name: string;
  type: CardType;

  desc?: string; // UI only

  cost?: number;
  cooldown: number;
  priority: number;

  // Can this card be played at all?
  playCondition?: Condition;

  // What happens when it resolves
  effects: Effect[];
}

export type Effect = {
  condition?: Condition; // optional per-effect condition

  // Primary effects
  damage?: number;
  heal?: number;
  shield?: number;

  // Status changes
  status?: {
    poison?: number;
    fatigue?: number;
    random?: { poison?: number[]; fatigue?: number[] };
    shieldBreak?: boolean;
  };

  // Modifiers (buffs / debuffs)
  modifiers?: {
    nextAttackMultiplier?: number;
    nextShieldMultiplier?: number;
    incomingAttackMultiplier?: number;
    cooldownReduction?: number;
    halveShield?: boolean;
  };

  // Targeting
  target?: "self" | "opponent";

  // added utility
  utility?: {
    type: "swap" | "reversal" | "custom";
  };
};

export type Condition = {
  self?: {
    hpBelow?: number;
    hpAbove?: number;
    fatigueAbove?: number;
    fatigueBelow?: number;
    hasShield?: boolean;
  };
  opponent?: {
    hasShield?: boolean;
    hasFatigue?: boolean;
    hpBelow?: number;
  };
};

// --------------------------------
// CardInstances and Props
//--------------------------------

export interface CardInstance {
  id: string;
  definitionId: string;
  cooldown: number;
  owner: "PLAYER" | "OPPONENT";
}

export interface CardProps {
  instanceId: string;
  definitionId: string;
  header: string;
  icon: string;
  effect?: string;
  desc?: string;
  type: CardType;
  cooldown?: number;
  userCards: boolean;
}
