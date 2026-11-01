import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecetasStore } from "../store/recetasStore";
import { RecetaCard } from "../components/RecetaCard";

export const MisRecetasPage = () => {
  const [tab, setTab] = useState("propias");

  const recetasPropias = useRecetasStore((state) => state.recetasPropias);
  const favoritos = useRecetasStore((state) => state.favoritos);
  const eliminarRecetaPropia = useRecetasStore((state) => state.eliminarRecetaPropia);

  return (
    <div className="container">
      <div className="titulo-seccion">
        <h1>Mis Recetas</h1>
        <p>Tus recetas agregadas manualmente y las que guardaste como favoritas.</p>
      </div>

      <div className="barra-pestañas">
        <button
          className={`btn-pestaña ${tab === "propias" ? "activa" : ""}`}
          onClick={() => setTab("propias")}
        >
          Mis Recetas ({recetasPropias.length})
        </button>
        <button
          className={`btn-pestaña ${tab === "favoritos" ? "activa" : ""}`}
          onClick={() => setTab("favoritos")}
        >
          Favoritos ({favoritos.length})
        </button>
      </div>

      {tab === "propias" && (
        <div>
          {recetasPropias.length === 0 ? (
            <div className="mensaje-estado">
              <p>No tenés recetas propias creadas todavía.</p>
              <Link to="/nueva" className="btn btn-ver" style={{ marginTop: "1rem", display: "inline-block" }}>
                + Agregar mi primera receta
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

      {tab === "favoritos" && (
        <div>
          {favoritos.length === 0 ? (
            <div className="mensaje-estado">
              <p>No guardaste ninguna receta en favoritos.</p>
              <Link to="/" className="btn btn-ver" style={{ marginTop: "1rem", display: "inline-block" }}>
                Ver recetas disponibles
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
