import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CountryPopulationPage } from "./pages/CountryPopulationPage";
import { CityPopulationPage } from "./pages/CityPopulationPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* default page where the user lands */}
          <Route path="/" element={<Navigate to="/countries" />} />
          <Route path="/countries" element={<CountryPopulationPage />} />
          <Route path="/cities" element={<CityPopulationPage />} />
          {/* for invalid urls */}
          <Route path="*" element={<Navigate to="/countries" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
