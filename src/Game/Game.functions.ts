import { GameGridTile, GameGridTileBiomeEnum, GameGridTilePosition } from "./GameGrid/GameGrid.types";

export const generateNewGameGridTileBiome = (newGameWorldGrid: GameGridTile[]): GameGridTileBiomeEnum => {
  let newGameWorldTileBiome = GameGridTileBiomeEnum.PLAINS;

  console.log("newGameWorldTileBiome", newGameWorldTileBiome);
  return newGameWorldTileBiome;
};

export const generateNewGameWorldGridStartingPosition = (newGameWorldGrid: GameGridTile[]): GameGridTilePosition => {
  console.log('%c generateNewGameWorldStartingPosition()', 'color: red');
  const minX = newGameWorldGrid[0].position.x;
  const maxX = newGameWorldGrid[newGameWorldGrid.length - 1].position.x;
  const minY = newGameWorldGrid[0].position.y;
  const maxY = newGameWorldGrid[newGameWorldGrid.length - 1].position.y;

  let newGameWorldStartingPosition: GameGridTilePosition = { x: 0, y: 0 };
  // Generate new game world starting position.
  newGameWorldStartingPosition.x = Math.floor(Math.random() * (maxX - minX) + minX);
  newGameWorldStartingPosition.y = Math.floor(Math.random() * (maxY - minY) + minY);

  console.log("newGameWorldStartingPosition", newGameWorldStartingPosition);
  return newGameWorldStartingPosition;
}

export const initializeNewGameWorldGrid = (size: 's' | 'm' | 'l'): GameGridTile[] => {
  console.log('%c initializeNewGameWorldGrid()', 'color: red');
  let newGameWorldGridSize = 250;
  switch (size) {
    case 's':
      newGameWorldGridSize = 250;
      break;
    case 'm':
      newGameWorldGridSize = 500;
      break;
    case 'l':
      newGameWorldGridSize = 1000;
      break;
    default:
      newGameWorldGridSize = 250;
  }

  const minX = newGameWorldGridSize * -1;
  const maxX = newGameWorldGridSize;
  const minY = newGameWorldGridSize * -1;
  const maxY = newGameWorldGridSize;

  let newGameWorldGrid: GameGridTile[] = [];
  for (let x = minX; x < maxX; x++) {
    for (let y = minY; y < maxY; y++) {
      newGameWorldGrid.push(
        {
          position: { x, y },
          biome: GameGridTileBiomeEnum.UNINITIALIZED,
        }
      );
    }
  }

  return newGameWorldGrid;
}

export const calculateGameViewGridSymmetricDimensions = (
  gameViewGridPixelsHeight: number, 
  gameViewGridPixelsWidth: number,
) => {
  return {
    colunns: (Math.floor(gameViewGridPixelsWidth / 34)) % 2 === 0 
      ? Math.floor(gameViewGridPixelsWidth / 34) - 1
      : Math.floor((gameViewGridPixelsWidth / 34)),
    rows: (Math.floor(gameViewGridPixelsHeight / 34)) % 2 === 0
      ? Math.floor(gameViewGridPixelsHeight / 34) - 1
      : Math.floor((gameViewGridPixelsHeight / 34)),
  }
}

export const playerMove = (direction: 'up' | 'down' | 'left' | 'right') => {
  console.log('%c playerMove()', 'color: red');
}