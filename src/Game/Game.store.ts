// Import Zustand
import { create } from 'zustand';
import { WorldTile } from './Game.types';

// Define the state and actions in your store
interface GameState {
  world: {
    dimensions: {
      height: number;
      width: number;
    };
    grid: {
      tiles: WorldTile[][];
    };
  };
  view: {
    dimensions: {
      pixels: {
        height: number;
        width: number;
      };
      tiles: {
        height: number;
        width: number;
      };
      centerTile: {
        height: number;
        width: number;
      };
    };
  };
  player: {
    worldPosition: {
      x: number;
      y: number;
    };
    viewPosition: {
      x: number;
      y: number;
    };
  };
  setViewDimensionPixels: (height: number, width: number) => void;
  setViewDimensionTiles: (height: number, width: number) => void;
  setViewDimensionCenterTiles: (height: number, width: number) => void;
  gameStatus: 'running' | 'paused' | 'stopped' ;
  startGame: () => void;
  stopGame: () => void;
  pauseGame: () => void;
  // Add more state and actions as needed
}

// Create the store
export const useGameStore = create<GameState>((set) => ({
  world: {
    dimensions: {
      height: 0,
      width: 0,
    },
    grid: {
      tiles: [],
    },
  },
  view: {
    dimensions: {
      pixels: {
        height: 0,
        width: 0,
      },
      tiles: {
        height: 0,
        width: 0,
      },
      centerTile: {
        height: 0,
        width: 0,
      },
    },
  },
  player: {
    worldPosition: {
      x: 0,
      y: 0,
    },
    viewPosition: {
      x: 0,
      y: 0,
    },
  },
  setViewDimensionPixels: (height, width) =>
    set((store) => ({
      view: {
        ...store.view,
        dimensions: {
          ...store.view.dimensions,
          pixels: {
            height,
            width,
          },
        },
      },
    })),
    setViewDimensionTiles: (height, width) =>
    set((store) => ({
      view: {
        ...store.view,
        dimensions: {
          ...store.view.dimensions,
          tiles: {
            height,
            width,
          },
        },
      },
    })),
  setViewDimensionCenterTiles: (height, width) =>
    set((store) => ({
      view: {
        ...store.view,
        dimensions: {
          ...store.view.dimensions,
          centerTile: {
            height,
            width,
          },
        },
      },
    })),
  gameStatus: 'stopped',
  startGame: () =>
    set(() => ({
      gameStatus: 'running',
    })
  ),
  stopGame: () =>
    set(() => ({
      gameStatus: 'stopped',
    })
  ),
  pauseGame: () =>
    set(() => ({
      gameStatus: 'paused',
    })
  ),
}));

