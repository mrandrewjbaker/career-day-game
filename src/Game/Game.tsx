import { useEffect, useRef, useState } from 'react';
import scss from './Game.module.scss';
import { GameViewGrid } from './GameGrid/GameViewGrid/GameViewGrid';
import { GameGridTile } from './GameGrid/GameGrid.types';
import { calculateGameViewGridSymmetricDimensions, generateNewGameWorldStartingPosition, initializeNewGameWorldGrid } from './Game.functions';
import { useGameStore } from './Game.store';

export const Game: React.FC = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const { 
    world, setWorldGrid, 
    player, setPlayerWorldPosition, setPlayerViewPosition,
    isWorldGridInitialized, setIsWorldGridInitialized,
    isViewGridInitialized, setIsViewGridInitialized,
    isPlayerInitialized, setIsPlayerInitialized,
    isGameRunning, setIsGameRunning,
    view,
    setViewDimensionPixels, setViewDimensionTiles, setViewDimensionCenterTiles,
  } = useGameStore();

  const gameViewGridContainerRef = useRef<HTMLDivElement>(null);

  const handleInitializeNewGameWorldGrid = (size: 's' | 'm' | 'l') => {
    const newGameWorldGrid = initializeNewGameWorldGrid(size);
    setWorldGrid(newGameWorldGrid);
    setIsWorldGridInitialized(true);
  }

  const handleWindowResize = () => {
    handleInitializeGameViewGridPixelDimensions();
  }


  const handleInitializeGameViewGridPixelDimensions = () => {
    if (gameViewGridContainerRef.current) {
      const symmetricalTileDimensions = calculateGameViewGridSymmetricDimensions(gameViewGridContainerRef.current.offsetHeight, gameViewGridContainerRef.current.offsetWidth);

      setViewDimensionTiles(symmetricalTileDimensions.colunns, symmetricalTileDimensions.rows);
      setIsViewGridInitialized(true);
    }
  }

  useEffect(() => {
    handleInitializeGameViewGridPixelDimensions();

    if (!isViewGridInitialized) {
      setIsViewGridInitialized(true);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, [gameViewGridContainerRef, isViewGridInitialized, pageLoaded]);

  useEffect(() => {
    console.log('%c Game.tsx useEffect([world.grid])', 'color: green');
    if (isWorldGridInitialized && !isPlayerInitialized) {
      const newGameWorldStartingPosition = generateNewGameWorldStartingPosition(world.grid);
      setPlayerWorldPosition(newGameWorldStartingPosition.x, newGameWorldStartingPosition.y);
      setPlayerViewPosition(0, 0);
      setIsPlayerInitialized(true);
    }
  }, [world.grid, isWorldGridInitialized]);


  useEffect(() => {
    console.log('%c Game.tsx useEffect([isWorldGridInitialized, pageLoaded])', 'color: green');

    if (!pageLoaded) {
      setPageLoaded(true);
    }

  }, [pageLoaded]);
  
  return (
    <div className={scss.Game}>
      <div className={scss.Game__ViewGridContainer} ref={gameViewGridContainerRef}>
      {
        isWorldGridInitialized && isViewGridInitialized
          ? <GameViewGrid />
          : (
            <div className={scss.Game__LoadingScreen}>
              <button onClick={() => handleInitializeNewGameWorldGrid('s')}>
                Small World
              </button>
              <button onClick={() => handleInitializeNewGameWorldGrid('m')}>
                Medium World
              </button>
              <button onClick={() => handleInitializeNewGameWorldGrid('l')}>
                Large World
              </button>
            </div>
          )
      }
      </div>
    </div>
  )
}