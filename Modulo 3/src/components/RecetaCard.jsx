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

  return (
    <div className="receta-card">
      <img src={imagen} alt={titulo} className="receta-img" />

      <div className="receta-body">
        <div className="receta-header">
          <h3 className="receta-title">{titulo}</h3>
          <button
            className="btn-fav"
            onClick={() =>
              toggleFavorito({
                id: receta.id || receta.idMeal,
                titulo,
                imagen,
                categoria,
                esPropia: receta.esPropia || false,
              })
            }
            title={esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            {esFavorito ? "❤️" : "🤍"}
          </button>
        </div>

        <span className="receta-badge">{categoria}</span>

        <div className="receta-footer">
          <Link
            to={`/receta/${receta.id || receta.idMeal}`}
            className="btn btn-primary"
          >
            Ver Detalle
          </Link>

          {receta.esPropia && onEliminar && (
            <button
              onClick={() => onEliminar(receta.id)}
              className="btn btn-danger"
              title="Eliminar receta"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
