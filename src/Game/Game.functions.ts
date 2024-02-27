import { WorldTile, WorldTileBiomeEnum, worldTileBiomesArray } from "./Game.types"


const caluculateTileBiome = (directTiles: (WorldTile | undefined)[], indirectTiles: (WorldTile | undefined)[]) => {
  const weightedDirectTiles: (WorldTile & { weight: number })[] = [];
  const weightedIndirectTiles: (WorldTile & { weight: number })[] = [];

  directTiles.forEach((tile) => {
    if (tile) {
      weightedDirectTiles.push({ ...tile, weight: 1 });
    }
  });

  indirectTiles.forEach((tile) => {
    if (tile) {
      weightedIndirectTiles.push({ ...tile, weight: 0.45 });
    }
  });

  const allTiles = [...weightedDirectTiles, ...weightedIndirectTiles];
 
  console.log('allTiles:', allTiles);

  const randomWeight = Math.random();
  const weightedTiles = allTiles.map((tile) => {
    return { weight: tile.weight, tile }
  });
  let currentWeight = 0;
  let mostWeightedTile: WorldTile | undefined;
  console.log('weightedTiles:', weightedTiles);
  weightedTiles.forEach((weightedTile) => {
    currentWeight += weightedTile.weight;
    if (currentWeight >= randomWeight) {
      mostWeightedTile = weightedTile.tile;
      return;
    }
  });  

  if(!mostWeightedTile) {
    // randomly grab biome if weight is not found
    return worldTileBiomesArray[Math.floor(Math.random() * worldTileBiomesArray.length)] as WorldTileBiomeEnum;
  }  

  return mostWeightedTile.biome as WorldTileBiomeEnum;
}

export const generateNewWorldTileBiome = (x: number, y: number, worldMap: WorldTile[][]): WorldTileBiomeEnum => {
  const newBiome = WorldTileBiomeEnum.PLAINS;
  const minX = x - 2;
  const minY = y - 2;
  const maxX = x + 2;
  const maxY = y + 2;

  const directTiles: (WorldTile | undefined)[] = [];
  const indirectTiles: (WorldTile | undefined)[] = [];

  for (let currentX = minX; currentX <= maxX; currentX++) {
    for (let currentY = minY; currentY <= maxY; currentY++) {

      console.log('currentX:', currentX, 'currentY:', currentY);

      if (currentX === x && currentY === y) {
        console.log('Skipping self');
        continue;
      } else if (currentX <= x + 1 && currentX >= x - 1 && currentY >= y - 1 && currentY <= y + 1) {
        console.log(`Direct tile: x: ${currentX}, y: ${currentY}`);
        const worldTile = worldMap?.[currentX]?.[currentY];
        directTiles.push(worldTile);
      } else {
        console.log(`Indirect tile: x: ${currentX}, y: ${currentY}`);
        const worldTile = worldMap?.[currentX]?.[currentY];
        indirectTiles.push(worldTile);
      }
    }
  }

  return caluculateTileBiome(directTiles, indirectTiles);
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

