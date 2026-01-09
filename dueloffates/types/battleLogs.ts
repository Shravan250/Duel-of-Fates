// types/battleLog.ts

export type Side = "player" | "opponent";

// ============================================================
// RAW LOG EVENTS
// ============================================================

interface BaseLogEvent {
  type: string;
  timestamp: number;
  side: Side;
}

// Card usage
export interface CardPlayedEvent extends BaseLogEvent {
  type: "card_played";
  cardName: string;
}

// Damage events
export interface DamageEvent extends BaseLogEvent {
  type: "damage";
  amount: number;
  source?: "card" | "poison" | "fatigue";
  modifier?: {
    type: string;
    multiplier: number;
    stacks?: number;
  };
}

// Shield events
export interface ShieldAbsorbedEvent extends BaseLogEvent {
  type: "shield_absorbed";
  amount: number;
}

export interface ShieldGainedEvent extends BaseLogEvent {
  type: "shield_gained";
  amount: number;
}

export interface ShieldBrokenEvent extends BaseLogEvent {
  type: "shield_broken";
}

export interface ShieldHalvedEvent extends BaseLogEvent {
  type: "shield_halved";
  amount: number;
}

// Healing
export interface HealEvent extends BaseLogEvent {
  type: "heal";
  amount: number;
}

// Status effects
export interface StatusAppliedEvent extends BaseLogEvent {
  type: "status_applied";
  status: "poison" | "fatigue";
  stacks: number;
}

export interface StatusTriggeredEvent extends BaseLogEvent {
  type: "status_triggered";
  status: "poison" | "fatigue";
  damage: number;
}

export interface StatusTransferredEvent extends BaseLogEvent {
  type: "status_transferred";
  targetSide: Side;
  poison: number;
  fatigue: number;
}

// Modifiers/Buffs
export interface ModifierAppliedEvent extends BaseLogEvent {
  type: "modifier_applied";
  modifierType: "buff" | "debuff";
  description: string;
}

// Utility
export interface UtilityEvent extends BaseLogEvent {
  type: "utility";
  utilityType: "swap" | "reversal";
  description: string;
}

export type RawLogEvent =
  | CardPlayedEvent
  | DamageEvent
  | ShieldAbsorbedEvent
  | ShieldGainedEvent
  | ShieldBrokenEvent
  | ShieldHalvedEvent
  | HealEvent
  | StatusAppliedEvent
  | StatusTriggeredEvent
  | StatusTransferredEvent
  | ModifierAppliedEvent
  | UtilityEvent;

// ============================================================
// TURN LOG
// ============================================================

export interface TurnLog {
  turnNumber: number;
  rawEvents: RawLogEvent[];
  formattedMessages: string[];
}

// ============================================================
// EVENT PRIORITY FOR ORDERING
// ============================================================

export const EVENT_PRIORITY: Record<RawLogEvent["type"], number> = {
  card_played: 1,
  modifier_applied: 2,
  shield_gained: 3,
  shield_absorbed: 4,
  damage: 5,
  heal: 6,
  shield_broken: 7,
  shield_halved: 8,
  status_applied: 9,
  utility: 10,
  status_triggered: 11,
  status_transferred: 12,
};
