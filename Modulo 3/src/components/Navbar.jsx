import { NavLink } from "react-router-dom";
import { useRecetasStore } from "../store/recetasStore";

export const Navbar = () => {
  const favoritos = useRecetasStore((state) => state.favoritos);
  const recetasPropias = useRecetasStore((state) => state.recetasPropias);

  const totalGuardadas = favoritos.length + recetasPropias.length;

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        🍳 RecetarioApp
      </NavLink>

      <div className="navbar-links">
        <NavLink to="/" end>
          Explorar
        </NavLink>
        <NavLink to="/nueva">
          + Nueva Receta
        </NavLink>
        <NavLink to="/mis-recetas">
          Mis Recetas
          {totalGuardadas > 0 && (
            <span className="badge-count">{totalGuardadas}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
