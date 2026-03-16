import "./App.css";
import CountryPopulationPage from "./pages/CountryPopulationPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CountryPopulationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
