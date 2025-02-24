# Pokémon App - Deployment Guide

This guide provides step-by-step instructions to deploy the **Pokémon App**, a React-based application using Vite.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A hosting provider such as [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [GitHub Pages](https://pages.github.com/)

## Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone <repo-url>
cd pokemon-app

# Install dependencies
npm install
```

## Running Locally

To start the development server, run:

```sh
npm run dev
```

This will launch the application locally at `http://localhost:5173/` (or another available port).

## Building for Production

To create an optimized production build, run:

```sh
npm run build
```

This will generate static files inside the `dist/` folder.

## Deployment

1. Run:
   ```sh
   npm run deploy
   ```

## Linting

To check for linting errors, run:

```sh
npm run lint
```
