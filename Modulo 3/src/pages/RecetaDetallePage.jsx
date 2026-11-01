import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useRecetasStore } from "../store/recetasStore";

export const RecetaDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleFavorito = useRecetasStore((state) => state.toggleFavorito);
  const esFavorito = useRecetasStore((state) => state.esFavorito(id));
  const recetasPropias = useRecetasStore((state) => state.recetasPropias);

  const esLocal = id?.startsWith("propia_");
  const recetaLocal = esLocal
    ? recetasPropias.find((r) => r.id === id)
    : null;

  const urlApi = !esLocal
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : null;

  const { data, loading, error } = useFetch(urlApi);

  const recetaApi = data?.meals?.[0];
  const receta = esLocal ? recetaLocal : recetaApi;

  const obtenerIngredientes = (item) => {
    if (!item) return [];

    if (item.esPropia) {
      if (Array.isArray(item.ingredientes)) return item.ingredientes;
      return typeof item.ingredientes === "string"
        ? item.ingredientes.split("\n").filter((i) => i.trim() !== "")
        : [];
    }

    const lista = [];
    for (let i = 1; i <= 20; i++) {
      const ingrediente = item[`strIngredient${i}`];
      const medida = item[`strMeasure${i}`];

      if (ingrediente && ingrediente.trim() !== "") {
        lista.push(`${medida ? medida.trim() + " de " : ""}${ingrediente.trim()}`);
      }
    }
    return lista;
  };

  if (loading && !esLocal) {
    return (
      <div className="container estado-mensaje">
        <p>Cargando los detalles de la receta...</p>
      </div>
    );
  }

  if ((error || !receta) && !loading) {
    return (
      <div className="container estado-mensaje">
        <p>No se pudo encontrar la receta solicitada.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginTop: "1rem" }}>
          Volver atrás
        </button>
      </div>
    );
  }

  const titulo = receta.titulo || receta.strMeal;
  const imagen =
    receta.imagen ||
    receta.strMealThumb ||
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&auto=format&fit=crop&q=60";
  const categoria = receta.categoria || receta.strCategory || "Plato Principal";
  const origen = receta.strArea || (receta.tiempo ? `${receta.tiempo} minutos` : "Casera");
  const instrucciones = receta.pasos || receta.strInstructions || "No hay instrucciones disponibles.";
  const ingredientes = obtenerIngredientes(receta);

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: "1.5rem" }}>
        &larr; Volver
      </button>

      <div className="detalle-card">
        <div className="detalle-hero">
          <img src={imagen} alt={titulo} />

          <div className="detalle-info">
            <span className="receta-badge">{categoria} • {origen}</span>
            <h1>{titulo}</h1>

            <button
              onClick={() =>
                toggleFavorito({
                  id: receta.id || receta.idMeal,
                  titulo,
                  imagen,
                  categoria,
                  esPropia: Boolean(receta.esPropia),
                })
              }
              className="btn btn-primary"
              style={{ marginTop: "1rem", alignSelf: "flex-start" }}
            >
              {esFavorito ? "❤️ Guardada en Favoritos" : "🤍 Agregar a Favoritos"}
            </button>
          </div>
        </div>

        <div className="detalle-seccion">
          <h3>Ingredientes necesarios</h3>
          <div className="ingredientes-grid">
            {ingredientes.map((item, index) => (
              <div key={index} className="ingrediente-item">
                • {item}
              </div>
            ))}
          </div>
        </div>

        <div className="detalle-seccion">
          <h3>Instrucciones paso a paso</h3>
          <p className="instrucciones-texto">{instrucciones}</p>
        </div>
      </div>
    </div>
  );
};
