import { useState } from "react";

export const Buscador = ({ onBuscar, valorInicial = "" }) => {
  const [texto, setTexto] = useState(valorInicial);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(texto.trim());
  };

  return (
    <form className="buscador-box" onSubmit={handleSubmit}>
      <input
        type="text"
        className="buscador-input"
        placeholder="Buscar receta (ej: chicken, pasta, pizza)..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
    </form>
  );
};
