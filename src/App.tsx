import { Route, Switch } from 'wouter';
import { AuthPage } from './pages/AuthPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { MissionsPage } from './pages/MissionsPage';
import { GameDataProvider } from './lib/gameData';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StockPage } from './pages/StockPage';

// Здесь живут только маршруты. Сами экраны складывай в src/pages/.
export default function App() {
  return <GameDataProvider>
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/assistant" component={AiAssistantPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/missions" component={MissionsPage} />
      <Route path="/stocks/:symbol" component={StockPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </GameDataProvider>;
}
