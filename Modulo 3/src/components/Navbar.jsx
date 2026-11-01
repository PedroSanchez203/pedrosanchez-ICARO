import { NavLink } from "react-router-dom";
import { useRecetasStore } from "../store/recetasStore";

export const Navbar = () => {
  const favoritos = useRecetasStore((state) => state.favoritos);
  const recetasPropias = useRecetasStore((state) => state.recetasPropias);

  const total = favoritos.length + recetasPropias.length;

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        Blog de Recetas
      </NavLink>

      <div className="navbar-links">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/nueva">
          Nueva Receta
        </NavLink>
        <NavLink to="/mis-recetas">
          Mis Recetas {total > 0 && `(${total})`}
        </NavLink>
      </div>
    </nav>
  );
};
