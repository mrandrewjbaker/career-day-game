import { useEffect, useRef, useState } from 'react';
import { GameViewGrid } from './GameGrid/GameViewGrid/GameViewGrid';
import { GameGridTile } from './GameGrid/GameGrid.types';
import { calculateGameViewGridSymmetricDimensions, generateNewGameWorldGridStartingPosition, initializeNewGameWorldGrid } from './Game.functions';
import { useGameStore } from './Game.store';

import scss from './Game.module.scss';
import "nes.css/css/nes.min.css";


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
    console.log('size', size);
    console.log('isWorldGridInitialized', isWorldGridInitialized);
    if (!isWorldGridInitialized) {
      const newGameWorldGrid = initializeNewGameWorldGrid(size);
      setWorldGrid(newGameWorldGrid);
      console.log('newGameWorldGrid', newGameWorldGrid);
      setIsWorldGridInitialized(true);
      console.log('%c Game.tsx handleInitializeNewGameWorldGrid', 'color: green');
    }
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

  const handleKeyboardInput = (e: KeyboardEvent) => {
    console.log('e.key', e.key);
    console.log('isViewGridInitialized', isViewGridInitialized);
    console.log('isWorldGridInitialized', isWorldGridInitialized);
    console.log('isPlayerInitialized', isPlayerInitialized);
    switch (e.key) {
      case 'ArrowUp':
        setPlayerWorldPosition(player.worldPosition.x, player.worldPosition.y + 1);
        setPlayerViewPosition(player.viewPosition.x, player.viewPosition.y + 1);
        break;
      case 'ArrowDown':
        setPlayerWorldPosition(player.worldPosition.x, player.worldPosition.y - 1);
        setPlayerViewPosition(player.viewPosition.x, player.viewPosition.y - 1);
        break;
      case 'ArrowLeft':
        setPlayerWorldPosition(player.worldPosition.x - 1, player.worldPosition.y);
        setPlayerViewPosition(player.viewPosition.x - 1, player.viewPosition.y);
        break;
      case 'ArrowRight':
        setPlayerWorldPosition(player.worldPosition.x + 1, player.worldPosition.y);
        setPlayerViewPosition(player.viewPosition.x + 1, player.viewPosition.y);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    console.log('%c Game.tsx useEffect([gameViewGridContainerRef, isViewGridInitialized, isWorldGridInitialized, isPlayerInitialized])', 'color: green');
    console.log('gameViewGridContainerRef', gameViewGridContainerRef);
    console.log('isViewGridInitialized', isViewGridInitialized);
    console.log('isWorldGridInitialized', isWorldGridInitialized);
    console.log('isPlayerInitialized', isPlayerInitialized);


    handleInitializeGameViewGridPixelDimensions();

    if (isWorldGridInitialized && !isPlayerInitialized) {
      const newGameWorldGridStartingPosition = generateNewGameWorldGridStartingPosition(world.grid);
      setPlayerWorldPosition(newGameWorldGridStartingPosition.x, newGameWorldGridStartingPosition.y);
      setPlayerViewPosition(0, 0);
      setIsPlayerInitialized(true);
    }


    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('keydown', handleKeyboardInput);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('keydown', handleKeyboardInput);
    }

    console.log('%c Game.tsx useEffect([world.grid])', 'color: green');

  }, [gameViewGridContainerRef, isViewGridInitialized, isWorldGridInitialized, isPlayerInitialized, pageLoaded, player.worldPosition.x, player.worldPosition.y, player.viewPosition.x, player.viewPosition.y, world.grid]);



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