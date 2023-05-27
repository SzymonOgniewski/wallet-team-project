import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './Navigation/navigation';
import CurrencyComponent from './Currency/Currency';
import { RegistrationPage } from "../pages/RegistrationPage/RegistrationPage";

const Home = () => <h1>Home Page</h1>;
const Diagram = () => <h1>Diagram Page</h1>;
const Currency = () => <CurrencyComponent />;

export const App = () => {
  return (
    <>
        {/* <Navigation /> */}
        <Routes>
          <Route path="*" exact element={<Home />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/currency" element={<Currency />} />
        </Routes>
        {/* <CurrencyComponent /> */}
    </>
  );
}
