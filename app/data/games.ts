export type GameStatus = 'play' | 'coming-soon'

export interface Game {
  slug: string
  icon: string
  name: string
  // Gameplay screenshots shown on the game's detail page. Empty until real captures are added.
  gameplay: string[]
  shortDescription: string
  longDescription: string
  status: GameStatus
  genre: string
  // External URL to the game's own hosted repo/site. Null until it's live.
  link: string | null
}

export const games: Game[] = [
  {
    slug: 'snake',
    icon: '🐍',
    name: 'Snake',
    gameplay: [],
    shortDescription: 'Eat, grow, don\'t bite yourself.',
    longDescription:
      'The arcade classic. Guide your snake around the grid, chase down every spark, and see how long you can grow before you run out of room.',
    status: 'coming-soon',
    genre: 'Classic',
    link: null
  },
  {
    slug: 'breakout',
    icon: '🧱',
    name: 'Breakout',
    gameplay: [],
    shortDescription: 'One paddle, one ball, a wall to clear.',
    longDescription:
      'Angle your shots, keep the ball alive, and smash through every brick on the board. Simple rules, endless "one more try" energy.',
    status: 'coming-soon',
    genre: 'Classic',
    link: null
  },
  {
    slug: '2048',
    icon: '🔢',
    name: '2048',
    gameplay: [],
    shortDescription: 'Slide, merge, and chase the tile.',
    longDescription:
      'Combine matching numbers to reach 2048 and beyond. Easy to learn, brutally hard to put down.',
    status: 'coming-soon',
    genre: 'Puzzle',
    link: null
  },
  {
    slug: 'flappy-bird',
    icon: '🐦',
    name: 'Flappy Bird',
    gameplay: [],
    shortDescription: 'Tap to fly, don\'t clip the pipes.',
    longDescription:
      'One button, zero mercy. Keep tapping to stay airborne and thread the gap between every pipe for as long as you can.',
    status: 'coming-soon',
    genre: 'Casual',
    link: null
  }
]

export const allGenres = [...new Set(games.map((g) => g.genre))].sort()

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug)
}
