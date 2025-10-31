# GUESS MASTER

Retro arcade number guessing game with CRT monitor aesthetics. Pick a difficulty, guess a number between 1-100, and try not to run out of attempts.

## How to Play

Choose your difficulty (15, 10, 7, or 5 tries), then start guessing. The game tells you if you're too high or too low. Run out of tries and you lose.

## Setup

```bash
npm install
npx shadcn-ui@latest add card button input alert badge
npm run dev
```

## Features

- Four difficulty levels with limited attempts
- CRT monitor aesthetic with scanlines and neon glow
- Color-coded feedback (cyan for low, orange for high, green for win)
- Chunky retro buttons with press-down animation
- Attempt counter showing tries used and remaining



## Tech

React, TypeScript, Tailwind CSS, shadcn/ui. Purple and yellow color scheme with cyan, pink, and green accents.