import { Route, Switch } from 'wouter';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StockPage } from './pages/StockPage';

// Здесь живут только маршруты. Сами экраны складывай в src/pages/.
export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/stocks/:symbol" component={StockPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
