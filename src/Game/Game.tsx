import scss from './Game.module.scss';
import { GameViewGrid } from './GameGrid/GameGridView';

export const Game: React.FC = () => {
  return (
    <div className={scss.Game}>
      <GameViewGrid />
    </div>
  )
}