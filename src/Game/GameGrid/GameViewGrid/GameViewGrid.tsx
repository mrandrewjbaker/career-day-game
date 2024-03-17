import { useEffect, useRef, useState } from 'react';

import scss from './GameViewGrid.module.scss';
import { useGameStore } from '../../Game.store';
import { GameViewGridTile } from './GameViewGridTile/GameViewGridTile';


export const GameViewGrid: React.FC= () => {
  const {view} = useGameStore();
  return (
    <div className={scss.GameViewGrid}
      style={{
        display: 'grid',
        rowGap: '1px',
        columnGap: '1px',
        alignSelf: 'center',
        justifySelf: 'center',
        gridTemplateColumns: `repeat(${view.dimensions.tiles.columns}, 32px)`,
        gridTemplateRows: `repeat(${view.dimensions.tiles.rows}, 32px)`,
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {
        Array(view.dimensions.tiles.rows).fill(null).map((_, rowIndex) => {
          let tileY = rowIndex + view.dimensions.centerTile.y - Math.floor(view.dimensions.tiles.rows / 2);
          tileY = tileY * -1;

          return (
            Array(view.dimensions.tiles.columns).fill(null).map((_, columnIndex) => {
              let tileX = columnIndex + view.dimensions.centerTile.x - Math.floor(view.dimensions.tiles.columns / 2);

              return (
                <GameViewGridTile x={tileX} y={tileY} key={`x-${tileX}-y-${tileY}`} />
              )
            })
          )
        }
      )}        
    </div>
  );
}