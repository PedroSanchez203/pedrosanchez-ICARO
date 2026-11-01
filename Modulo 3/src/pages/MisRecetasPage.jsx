import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecetasStore } from "../store/recetasStore";
import { RecetaCard } from "../components/RecetaCard";

export const MisRecetasPage = () => {
  const [tabActivo, setTabActivo] = useState("propias");

  const recetasPropias = useRecetasStore((state) => state.recetasPropias);
  const favoritos = useRecetasStore((state) => state.favoritos);
  const eliminarRecetaPropia = useRecetasStore((state) => state.eliminarRecetaPropia);

  return (
    <div className="container">
      <div className="header-section">
        <h1>Mi Cuaderno de Recetas</h1>
        <p>Gestioná tus recetas personales y tus platos favoritos.</p>
      </div>

      <div className="tab-botones">
        <button
          className={`tab-btn ${tabActivo === "propias" ? "activo" : ""}`}
          onClick={() => setTabActivo("propias")}
        >
          Mis Creaciones ({recetasPropias.length})
        </button>
        <button
          className={`tab-btn ${tabActivo === "favoritos" ? "activo" : ""}`}
          onClick={() => setTabActivo("favoritos")}
        >
          Favoritos ({favoritos.length})
        </button>
      </div>

      {tabActivo === "propias" && (
        <div>
          {recetasPropias.length === 0 ? (
            <div className="estado-mensaje">
              <p>Todavía no agregaste ninguna receta propia.</p>
              <Link to="/nueva" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Crear mi primera receta
              </Link>
            </div>
          ) : (
            <div className="grid-recetas">
              {recetasPropias.map((receta) => (
                <RecetaCard
                  key={receta.id}
                  receta={receta}
                  onEliminar={eliminarRecetaPropia}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {tabActivo === "favoritos" && (
        <div>
          {favoritos.length === 0 ? (
            <div className="estado-mensaje">
              <p>No tenés recetas guardadas en favoritos.</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Explorar recetas
              </Link>
            </div>
          ) : (
            <div className="grid-recetas">
              {favoritos.map((receta) => (
                <RecetaCard key={receta.id} receta={receta} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
