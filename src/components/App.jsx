import CurrencyComponent from "./Currency/Currency";
import Loader from "./Loader/Loader";

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
      <CurrencyComponent />
      <Loader />
      React homework template
    </div>
  );
};
