# Technical Test

A React application built with TypeScript, Vite, and TailwindCSS.

## Prerequisites

- Node.js (v18 or higher) or Bun
- npm, yarn, or bun package manager

## Installation

```bash
npm install
```

or with bun:

```bash
bun install
```

## Environment Configuration

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:3000
VITE_API_SIGNATURE=your-name
```

## Available Scripts

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

or with bun:

```bash
bun run dev
```

The application will be available at `http://localhost:5173`

### Build

Build the application for production:

```bash
npm run build
```

or with bun:

```bash
bun run build
```

The build output will be in the `dist/` directory.


## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS 4** - Styling
- **React Query (TanStack Query)** - Data fetching and state management
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **ESLint** - Code linting

## Project Structure

```
src/
    assets/          # Static assets
    components/      # Reusable components
    module/          # Feature modules
    provider/        # Context providers
    service/         # API services
    App.tsx          # Main app component
    main.tsx         # App entry point
```
