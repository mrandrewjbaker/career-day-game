import { useEffect, useState } from 'react';
import { useGameStore } from '../../../Game.store';
import scss from './GameViewGridTile.module.scss';
import { isViewGridTileWalkContainer } from '../GameViewGrid.functions';
import { GameGridTileBiomeEnum } from '../../GameGrid.types';
import { ViewGridTileEntity } from './ViewGridTileEntity/ViewGridTileEntity';

interface GameViewGridTileProps {
  x: number;
  y: number;
}

export const GameViewGridTile: React.FC<GameViewGridTileProps> = ({ x, y }) => {
  const [GameViewGridTileClassNames, setGameViewGridTileClassNames] = useState<string[]>([]);
  const { view, world } = useGameStore();


  const determineGameViewGridTileClassNames = () => {
    const newGameViewGridTileClassNames = [scss.GameViewGridTile];

    if (x === view.dimensions.centerTile.x && y === view.dimensions.centerTile.y) {
      newGameViewGridTileClassNames.push(scss.GameViewGridTile__DEV__CenterTile);
    }
    if (isViewGridTileWalkContainer(x, y)) {
      newGameViewGridTileClassNames.push(scss.GameViewGridTile__DEV__WalkContainer);
    }
    

    setGameViewGridTileClassNames([...newGameViewGridTileClassNames]);
  }


  useEffect(() => {
    determineGameViewGridTileClassNames();
  }, [x, y, view.dimensions.centerTile.x, view.dimensions.centerTile.y, view.dimensions.tiles.columns, view.dimensions.tiles.rows]);

  return (
    <div id={`x-${x}-y-${y}`} className={[...GameViewGridTileClassNames].join(' ')}>
      <ViewGridTileEntity x={x} y={y} />
    </div>
  );
}