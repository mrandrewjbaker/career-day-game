import scss from './EntityPlayer.module.scss';

interface EntityPlayerProps {
  x: number;
  y: number;
}

export const EntityPlayer: React.FC<EntityPlayerProps> = ({x, y}) => {
  return (
    <div key={`x-${x}-y-${y}`} className={[scss.EntityPlayer].join(' ')}>
      
    </div>
  );
}