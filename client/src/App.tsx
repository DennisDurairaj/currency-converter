import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import CurrencyConverter from './features/CurrencyConverter/CurrencyConverter';

function App() {
  return (
    <div className="wrapper">
      <ErrorBoundary>
        <CurrencyConverter />
      </ErrorBoundary>
    </div>
  );
}

export default App;
