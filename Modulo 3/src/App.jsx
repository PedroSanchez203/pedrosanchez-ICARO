import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { RecetaDetallePage } from "./pages/RecetaDetallePage";
import { NuevaRecetaPage } from "./pages/NuevaRecetaPage";
import { MisRecetasPage } from "./pages/MisRecetasPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/receta/:id" element={<RecetaDetallePage />} />
          <Route path="/nueva" element={<NuevaRecetaPage />} />
          <Route path="/mis-recetas" element={<MisRecetasPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
