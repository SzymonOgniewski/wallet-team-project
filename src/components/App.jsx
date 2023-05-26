import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './Navigation/navigation';
import CurrencyComponent from './Currency/Currency';

const Home = () => <h1>Home Page</h1>;
const Diagram = () => <h1>Diagram Page</h1>;
const Currency = () => <CurrencyComponent />;

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Router>
        <Navigation />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/currency" element={<Currency />} />
        </Routes>
      </Router>
    </div>
  );
};
