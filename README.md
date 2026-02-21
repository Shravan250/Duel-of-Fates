# Duel of Fates

## Description
A thrilling real-time multiplayer game with a robust server-authoritative engine and modular engines for flexible gameplay.

## Table of Contents
1. Features
2. Gameplay Overview
3. Getting Started
4. Project Structure
5. Tech Stack
6. Multiplayer Architecture
7. Development Notes
8. Contributing Guidelines
9. Roadmap
10. Contact Information

## Features
- **Real-time Multiplayer**: Engage with players around the world in a seamless multiplayer experience.
- **Server-authoritative Engine**: Ensure fair play with a strong server-controlled validation.
- **Modular Engines**: Customize and expand gameplay through modular architecture.

## Gameplay Overview
### Core Flow
Players enter the game, choose their characters, and compete in various game modes until a win condition is met.

### Win Conditions
Win conditions vary by mode and include eliminating opponents, achieving specific objectives, or accumulating the highest score.

## Getting Started
### Prerequisites
- Node.js and npm installed.
- Access to the game server.

### Installation
1. Clone the repository.
   ```
git clone https://github.com/Shravan250/Duel-of-Fates.git
```
2. Navigate to the project directory.
   ```
cd Duel-of-Fates
```
3. Install dependencies.
   ```
npm install
```

### Development Run Instructions
#### Server
1. Navigate to the server directory.
   ```
cd server
```
2. Start the server.
   ```
npm start
```

#### Client
1. Navigate to the client directory.
   ```
cd client
```
2. Start the client.
   ```
npm start
```

### Build Instructions
To build the project, run:
```bash
npm run build
```

## Project Structure
- **client/**: Contains the client-side code.
- **server/**: Contains the server-side logic.

## Tech Stack
- Node.js
- Express
- Socket.io
- MongoDB

## Multiplayer Architecture
### Server Responsibilities
- Matchmaking
- Game state management
- Validating player actions

### Client Responsibilities
- Rendering graphics
- Handling player input
- Communicating with the server

## Development Notes
Keep environment variables secure. Use dotenv for local development.

## Contributing Guidelines
Feel free to fork the project and submit pull requests with enhancements.

## Roadmap
- Implement additional game modes
- Expand the character roster

## Contact Information
For inquiries, please contact me via GitHub: [Shravan250](https://github.com/Shravan250)