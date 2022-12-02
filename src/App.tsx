import "./App.css";
import { Forecast } from "./components/Forecast";
import { ForecastContextProvider } from "./contexts/ForecastContextProvider";

function App() {
  return (
    <ForecastContextProvider>
      <Forecast />
    </ForecastContextProvider>
  );
}

export default App;
