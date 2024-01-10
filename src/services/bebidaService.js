import api from "@/config/api"

const bebidaService = {
  obtenerCategorias: () => {
    return api.get('/list.php?c=list')
  },
  obtenerRecetas: (ingrediente, categoria) => {
    return api.get(`/filter.php?c=${categoria}&i=${ingrediente}`)
  }
}

export default bebidaService