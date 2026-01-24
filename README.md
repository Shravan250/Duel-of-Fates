# Duel of Fates

Turn-based strategy card game built with TypeScript.

Duel of Fates is a tactical, turn-based card game where two players face off using decks of cards representing units, spells, and strategic effects. Each match tests deck-building, resource management, and tactical decision-making.

---

## Table of Contents

- [Demo / Screenshots](#demo--screenshots)
- [Features](#features)
- [Gameplay Overview](#gameplay-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Run (development)](#run-development)
  - [Build & Preview](#build--preview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Development Notes](#development-notes)
- [Testing](#testing)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## Demo / Screenshots

Include a short GIF or screenshot of gameplay here.

Example:
- Screenshot: `docs/screenshots/gameplay.png`
- Demo: (link to live demo, if available)

---

## Features

- Turn-based PvP or AI matches
- Card types: Units, Spells, Equipment (customizable)
- Resource/Energy system for playing cards each turn
- Deck building and hand management
- Visual, responsive UI (desktop & tablet-friendly)
- Save/load game state and replay support (planned)

---

## Gameplay Overview

Core concepts:
- Players begin with a deck and draw an opening hand.
- Each turn consists of phases (example):
  1. Draw Phase — draw cards
  2. Main Phase — play cards (paying their cost)
  3. Attack/Resolve Phase — units attack or abilities resolve
  4. End Phase — cleanup and pass turn
- Card types:
  - Unit: Places a unit on the board that can attack or block.
  - Spell: One-off effects that affect units, players, or board state.
  - Resource/Support: Cards that change resource production or board conditions.
- Victory: Reduce opponent's health to zero or satisfy alternate win condition (e.g., deck-out rules).
- Strategy tips:
  - Balance early-game tempo with late-game threats.
  - Manage resources carefully; inefficient plays compound disadvantages.
  - Know when to trade units and when to push face damage.

Adjust these mechanics to match your project's actual rules.

---

## Getting Started

### Prerequisites

- Node.js >= 16 (recommend 18+)
- npm, yarn, or pnpm (whichever your project uses)
- Optional: VS Code and recommended extensions for TypeScript

### Install

Clone the repo:

```bash
git clone https://github.com/Shravan250/Duel-of-Fates.git
cd Duel-of-Fates
```

Install dependencies (example using npm):

```bash
npm install
```

If you use yarn:

```bash
yarn
```

If you use pnpm:

```bash
pnpm install
```

### Run (development)

Start the development server (update script name if different):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open your browser at the address the dev server prints (commonly http://localhost:3000 or http://localhost:5173).

### Build & Preview

Build for production:

```bash
npm run build
```

Preview a production build locally (if supported by your setup):

```bash
npm run preview
```

If your project uses a framework (React + Vite, Next.js, etc.), replace the commands above with framework-specific scripts.

---

## Project Structure (Suggested)

A typical layout — adjust to reflect the actual repo layout:

```
/src
  /components        # UI components (cards, board, HUD)
  /game              # Core game logic, rules, engine
  /assets            # Images, sounds
  /styles            # CSS / global styles
  main.tsx / index.ts
/public
  index.html
tests
  unit/               # Unit tests (game logic, helpers)
  integration/
package.json
tsconfig.json
```

---

## Tech Stack

Based on repository composition:
- Primary: TypeScript
- Styling: CSS
- Runtime / Bundler: (e.g., Vite, Webpack) — update to match repository configuration
- Testing: (e.g., Jest, Vitest) — add if configured

Please replace the placeholders above with the actual frameworks and libraries used in this repo.

---

## Development Notes

- Keep game logic (pure functions) separated from UI components for easier testing.
- Use TypeScript types and interfaces for card definitions, game state, and actions.
- Consider an immutable state model or Redux-like pattern for deterministic replay and easier debugging.
- Add logging or a debug mode for step-by-step game state inspection.

---

## Testing

If tests are present, run:

```bash
npm run test
# or
yarn test
```

Recommended tests:
- Unit tests for card effects and game rules
- Integration tests for turn flow and edge-case interactions
- Snapshot tests for critical UI components

---

## Contributing

Contributions are welcome!

- Open an issue to discuss major changes or features before implementing.
- Fork the repo and create a feature branch:
  - `git checkout -b feat/my-new-feature`
- Keep commits focused and readable.
- Open a pull request describing your change, referencing related issues.

Consider adding:
- Issue and PR templates
- A CONTRIBUTING.md with coding conventions and branch strategy

---

## Roadmap

Planned/possible features:
- Online matchmaking and ranked play
- AI opponents with varying difficulty
- Deck editor with card import/export
- Spectator mode and replays
- Mobile-friendly UI and touchscreen support

---

## License

Add a LICENSE file to this repository and update this section with the chosen license (MIT, Apache-2.0, etc.).

---

## Contact

Repository: [Shravan250/Duel-of-Fates](https://github.com/Shravan250/Duel-of-Fates)

For questions or help, open an issue or reach out via GitHub.

---
