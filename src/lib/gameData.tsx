import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { useMarketSimulation } from '../hooks/useMarketSimulation';
import { initialPortfolio, type Portfolio } from './portfolio';

type GameData = ReturnType<typeof useMarketSimulation> & { portfolio: Portfolio; setPortfolio: Dispatch<SetStateAction<Portfolio>> };
const GameDataContext = createContext<GameData | null>(null);

export function GameDataProvider({ children }: { children: ReactNode }) {
  const market = useMarketSimulation();
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  return <GameDataContext.Provider value={{ ...market, portfolio, setPortfolio }}>{children}</GameDataContext.Provider>;
}

export function useGameData() {
  const data = useContext(GameDataContext);
  if (data === null) throw new Error('GameDataProvider is missing');
  return data;
}
