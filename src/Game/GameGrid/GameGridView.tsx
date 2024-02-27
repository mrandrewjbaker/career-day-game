import { useGameStore } from '../Game.store';
import { useEffect, useRef, useState } from 'react';

import scss from './GameGridView.module.scss';
import { GameGridTileView } from './GameGridTile/GameGridTileView';
import { generateNewWorldTileBiome } from '../Game.functions';
import { WorldTile } from '../Game.types';

interface GameViewGridProps {
  worldGrid: WorldTile[][];
}

export const GameViewGrid: React.FC<GameViewGridProps> = ({
  worldGrid,
}) => {
  const gameGridViewRef = useRef<HTMLDivElement>(null);
  const [isInitalized, setIsInitalized] = useState<boolean>(false);
  // const { rendererDimensions, setRendererPixelDimensions, setRendererTileDimensions, setRendererCenterTileDimensions } = useGameStore();
  const { world, view, setViewDimensionPixels, setViewDimensionTiles, setViewDimensionCenterTiles} = useGameStore();

  const calculateRendererSymmetricDimensions = (pixelSize: number): number => {
    return (Math.floor(pixelSize / 34)) % 2 === 0 ? Math.floor(pixelSize / 34) - 1 : Math.floor((pixelSize / 34));
  }

  const handleCalculateAndSetRendererDimensions = () => {
    if (view.dimensions.pixels.height > 0 && view.dimensions.pixels.width > 0) {
      setViewDimensionTiles(calculateRendererSymmetricDimensions(view.dimensions.pixels.height), calculateRendererSymmetricDimensions(view.dimensions.pixels.width));
      setViewDimensionCenterTiles(Math.floor(calculateRendererSymmetricDimensions(view.dimensions.pixels.height) / 2), Math.floor(calculateRendererSymmetricDimensions(view.dimensions.pixels.width) / 2));
    }
  }

  const handleSetRendererPixelDimensions = () => {
    if (gameGridViewRef.current) {
      setViewDimensionPixels(gameGridViewRef.current.offsetHeight, gameGridViewRef.current.offsetWidth);
    }
  }


  useEffect(() => {
    if (!isInitalized) {
      handleSetRendererPixelDimensions();
      setIsInitalized(true);
      return;
    }
    handleCalculateAndSetRendererDimensions();
  }, [view.dimensions.pixels.height, view.dimensions.pixels.width, isInitalized]);

  useEffect(() => {
    window.addEventListener('resize', handleSetRendererPixelDimensions);
    return () => {
      window.removeEventListener('resize', handleSetRendererPixelDimensions);
    };
  }, [gameGridViewRef]);

  useEffect(() => {

  }, []);

  return (
    <div className={scss.GameGridView} ref={gameGridViewRef}>
      <div
        className={scss.GameGridView__Grid}
        style={{
          display: 'grid',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: '1px',
          rowGap: '1px',
          margin: '10px',
          height: 'auto',
          width: 'auto',
          gridTemplateRows: `repeat(${view.dimensions.tiles.height}, 32px)`,
          gridTemplateColumns: `repeat(${view.dimensions.tiles.width}, 32px)`,
        }}
      >
      {
        view.dimensions.tiles.height && view.dimensions.tiles.width &&
        view.dimensions.tiles.height !== 0 && view.dimensions.tiles.width !== 0 && (
          Array(view.dimensions.tiles.height)
          .fill(null)
          .map((_, y) =>
            Array(view.dimensions.tiles.width)
              .fill(null)
              .map((_, x) => (
                <GameGridTileView x={x} y={y} key={`${x}-${y}`} />
              )
            )
          )
        )
      }
      </div>
    </div>
  );
}