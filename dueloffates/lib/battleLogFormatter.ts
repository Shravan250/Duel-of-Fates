import { RawLogEvent, EVENT_PRIORITY, Side } from "@/types/battleLogs";

// Helpers

function getSideLabel(side: Side): string {
  return side === "player" ? "Player" : "Opponent";
}

// function getTargetLabel(side: Side): string {
//   return side === "player" ? "Opponent" : "Player";
// }

// Order events by priority, then by timestamp
function orderEvents(events: RawLogEvent[]): RawLogEvent[] {
  //vopy of array
  const sortedEvents = [...events].sort((eventA, eventB) => {
    //comparing prority
    const AFirst = EVENT_PRIORITY[eventA.type] !== EVENT_PRIORITY[eventB.type];

    if (!AFirst) {
      return EVENT_PRIORITY[eventA.type] - EVENT_PRIORITY[eventB.type];
    }

    return eventA.timestamp - eventB.timestamp;
  });

  return sortedEvents;
}

// -------------------------------------
// Format Individual Events
// -------------------------------------

function formatEvent(event: RawLogEvent): string {
  // the entity this event happened to
  const subject = getSideLabel(event.side);

  switch (event.type) {
    case "card_played":
      // card_played is the only case where side = actor
      return `${subject} used ${event.cardName}`;

    case "damage":
      // status damage is rendered elsewhere
      if (event.source === "poison" || event.source === "fatigue") {
        return "";
      }

      if (event.modifier) {
        const { type, multiplier, stacks } = event.modifier;
        const stackText = stacks ? ` (${stacks} stacks)` : "";

        return `${subject} took ${
          event.amount
        } damage due to ${type}${stackText} (${multiplier.toFixed(
          1
        )}x modifier)`;
      }

      return `${subject} took ${event.amount} damage`;

    case "shield_absorbed":
      return `${subject}'s shield absorbed ${event.amount} damage`;

    case "shield_gained":
      return `${subject} gained ${event.amount} shield`;

    case "shield_broken":
      return `${subject}'s shield was broken`;

    case "shield_halved":
      return `${subject}'s shield was halved (-${event.amount} shield)`;

    case "heal":
      return `${subject} healed for ${event.amount} HP`;

    case "status_applied": {
      const statusName = event.status === "poison" ? "poisoned" : "fatigued";

      return `${subject} is ${statusName} (${event.stacks} ${
        event.stacks === 1 ? "stack" : "stacks"
      })`;
    }

    case "status_triggered":
      return `${subject} took ${event.damage} ${event.status} damage`;

    case "status_transferred": {
      const targetName = getSideLabel(event.targetSide);
      const effects: string[] = [];

      if (event.poison > 0) effects.push(`${event.poison} poison`);
      if (event.fatigue > 0) effects.push(`${event.fatigue} fatigue`);

      return `${subject} transferred ${effects.join(" and ")} to ${targetName}`;
    }

    case "modifier_applied":
      return `${subject} gained ${event.description}`;

    case "utility":
      if (event.utilityType === "swap") {
        return `Player and Opponent swapped HP and Shield`;
      }
      return event.description;

    default:
      return "Unknown event";
  }
}

// -------------------------------------
// Group event flow
// -------------------------------------

interface EventGroup {
  type: "card_action" | "status_effects" | "utility";
  messages: string[];
  header?: string;
}

function GroupEvents(events: RawLogEvent[]): EventGroup[] {
  let groupEvents: EventGroup[] = [];

  let currentCardGroup: string[] = [];
  let statusEffectGroup: string[] = [];
  let utilityGroup: string[] = [];

  for (const event of events) {
    let readableMessage = formatEvent(event);

    // no message
    if (!readableMessage) continue;

    if (event.type === "card_played") {
      //finish prev log
      if (currentCardGroup.length > 0) {
        groupEvents.push({
          type: "card_action",
          messages: currentCardGroup,
        });
      }

      // store new event
      currentCardGroup = [readableMessage];
    }
    // status event
    else if (event.type === "status_triggered") {
      statusEffectGroup.push(readableMessage);
    }
    // utility evenets
    else if (event.type === "utility" || event.type === "status_transferred") {
      utilityGroup.push(readableMessage);
    }
    //rest
    else {
      currentCardGroup.push(readableMessage);
    }
  }

  // Finish the last card Group
  if (currentCardGroup.length > 0) {
    groupEvents.push({
      type: "card_action",
      messages: currentCardGroup,
    });
  }

  //  utility effects as their own section
  if (utilityGroup.length > 0) {
    groupEvents.push({
      type: "utility",
      messages: utilityGroup,
      header: "Utility effects triggered",
    });
  }

  //  status effects as their own section
  if (statusEffectGroup.length > 0) {
    groupEvents.push({
      type: "status_effects",
      messages: statusEffectGroup,
      header: "Status effects triggered",
    });
  }

  return groupEvents;
}

// -------------------------------------
// Main Formatter
// -------------------------------------

export function formatTurnLogs(
  events: RawLogEvent[],
  turnNumber: number
): string[] {
  // Nothing happened
  if (events.length === 0) {
    return [];
  }

  // evenets in right order
  const orderedEvents = orderEvents(events);

  //groupin events
  const eventGroups = GroupEvents(orderedEvents);

  const formattedOutput: string[] = [];

  // Turn header
  formattedOutput.push(`──────── Turn ${turnNumber} ────────`);
  formattedOutput.push("");

  // Add grouped messages
  for (let i = 0; i < eventGroups.length; i++) {
    const group = eventGroups[i];

    // Adding section header if present
    if (group.header) {
      if (i > 0) {
        formattedOutput.push("");
      } //spacing before header
      formattedOutput.push(group.header);
    }

    // Adding all messages in group
    for (const message of group.messages) {
      formattedOutput.push(message);
    }

    // Adding spacing between groups (not after last group tough)
    if (i < eventGroups.length - 1 && !eventGroups[i + 1].header) {
      formattedOutput.push("");
    }
  }

  // ─── Turn footer ───
  formattedOutput.push("");
  formattedOutput.push(`──────── End of Turn ${turnNumber} ────────`);

  return formattedOutput;
}
