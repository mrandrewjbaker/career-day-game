import { GameGridTile } from "../GameGrid.types";


export const isViewGridTileCenter = (tile: GameGridTile) => {
  const centerTile = {
    x: 0,
    y: 0
  }

  if (tile.position.x === centerTile.x && tile.position.y === centerTile.y) {
    return true;
  }
}

export const isViewGridTileWalkContainer = (x: number, y: number) => {
  const centerTile = {
    x: 0,
    y: 0
  }
  const walkContainerLeft = {
    x: centerTile.x - 1,
    y: centerTile.y
  }
  const walkContainerTop = {
    x: centerTile.x,
    y: centerTile.y - 1
  }
  const walkContainerRight = {
    x: centerTile.x + 1,
    y: centerTile.y
  }
  const walkContainerBottom = {
    x: centerTile.x,
    y: centerTile.y + 1
  }

  if (x === walkContainerLeft.x && y === walkContainerLeft.y) {
    return true;
  }
  if (x === walkContainerTop.x && y === walkContainerTop.y) {
    return true;
  }
  if (x === walkContainerRight.x && y === walkContainerRight.y) {
    return true;
  }
  if (x === walkContainerBottom.x && y === walkContainerBottom.y) {
    return true;
  }

  return false;
}