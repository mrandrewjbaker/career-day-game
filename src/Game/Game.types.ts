export type WorldTileBiome = "plains" | "mountain" | "water";

export enum WorldTileBiomeEnum {
  PLAINS = "plains",
  MOUNTAIN = "mountain",
  WATER = "water"
}

export const worldTileBiomesArray: WorldTileBiome[] = ["plains", "mountain", "water"];

export interface WorldTile {
  x: number;
  y: number;
  biome: WorldTileBiome;
}

export interface UndefinedWorldTile extends Omit<WorldTile, 'biome'> {
}