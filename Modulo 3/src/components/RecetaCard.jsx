import { Link } from "react-router-dom";
import { useRecetasStore } from "../store/recetasStore";

export const RecetaCard = ({ receta, onEliminar }) => {
  const toggleFavorito = useRecetasStore((state) => state.toggleFavorito);
  const esFavorito = useRecetasStore((state) => state.esFavorito(receta.id));

  const imagen =
    receta.imagen ||
    receta.strMealThumb ||
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&auto=format&fit=crop&q=60";

  const titulo = receta.titulo || receta.strMeal;
  const categoria = receta.categoria || receta.strCategory || "General";

  const handleFavorito = () => {
    toggleFavorito({
      id: receta.id || receta.idMeal,
      titulo,
      imagen,
      categoria,
      esPropia: receta.esPropia || false,
    });
  };

  return (
    <div className="receta-card">
      <img src={imagen} alt={titulo} className="receta-img" />

      <div className="receta-body">
        <span className="receta-categoria">{categoria}</span>
        <h3 className="receta-title">{titulo}</h3>

        <div className="receta-acciones">
          <Link
            to={`/receta/${receta.id || receta.idMeal}`}
            className="btn btn-ver"
          >
            Ver receta
          </Link>

          <button
            onClick={handleFavorito}
            className={`btn btn-guardar ${esFavorito ? "guardado" : ""}`}
          >
            {esFavorito ? "★ Guardada" : "☆ Guardar"}
          </button>

          {receta.esPropia && onEliminar && (
            <button
              onClick={() => onEliminar(receta.id)}
              className="btn btn-borrar"
            >
              Borrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
