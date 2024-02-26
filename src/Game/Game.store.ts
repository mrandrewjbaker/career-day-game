// Import Zustand
import { create } from 'zustand';

// Define the state and actions in your store
interface GameState {
  rendererDimensions: {
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
  setRendererPixelDimensions: (height: number, width: number) => void;
  setRendererTileDimensions: (height: number, width: number) => void;
  setRendererCenterTileDimensions: (height: number, width: number) => void;
  gameStatus: 'running' | 'paused' | 'stopped' ;
  startGame: () => void;
  stopGame: () => void;
  pauseGame: () => void;
  // Add more state and actions as needed
}

// Create the store
export const useGameStore = create<GameState>((set) => ({
  rendererDimensions: {
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
  setRendererPixelDimensions: (height, width) =>
    set((store) => ({
      rendererDimensions: {
        ...store.rendererDimensions,
        pixels: {
          height,
          width,
        },
      },
    })),
  setRendererTileDimensions: (height, width) =>
    set((store) => ({
      rendererDimensions: {
        ...store.rendererDimensions,
        tiles: {
          height,
          width,
        },
      },
    })),
  setRendererCenterTileDimensions: (height, width) =>
    set((store) => ({
      rendererDimensions: {
        ...store.rendererDimensions,
        centerTile: {
          height,
          width,
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

