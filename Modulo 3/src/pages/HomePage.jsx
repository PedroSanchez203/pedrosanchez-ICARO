import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Buscador } from "../components/Buscador";
import { RecetaCard } from "../components/RecetaCard";

export const HomePage = () => {
  const [termino, setTermino] = useState("chicken");

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${termino}`;
  const { data, loading, error } = useFetch(url);

  const recetas = data?.meals || [];

  return (
    <div className="container">
      <div className="titulo-seccion">
        <h1>Recetas de Cocina</h1>
        <p>Encontrá ideas fáciles para cocinar o sumá tus propios platos al recetario.</p>
      </div>

      <Buscador onBuscar={(nuevoTermino) => setTermino(nuevoTermino)} />

      {loading && (
        <div className="mensaje-estado">
          <p>Cargando recetas...</p>
        </div>
      )}

      {error && (
        <div className="mensaje-estado error">
          <p>Error al cargar las recetas: {error}</p>
        </div>
      )}

      {!loading && !error && recetas.length === 0 && (
        <div className="mensaje-estado">
          <p>No se encontraron resultados para "{termino}". Probá buscando en inglés (ej: beef, salad, rice, pasta).</p>
        </div>
      )}

      {!loading && !error && recetas.length > 0 && (
        <div className="grid-recetas">
          {recetas.map((meal) => (
            <RecetaCard
              key={meal.idMeal}
              receta={{
                id: meal.idMeal,
                titulo: meal.strMeal,
                imagen: meal.strMealThumb,
                categoria: meal.strCategory,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
