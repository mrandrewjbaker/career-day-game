import { useEffect, useState } from 'react';
import { useGameStore } from '../../Game.store';
import scss from './GameGridTileView.module.scss';

interface GameGridTileViewProps {
  x: number;
  y: number;
}

export const GameGridTileView: React.FC<GameGridTileViewProps> = ({ x, y }) => {
  const [GameGridTileClassNames, setGameGridTileClassNames] = useState<string[]>([]);
  const { rendererDimensions } = useGameStore();

  const determineGameGridTileClassNames = () => {
    const newGameGridTileClassNames = [scss.GameGridTileView];

    if (x === rendererDimensions.centerTile.width && y === rendererDimensions.centerTile.height) {
      newGameGridTileClassNames.push(scss.GameGridTileView__CenterTile);
    }

    setGameGridTileClassNames([...newGameGridTileClassNames]);
  }

  useEffect(() => {

    determineGameGridTileClassNames();

  }, [x, y, rendererDimensions.centerTile.width, rendererDimensions.centerTile.height, rendererDimensions.tiles.width, rendererDimensions.tiles.height]);

  return (
    <div id={`x-${x}-y-${y}`} className={[...GameGridTileClassNames].join(' ')}>
      {x},{y}
    </div>
  );
}