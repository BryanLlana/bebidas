import api from "@/config/api"

const bebidaService = {
  obtenerCategorias: () => {
    return api.get('/list.php?c=list')
  }
}

export default bebidaService