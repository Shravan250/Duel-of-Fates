# Complete Architecture: Everything Connected

## The Complete System

```
┌─────────────────────────────────────────────────────────────────┐
│                         UI LAYER                                 │
│  Components: BattleArea, RenderCards, HeadUpDisplay            │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ reads state from / calls actions on
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ZUSTAND STORES                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  ┌─────────┐│
│  │MatchStore    │  │ CardsStore   │  │ Health   │  │ Shield  ││
│  │              │  │              │  │ Store    │  │ Store   ││
│  │• phase       │  │• playerHand  │  │• player  │  │• player ││
│  │• turn        │  │• selectedCard│  │  Health  │  │  Shield ││
│  │• canEndTurn  │  │              │  │• opponent│  │• opponent│
│  │              │  │              │  │  Health  │  │  Shield ││
│  └──────────────┘  └──────────────┘  └──────────┘  └─────────┘│
└────────────┬────────────────────────────────────────────────────┘
             │
             │ stores controllers
             │ controllers delegate to engines
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       CONTROLLERS                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  ┌─────────┐│
│  │MatchCtrl     │  │ DeckCtrl     │  │ HealthCtrl│  │ShieldCtrl│
│  │              │  │              │  │           │  │         ││
│  │• startMatch()│  │• drawCards() │  │• damage() │  │• add()  ││
│  │• playCard()  │  │• remove()    │  │• heal()   │  │• reduce()│
│  │• endTurn()   │  │              │  │           │  │         ││
│  └──────────────┘  └──────────────┘  └──────────┘  └─────────┘│
└────────────┬────────────────────────────────────────────────────┘
             │
             │ wraps and coordinates
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      GAME ENGINES                                │
│                                                                  │
│                    ┌──────────────────┐                         │
│                    │  MatchEngine     │                         │
│                    │  (Coordinator)   │                         │
│                    │  • currentPhase  │                         │
│                    │  • activePlayer  │                         │
│                    │  • coordinates↓  │                         │
│                    └────────┬─────────┘                         │
│                             │                                    │
│           ┌─────────────────┼─────────────────┐                │
│           │                 │                 │                │
│           ▼                 ▼                 ▼                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ DeckEngine   │  │CardResolver  │  │ HealthEngine │         │
│  │              │  │              │  │              │         │
│  │• hands       │  │ resolves↓    │  │• playerHP    │         │
│  │• decks       │  │              │  │• opponentHP  │         │
│  │• draw()      │  │   calls↓     │  │• damage()    │         │
│  │• remove()    │  │              │  │• heal()      │         │
│  └──────────────┘  └──────┬───────┘  └──────────────┘         │
│                           │                                     │
│                           │ calls                               │
│                           ▼                                     │
│                  ┌──────────────┐                               │
│                  │ShieldEngine  │                               │
│                  │              │                               │
│                  │• playerShield│                               │
│                  │• oppShield   │                               │
│                  │• add()       │                               │
│                  │• reduce()    │                               │
│                  └──────────────┘                               │
│                                                                  │
│  Each engine calls notify() when state changes ───────┐        │
└───────────────────────────────────────────────────────┼─────────┘
                                                        │
                                                        │
┌───────────────────────────────────────────────────────┼─────────┐
│                       BINDERS                         │         │
│  (Listen to engine.notify() and sync to stores)     ◄──────────┘
│                                                                  │
│  bindMatchEngine() ──► syncs phase/turn to MatchStore          │
│  bindDeckEngine() ───► syncs hands to CardsStore               │
│  bindHealthEngine() ─► syncs HP to HealthStore                 │
│  bindShieldEngine() ─► syncs shields to ShieldStore            │
└──────────────────────────────────────────────────────────────────┘
```

---

## Action Flow: Playing a Card

### Step-by-Step

```
1. USER ACTION
   └─► User clicks card in UI

2. UI COMPONENT
   └─► <Card onClick={() => playCard(card)} />

3. ZUSTAND ACTION
   └─► useCardsStore().playCard(card)

4. STORE DELEGATES TO CONTROLLER
   └─► matchController.playCard(card)

5. CONTROLLER CALLS ENGINE
   └─► matchEngine.playCard(card)

6. MATCH ENGINE VALIDATES
   └─► Check phase === "PLAY"
   └─► Check activePlayer === card.owner
   └─► If valid, proceed...

7. MATCH ENGINE COORDINATES
   └─► cardResolverEngine.resolve(card)
   └─► deckEngine.removeFromHand(card)

8. CARD RESOLVER EXECUTES EFFECTS
   └─► if (card.type === "ATTACK")
       └─► healthEngine.takeDamage(damage, target)

9. HEALTH ENGINE UPDATES STATE
   └─► this.opponentHealth -= damage
   └─► this.notify() ◄─── Triggers binder!

10. BINDER SYNCS TO STORE
    └─► healthEngine.subscribe(() => {
        └─► useHealthStore.setOpponentHealth(newValue)
        })

11. ZUSTAND TRIGGERS RE-RENDER
    └─► Components using useHealthStore() re-render

12. UI UPDATES
    └─► Opponent health bar shows new value
```

---

## Data Ownership

| Data            | Owner        | Store       | Controller       |
| --------------- | ------------ | ----------- | ---------------- |
| **Game Flow**   |              |             |                  |
| Current phase   | MatchEngine  | MatchStore  | MatchController  |
| Current turn    | MatchEngine  | MatchStore  | MatchController  |
| Active player   | MatchEngine  | MatchStore  | MatchController  |
| Winner          | MatchEngine  | MatchStore  | MatchController  |
| **Cards**       |              |             |                  |
| Player hand     | DeckEngine   | CardsStore  | DeckController   |
| Opponent hand   | DeckEngine   | CardsStore  | DeckController   |
| Deck piles      | DeckEngine   | CardsStore  | DeckController   |
| Selected card   | -            | CardsStore  | - (UI only)      |
| **Combat**      |              |             |                  |
| Player health   | HealthEngine | HealthStore | HealthController |
| Opponent health | HealthEngine | HealthStore | HealthController |
| Player shield   | ShieldEngine | ShieldStore | ShieldController |
| Opponent shield | ShieldEngine | ShieldStore | ShieldController |
| **Effects**     |              |             |                  |
| Card resolution | CardResolver | -           | - (no store)     |

---

## When to Use Which Store

### **Use MatchStore for:**

- ✅ Phase transitions
- ✅ Turn management
- ✅ Win/loss detection
- ✅ Action permissions (canPlayCard, canEndTurn)
- ✅ Overall game flow

### **Use CardsStore for:**

- ✅ What cards are in hand
- ✅ Which card is selected
- ✅ Playing cards
- ✅ Drawing cards

### **Use HealthStore for:**

- ✅ Current health values
- ✅ Max health
- ✅ Death detection (optional, MatchEngine can handle)

### **Use ShieldStore for:**

- ✅ Current shield values
- ✅ Shield decay
- ✅ Shield breaking

---

## Store Communication Patterns

### **Pattern 1: Store calls another store's controller**

```typescript
// CardsStore.playCard() needs to use MatchController
export const useCardsStore = create((set, get) => ({
  playCard: (card) => {
    // Get controller from another store
    const matchController = useMatchStore.getState().matchController;

    // Delegate to that controller
    matchController.playCard(card);
  },
}));
```

### **Pattern 2: Engines coordinate internally**

```typescript
// MatchEngine coordinates other engines directly
class MatchEngine {
  playCard(card) {
    // MatchEngine uses its engine references
    this.cardResolver.resolve(card); // Not through controller!
    this.deckEngine.removeFromHand(card);
  }
}
```

**Key:** Engines can talk to engines. Controllers are ONLY for UI → Engine communication.

---

## Your Questions Answered

### 1. **Should HealthEngine/ShieldEngine know about player vs opponent?**

**YES!** Each engine should track both sides:

```typescript
class HealthEngine {
  private playerHealth = 100;
  private opponentHealth = 100;

  takeDamage(amount: number, target: "PLAYER" | "OPPONENT") {
    // Handle both
  }
}
```

Even in multiplayer, each client sees "me vs them". Socket.IO just syncs the state.

---

### 2. **What does MatchEngine do?**

**MatchEngine is the game director:**

✅ **Does:**

- Controls phases (DRAW → PLAY → END_TURN)
- Manages turns
- Enforces rules ("can't play during opponent's turn")
- Coordinates engines ("when turn ends, tell shield engine to decay")
- Detects win conditions

❌ **Doesn't:**

- Store card data (DeckEngine does)
- Store health data (HealthEngine does)
- Execute card effects (CardResolver does)

**Think of it as a referee + stage manager**

---

### 3. **How do stores fit together?**

Two approaches:

#### **Option A: Multiple Specialized Stores (Your current approach)**

- MatchStore: game flow
- CardsStore: card data
- HealthStore: HP
- ShieldStore: shields

**Good for:** Clear separation, easier to test individual systems

**Challenge:** Stores may need to access other stores' controllers

#### **Option B: One Unified GameStore**

```typescript
interface GameStore {
  // All state in one place
  // All controllers in one place
  // All actions in one place
}
```

**Good for:** Simpler component code, no cross-store communication

**Challenge:** Larger store file

Both are valid! I'd recommend **Option A** (separate stores) for your architecture since you already have it set up.

---

### 4. **Match store vs Card store: what goes where?**

**MatchStore:**

- Game state: phase, turn, winner
- Permissions: canPlayCard, canEndTurn
- Actions: startMatch, endTurn

**CardsStore:**

- Card instances: playerHand, opponentHand
- UI state: selectedCard
- Actions: selectCard, playCard

**Rule of thumb:** If it's about game FLOW, it's MatchStore. If it's about CARDS, it's CardsStore.

---

## Final Architecture Checklist

✅ Each engine owns specific data  
✅ MatchEngine coordinates other engines  
✅ Engines distinguish PLAYER vs OPPONENT  
✅ Binders sync engines to stores  
✅ Controllers wrap engine methods  
✅ Stores hold controllers, not engines  
✅ UI only accesses stores  
✅ Engines can call other engines directly  
✅ Stores delegate to controllers

This architecture is multiplayer-ready and scales beautifully! 🎮
