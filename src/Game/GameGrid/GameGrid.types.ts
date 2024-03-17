export type GameGridTileBiome = "plains" | "mountain" | "water" | "uninitialized";

export enum GameGridTileBiomeEnum {
  PLAINS = "plains",
  MOUNTAIN = "mountain",
  WATER = "water",
  UNINITIALIZED= "uninitialized",
}

export const worldTileBiomesArray: GameGridTileBiome[] = ["plains", "mountain", "water", "uninitialized"];

export interface GameGridTilePosition {
  x: number;
  y: number;
}

export interface GameGridTile {
  position: GameGridTilePosition;
  biome: GameGridTileBiomeEnum;
}

export interface UndefinedWorldTile extends Omit<GameGridTile, 'biome'> {
}