import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameMenu } from "../../Game/GameMenu/GameMenu";
import { Game } from "../../Game/Game";

import scss from "./AppRouter.module.scss";

export const AppRouter: React.FC = () => {
  return (
    <div className={scss.AppRouter}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={GameMenu} />
          <Route path="/game" Component={Game} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}