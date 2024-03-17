import { useState } from "react";
import { useGameStore } from "../../../../Game.store";

import scss from './ViewGridTileEntity.module.scss';
import { EntityPlayer } from "./EntityPlayer/EntityPlayer";

interface ViewGridTileEntityProps {
  x: number;
  y: number;
}


export const ViewGridTileEntity: React.FC<ViewGridTileEntityProps> = ({x, y}) => {
  const { view, player } = useGameStore();

  const [viewGridTileClassNames, setViewGridTileClassNames] = useState<string[]>([scss.ViewGridTileEntity]);

  const determineViewGridTileClassNames = () => {
    const newViewGridTileClassNames = [scss.ViewGridTileEntity];

    setViewGridTileClassNames([...newViewGridTileClassNames]);
  }

    

  return (
    <div key={`x-${x}-y-${y}`} className={[...viewGridTileClassNames].join(' ')}>
      {
        player.viewPosition.x === x && player.viewPosition.y === y
        && (
          <EntityPlayer x={x} y={y} />
        )
      }
    </div>
  );
}