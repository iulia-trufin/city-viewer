import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CountryPopulationPage } from "./pages/CountryPopulationPage";
import { CityPopulationPage } from "./pages/CityPopulationPage";
import { DashboardPage } from "./pages/DashboardPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* default page where the user lands */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/countries" element={<CountryPopulationPage />} />
          <Route path="/cities" element={<CityPopulationPage />} />
          {/* for invalid urls */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
