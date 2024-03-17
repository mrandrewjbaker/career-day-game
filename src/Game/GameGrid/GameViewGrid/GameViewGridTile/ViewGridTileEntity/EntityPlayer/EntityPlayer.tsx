import { useEffect, useState } from 'react';
import { useGameStore } from '../../../../../Game.store';

import scss from './EntityPlayer.module.scss';


interface EntityPlayerProps {
  x: number;
  y: number;
}

export const EntityPlayer: React.FC<EntityPlayerProps> = ({x, y}) => {
  const { view, player } = useGameStore();
  const [entityPlayerClassNames, setEntityPlayerClassNames] = useState<string[]>([scss.EntityPlayer, scss.EntityPlayer__Front]);
  const [isEntityPlayerInitialized, setIsEntityPlayerInitialized] = useState(false);



  const determineEntityPlayerClassNames = () => {
    let newEntityPlayerClassNames = [scss.EntityPlayer];

    switch (player.viewDirection) {
      case 'up':
        newEntityPlayerClassNames = [scss.EntityPlayer, scss.EntityPlayer__Back];
        break;
      case 'down':
        newEntityPlayerClassNames = [scss.EntityPlayer, scss.EntityPlayer__Front];
        break;
      case 'left':
        newEntityPlayerClassNames = [scss.EntityPlayer, scss.EntityPlayer__Left];
        break;
      case 'right':
        newEntityPlayerClassNames = [scss.EntityPlayer, scss.EntityPlayer__Right];
        break;
      default:
        newEntityPlayerClassNames = [scss.EntityPlayer, scss.EntityPlayer__Front];
        break;
    }

    setEntityPlayerClassNames([...newEntityPlayerClassNames]);
  }

  useEffect(() => {
      determineEntityPlayerClassNames();
      setIsEntityPlayerInitialized(true);

  }, [player.viewDirection, isEntityPlayerInitialized]);

  return (
    <div key={`x-${x}-y-${y}`} className={[...entityPlayerClassNames].join(' ')}>
      
    </div>
  );
}