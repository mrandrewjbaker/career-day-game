import { useGameStore } from '../Game.store';
import scss from './GameMenu.module.scss';

export const GameMenu: React.FC = () => {
  const { gameStatus } = useGameStore();

  const gameMenuOptions = [
    {
      label: `${gameStatus === 'running' ? 'Stop' : 'Start'} Game`,
      path: "/game"
    },
    {
      label: "Save Game",
      path: "/save"
    },
    {
      label: "Save & Quit",
      path: "/save-quit"
    },
  ]


  return (
    <div className={scss.GameMenu}>
      <ul className={scss.GameMenu__MenuList}>
        {gameMenuOptions.map((option, index) => (
          <li key={index} className={scss.GameMenu__MenuItem}>
            <a href={option.path}>{option.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}