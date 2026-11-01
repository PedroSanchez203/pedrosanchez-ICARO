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
      setError("Por favor completa los campos obligatorios (título, ingredientes y pasos).");
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
      <div className="header-section">
        <h1>Agregar Nueva Receta</h1>
        <p>Compartí tu receta casera para tenerla siempre a mano.</p>
      </div>

      <div className="form-card">
        {error && (
          <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "0.8rem", borderRadius: "8px", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Nombre de la receta *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="form-control"
              placeholder="Ej: Ñoquis caseros de papa"
              value={formulario.titulo}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              className="form-control"
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

          <div className="form-group">
            <label htmlFor="tiempo">Tiempo de cocción (en minutos)</label>
            <input
              type="number"
              id="tiempo"
              name="tiempo"
              className="form-control"
              placeholder="Ej: 45"
              value={formulario.tiempo}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagen">URL de la imagen (opcional)</label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              className="form-control"
              placeholder="https://images.unsplash.com/..."
              value={formulario.imagen}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredientes">Ingredientes (uno por línea) *</label>
            <textarea
              id="ingredientes"
              name="ingredientes"
              className="form-control"
              placeholder="1 kg de papas&#10;300 gr de harina&#10;1 huevo&#10;Sal y nuez moscada"
              value={formulario.ingredientes}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pasos">Pasos de preparación *</label>
            <textarea
              id="pasos"
              name="pasos"
              className="form-control"
              placeholder="1. Hervir las papas con cáscara...&#10;2. Pelar y hacer puré...&#10;3. Amasar con harina y huevo..."
              value={formulario.pasos}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            Guardar Receta
          </button>
        </form>
      </div>
    </div>
  );
};
