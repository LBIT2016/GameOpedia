# Game O'Pedia

Welcome to **Game O'Pedia**, a modern web application designed to catalog and manage your gaming collection across different genres. This project showcases real-time collaboration, offline capabilities, and a responsive interface built with React, TypeScript, Zustand for state management, and TailwindCSS for styling.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [State Management](#state-management)
5. [Offline Support](#offline-support)
6. [Development Guidelines](#development-guidelines)

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/tonk-labs/tonk.git
   cd tonk/apps/Todos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- **Game Management**: Add, edit, and organize games across different genres (TTRPG, Puzzle, Sports)
- **Real-time Collaboration**: Changes sync automatically across all connected clients
- **Offline Support**: Continue using the application even when offline
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Filter & Sort**: Organize your game collection by different criteria

## Project Structure

- `/src/components`: Reusable UI components
- `/src/stores`: Zustand stores with Keepsync integration
- `/src/views`: Application views and pages
- `/src/service-worker.ts`: Service worker for offline functionality
- `/public`: Static assets and offline fallback

## State Management

The application uses Zustand with Keepsync middleware for:

- Persistent state across page reloads
- Real-time synchronization across clients
- Type-safe state management with TypeScript

## Offline Support

Game O'Pedia works offline thanks to:

- Service Worker caching of essential assets
- IndexedDB data persistence
- Automatic synchronization when connection is restored

## Development Guidelines

- Use TypeScript for type safety
- Follow component architecture patterns in `/src/components/CLAUDE.md`
- Implement store patterns from `/src/stores/CLAUDE.md`
- Follow view guidelines in `/src/views/CLAUDE.md`

---

_Game O'Pedia - Your personal gaming universe, anywhere, anytime._
