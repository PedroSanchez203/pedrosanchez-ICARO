import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecetasStore } from "../store/recetasStore";

export const NuevaRecetaPage = () => {
  const navigate = useNavigate();
  const agregarRecetaPropia = useRecetasStore((state) => state.agregarRecetaPropia);

  const [formulario, setFormulario] = useState({
    titulo: "",
    categoria: "Pastas",
    tiempo: "",
    imagen: "",
    ingredientes: "",
    pasos: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.titulo.trim() || !formulario.ingredientes.trim() || !formulario.pasos.trim()) {
      setError("Por favor completa el nombre, los ingredientes y los pasos.");
      return;
    }

    agregarRecetaPropia({
      titulo: formulario.titulo.trim(),
      categoria: formulario.categoria,
      tiempo: formulario.tiempo ? Number(formulario.tiempo) : 30,
      imagen: formulario.imagen.trim(),
      ingredientes: formulario.ingredientes
        .split("\n")
        .map((i) => i.trim())
        .filter((i) => i.length > 0),
      pasos: formulario.pasos.trim(),
    });

    navigate("/mis-recetas");
  };

  return (
    <div className="container">
      <div className="titulo-seccion">
        <h1>Agregar Nueva Receta</h1>
        <p>Carga una receta casera con sus ingredientes y pasos de preparación.</p>
      </div>

      <div className="formulario-box">
        {error && <div className="alerta-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="titulo">Nombre del plato *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="input-texto"
              placeholder="Ej: Milanesas a la napolitana"
              value={formulario.titulo}
              onChange={handleChange}
            />
          </div>

          <div className="campo">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              className="input-texto"
              value={formulario.categoria}
              onChange={handleChange}
            >
              <option value="Pastas">Pastas</option>
              <option value="Carnes">Carnes</option>
              <option value="Postres">Postres</option>
              <option value="Vegetariano">Vegetariano</option>
              <option value="Ensaladas">Ensaladas</option>
              <option value="Sopas">Sopas</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="tiempo">Tiempo aproximado (minutos)</label>
            <input
              type="number"
              id="tiempo"
              name="tiempo"
              className="input-texto"
              placeholder="Ej: 40"
              value={formulario.tiempo}
              onChange={handleChange}
            />
          </div>

          <div className="campo">
            <label htmlFor="imagen">Foto URL (opcional)</label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              className="input-texto"
              placeholder="https://..."
              value={formulario.imagen}
              onChange={handleChange}
            />
          </div>

          <div className="campo">
            <label htmlFor="ingredientes">Ingredientes (uno por renglón) *</label>
            <textarea
              id="ingredientes"
              name="ingredientes"
              className="input-texto"
              rows="5"
              placeholder="500g carne de nalga&#10;2 huevos batidos&#10;Pan rallado&#10;Queso muzzarella&#10;Salsa de tomate"
              value={formulario.ingredientes}
              onChange={handleChange}
            />
          </div>

          <div className="campo">
            <label htmlFor="pasos">Pasos para preparar *</label>
            <textarea
              id="pasos"
              name="pasos"
              className="input-texto"
              rows="5"
              placeholder="1. Pasar la carne por huevo y pan rallado.&#10;2. Freír o dorar al horno.&#10;3. Agregar salsa, queso y gratinar."
              value={formulario.pasos}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-submit">
            Guardar Receta
          </button>
        </form>
      </div>
    </div>
  );
};
