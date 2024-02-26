import { useGameStore } from '../Game.store';
import { useEffect, useRef, useState } from 'react';

import scss from './GameGridView.module.scss';
import { GameGridTileView } from './GameGridTile/GameGridTileView';
import { generateNewWorldTileBiome } from '../Game.functions';

export const GameViewGrid: React.FC = () => {
  const gameGridViewRef = useRef<HTMLDivElement>(null);
  const [isInitalized, setIsInitalized] = useState<boolean>(false);
  const { rendererDimensions, setRendererPixelDimensions, setRendererTileDimensions, setRendererCenterTileDimensions } = useGameStore();

  const calculateRendererSymmetricDimensions = (pixelSize: number): number => {
    return (Math.floor(pixelSize / 34)) % 2 === 0 ? Math.floor(pixelSize / 34) - 1 : Math.floor((pixelSize / 34));
  }

  const handleCalculateAndSetRendererDimensions = () => {
    if (rendererDimensions.pixels.height > 0 && rendererDimensions.pixels.width > 0) {
      setRendererTileDimensions(calculateRendererSymmetricDimensions(rendererDimensions.pixels.height), calculateRendererSymmetricDimensions(rendererDimensions.pixels.width));
      setRendererCenterTileDimensions(Math.floor(calculateRendererSymmetricDimensions(rendererDimensions.pixels.height) / 2), Math.floor(calculateRendererSymmetricDimensions(rendererDimensions.pixels.width) / 2));
    }
  }

  const handleSetRendererPixelDimensions = () => {
    if (gameGridViewRef.current) {
      setRendererPixelDimensions(gameGridViewRef.current.offsetHeight, gameGridViewRef.current.offsetWidth);
    }
  }


  useEffect(() => {
    if (!isInitalized) {
      handleSetRendererPixelDimensions();
      setIsInitalized(true);
      return;
    }
    handleCalculateAndSetRendererDimensions();
  }, [rendererDimensions.pixels.height, rendererDimensions.pixels.width, isInitalized]);

  useEffect(() => {
    window.addEventListener('resize', handleSetRendererPixelDimensions);
    return () => {
      window.removeEventListener('resize', handleSetRendererPixelDimensions);
    };
  }, [gameGridViewRef]);

  useEffect(() => {
    console.log(generateNewWorldTileBiome(1, 1, []));
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
          gridTemplateRows: `repeat(${rendererDimensions.tiles.height}, 32px)`,
          gridTemplateColumns: `repeat(${rendererDimensions.tiles.width}, 32px)`,
        }}
      >
      {
        rendererDimensions.tiles.height && rendererDimensions.tiles.width &&
        rendererDimensions.tiles.height !== 0 && rendererDimensions.tiles.width !== 0 && (
          Array(rendererDimensions.tiles.height)
          .fill(null)
          .map((_, y) =>
            Array(rendererDimensions.tiles.width)
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