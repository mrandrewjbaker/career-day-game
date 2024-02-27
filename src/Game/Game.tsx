import { useEffect, useState } from 'react';
import scss from './Game.module.scss';
import { WorldTile } from './Game.types';
import { GameViewGrid } from './GameGrid/GameGridView';

export const Game: React.FC = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [worldInitialized, setWorldInitialized] = useState(false);  

  const worldGrid: WorldTile[][] = [];

  const randomizePlayerStartingPosition = (minX: number, maxX: number, minY: number, maxY: number) => {
    const playerStartingPosition = {
      x: Math.floor(Math.random() * (maxX - minX + 1)) + minX,
      y: Math.floor(Math.random() * (maxY - minY + 1)) + minY,
    };
    
    return playerStartingPosition;
  }


  const initializeNewWorldGrid = (size: 'small' | 'medium' | 'large'): void => {
    const tempGrid: { x: number, y: number }[][] = [];
    let columns = 0;
    let rows = 0;
    switch (size) {
      case 'small':
        columns = 250;
        rows = 250;
        break;
      case 'medium':
        columns = 500;
        rows = 500;
        break;
      case 'large':
        columns = 1000;
        rows = 1000;
        break;
    }

    for (let i = 0; i < columns; i++) {
      tempGrid.push([]);
      for (let j = 0; j < rows; j++) {
        tempGrid[i][j] = {
          x: i,
          y: j,
        };
      }
    }
    
    const playerStartingPosition = randomizePlayerStartingPosition(columns*-1, columns, rows*-1, rows);
    console.log('playerStartingPosition:', playerStartingPosition);
  }


  useEffect(() => {
    if (pageLoaded && !worldInitialized) {
      initializeNewWorldGrid('large');
    }

    if (!pageLoaded) {
      setPageLoaded(true);
    }
  }, [worldInitialized, pageLoaded]);
  
  return (
    <div className={scss.Game}>
      {
        worldInitialized
          ? <GameViewGrid worldGrid={worldGrid} />
          : (
            <div className={scss.Game__LoadingScreen}>
              <button onClick={() => setWorldInitialized(true)}>Small World</button>
              <button onClick={() => setWorldInitialized(true)}>Medium World</button>
              <button onClick={() => setWorldInitialized(true)}>Large World</button>
            </div>
          )
      }
    </div>
  )
}