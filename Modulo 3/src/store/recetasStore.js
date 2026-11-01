import { create } from "zustand";

export const useRecetasStore = create((set, get) => ({
  recetasPropias: JSON.parse(localStorage.getItem("recetas_propias")) || [],
  favoritos: JSON.parse(localStorage.getItem("recetas_favoritos")) || [],

  agregarRecetaPropia: (receta) =>
    set((state) => {
      const nueva = {
        ...receta,
        id: `propia_${Date.now()}`,
        esPropia: true,
      };
      const actualizadas = [nueva, ...state.recetasPropias];
      localStorage.setItem("recetas_propias", JSON.stringify(actualizadas));
      return { recetasPropias: actualizadas };
    }),

  eliminarRecetaPropia: (id) =>
    set((state) => {
      const actualizadas = state.recetasPropias.filter((r) => r.id !== id);
      localStorage.setItem("recetas_propias", JSON.stringify(actualizadas));
      return { recetasPropias: actualizadas };
    }),

  toggleFavorito: (receta) =>
    set((state) => {
      const existe = state.favoritos.some((f) => f.id === receta.id);
      let actualizados;
      if (existe) {
        actualizados = state.favoritos.filter((f) => f.id !== receta.id);
      } else {
        actualizados = [...state.favoritos, receta];
      }
      localStorage.setItem("recetas_favoritos", JSON.stringify(actualizados));
      return { favoritos: actualizados };
    }),

  esFavorito: (id) => {
    return get().favoritos.some((f) => f.id === id);
  },
}));
