import { useState } from "react";

export const Buscador = ({ onBuscar, valorInicial = "" }) => {
  const [texto, setTexto] = useState(valorInicial);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(texto.trim());
  };

  return (
    <form className="buscador-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="buscador-input"
        placeholder="Buscar por ingrediente o comida (ej: pasta, chicken, cake)..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button type="submit" className="btn btn-buscar">
        Buscar
      </button>
    </form>
  );
};
