import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { Page404 } from './components/Page404';
import CurrencyConverter from './features/CurrencyConverter/CurrencyConverter';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Switch>
          <Route exact path="/">
            <ErrorBoundary>
              <CurrencyConverter />
            </ErrorBoundary>
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
