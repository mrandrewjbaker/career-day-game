export type WorldTileBiome = "plains" | "mountain" | "water";

export enum WorldTileBiomeEnum {
  PLAINS = "plains",
  MOUNTAIN = "mountain",
  WATER = "water"
}


export interface WorldTile {
  x: number;
  y: number;
  biome: WorldTileBiome;
}