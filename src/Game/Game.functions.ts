import { WorldTile, WorldTileBiomeEnum } from "./Game.types"

export const generateNewWorldTileBiome = (x: number, y: number, worldMap: WorldTile[][]): WorldTileBiomeEnum => {
  const newBiome = WorldTileBiomeEnum.PLAINS;
  const minX = x - 2;
  const minY = y - 2;
  const maxX = x + 2;
  const maxY = y + 2;

  const directTiles: WorldTile[] = [];
  const indirectTiles: WorldTile[] = [];

  for (let i = minY; i < maxY; i++) {
    for (let j = minX; j < maxX; j++) {
      console.log(`i=${i} j=${j}`);
      if (i === y || j === x) {
        directTiles.push(worldMap?.[j]?.[i]);
      } else {
        indirectTiles.push(worldMap?.[j]?.[i]);
      }
    }
  }

  console.log('Direct tiles:', directTiles);
  console.log('Indirect tiles:', indirectTiles);

  return newBiome;

}

const generateNewWorldTile = (x: number, y: number, worldMap: WorldTile[][]) => {
  const newWorldTile: WorldTile = {
    x: x,
    y: y,
    biome: "plains"
  };
  worldMap[x][y] = newWorldTile;

  return newWorldTile;
}

export const generateNewWorldMap = (size: number) => {
  const newWorldMap: WorldTile[][] = [];
  for (let x = 0; x < size; x++) {
    newWorldMap[x] = [];
    for (let y = 0; y < size; y++) {
      newWorldMap[x][y] = {
        x: x,
        y: y,
        biome: generateNewWorldTileBiome(x, y, newWorldMap) || "plains"
      };
    }
  }
}

