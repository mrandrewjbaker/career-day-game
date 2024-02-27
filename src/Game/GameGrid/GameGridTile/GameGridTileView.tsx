import { useEffect, useState } from 'react';
import { useGameStore } from '../../Game.store';
import scss from './GameGridTileView.module.scss';

interface GameGridTileViewProps {
  x: number;
  y: number;
}

export const GameGridTileView: React.FC<GameGridTileViewProps> = ({ x, y }) => {
  const [GameGridTileClassNames, setGameGridTileClassNames] = useState<string[]>([]);
  const { view } = useGameStore();

  const determineGameGridTileClassNames = () => {
    const newGameGridTileClassNames = [scss.GameGridTileView];

    if (x === view.dimensions.centerTile.width && y === view.dimensions.centerTile.height) {
      newGameGridTileClassNames.push(scss.GameGridTileView__CenterTile);
    }

    setGameGridTileClassNames([...newGameGridTileClassNames]);
  }

  useEffect(() => {

    determineGameGridTileClassNames();

  }, [x, y, view.dimensions.centerTile.width, view.dimensions.centerTile.height, view.dimensions.tiles.width, view.dimensions.tiles.height]);

  return (
    <div id={`x-${x}-y-${y}`} className={[...GameGridTileClassNames].join(' ')}>
      {x},{y}
    </div>
  );
}