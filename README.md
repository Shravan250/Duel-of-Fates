# Multiplayer Architecture

## Real-time Communication
The game employs Socket.IO for real-time communication between the server and clients, ensuring a seamless multiplayer experience.

## Server-Authoritative Game Engine
All game logic is processed on the server to maintain fairness and prevent cheating. Clients are responsible for rendering the game state and sending user inputs to the server.

## Modular Engines

- **Card Engine**: Handles card mechanics.
- **Deck Engine**: Manages card decks and drawing mechanics.
- **Status Engine**: Tracks player statuses and effects.
- **Health Engine**: Monitors player health and triggers game over conditions.
- **Shield Engine**: Manages shields and defense mechanics.
- **Match Engine**: Coordinates the game flow and player turns.
- **Log Engine**: Maintains a history of actions and events during gameplay.

## Proper Server/Client Separation
The server and client have distinct responsibilities and are organized into separate directories:

### Server Directories
- **game/engine/cards**: Contains the card engine logic.
- **game/engine/deck**: Contains the deck management logic.
- **matchmaking**: Handles player matchmaking and game room creation.
- **room**: Manages game rooms and player connections.
- **socket**: Contains Socket.IO setup and event handling.

### Client Directories
- **components**: Contains UI and game components.
- **store**: Manages application state using a state management library.
- **network**: Contains logic for communicating with the server.
- **types**: Defines TypeScript types for better type safety and code organization.

# Development Notes
- Ensure all game logic is handled on the server side to prevent cheating.
- Maintain a clear separation between client and server code to facilitate easier updates and debugging.
- Use modular programming practices to enhance maintainability and scalability of the game architecture. 

### Sections Updated:
- Features
- Gameplay Overview
- Getting Started
- Project Structure
- Tech Stack

