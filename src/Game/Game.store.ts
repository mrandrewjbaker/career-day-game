// Import Zustand
import { create } from 'zustand';
import { GameGridTile } from './GameGrid/GameGrid.types';

// Define the state and actions in your store
interface GameState {
  isWorldGridInitialized: boolean;
  isPlayerInitialized: boolean;
  isViewGridInitialized: boolean;
  isGameRunning: boolean;
  world: {
    dimensions: {
      height: number;
      width: number;
    };
    grid: GameGridTile[];
  };
  view: {
    dimensions: {
      pixels: {
        height: number;
        width: number;
      };
      tiles: {
        columns: number;
        rows: number;
      };
      centerTile: {
        x: number;
        y: number;
      };
    };
    grid: GameGridTile[];
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
  setIsWorldGridInitialized: (bool: boolean) => void;
  setIsPlayerInitialized: (bool: boolean) => void;
  setIsViewGridInitialized: (bool: boolean) => void;
  setIsGameRunning: (bool: boolean) => void;
  setWorldDimensions: (height: number, width: number) => void;
  setWorldGrid: (grid: GameGridTile[]) => void;
  setViewGrid: (grid: GameGridTile[]) => void;
  setViewDimensionPixels: (height: number, width: number) => void;
  setViewDimensionTiles: (columns: number, rows: number) => void;
  setViewDimensionCenterTiles: (x: number, y: number) => void;
  setPlayerWorldPosition: (x: number, y: number) => void;
  setPlayerViewPosition: (x: number, y: number) => void;
  gameStatus: 'running' | 'paused' | 'stopped';
  startGame: () => void;
  stopGame: () => void;
  pauseGame: () => void;
  // Add more state and actions as needed
}

// Create the store
export const useGameStore = create<GameState>((set) => ({
  isWorldGridInitialized: false,
  isPlayerInitialized: false,
  isViewGridInitialized: false,
  isGameRunning: false,
  world: {
    dimensions: {
      height: 0,
      width: 0,
    },
    grid: [],
  },
  view: {
    dimensions: {
      pixels: {
        height: 0,
        width: 0,
      },
      tiles: {
        columns: 0,
        rows: 0,
      },
      centerTile: {
        x: 0,
        y: 0,
      },
    },
    grid: [],
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
  setIsWorldGridInitialized: (bool) =>
    set(() => ({
      isWorldGridInitialized: bool,
    })),
  setIsPlayerInitialized: (bool) =>
    set(() => ({
      isPlayerInitialized: bool,
    })),
  setIsViewGridInitialized: (bool) =>
    set(() => ({
      isViewGridInitialized: bool,
    })),
  setIsGameRunning: (bool) =>
    set(() => ({
      isGameRunning: bool,
    })),
  setPlayerWorldPosition: (x, y) =>
    set((store) => ({
      player: {
        ...store.player,
        worldPosition: {
          x,
          y,
        },
      },
    })),
  setPlayerViewPosition: (x, y) =>
    set((store) => ({
      player: {
        ...store.player,
        viewPosition: {
          x,
          y,
        },
      },
    })),
  setWorldDimensions: (height, width) =>
    set((store) => ({
      world: {
        ...store.world,
        dimensions: {
          height,
          width,
        },
      },
  })),
  setWorldGrid: (grid) =>
    set((store) => ({
      world: {
        ...store.world,
        grid,
      },
  })),
  setViewGrid: (grid) =>
    set((store) => ({
      view: {
        ...store.view,
        grid,
      },
  })),
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
    setViewDimensionTiles: (columns, rows) =>
    set((store) => ({
      view: {
        ...store.view,
        dimensions: {
          ...store.view.dimensions,
          tiles: {
            columns,
            rows,
          },
        },
      },
    })),
  setViewDimensionCenterTiles: (x, y) =>
    set((store) => ({
      view: {
        ...store.view,
        dimensions: {
          ...store.view.dimensions,
          centerTile: {
            x,
            y,
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

