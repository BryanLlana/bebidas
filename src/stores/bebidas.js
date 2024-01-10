import bebidaService from '@/services/bebidaService'
import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue'

const useBebidaStore = defineStore('bebidas', () => {
  const categorias = ref([])
  const recetas = ref([])
  const busqueda = reactive({
    ingrediente: '',
    categoria: ''
  })

  onMounted(async () => {
    const { data : { drinks }} = await bebidaService.obtenerCategorias()
    categorias.value = drinks.map(drink => ({ nombreCategoria: drink.strCategory }))
  })

  const buscarRecetas = async () => {
    const { data: { drinks }} = await bebidaService.obtenerRecetas(busqueda.ingrediente, busqueda.categoria)
    recetas.value = drinks.map(drink => ({
      id: drink.idDrink,
      nombre: drink.strDrink,
      imagen: drink.strDrinkThumb
    }))
  }

  return {
    categorias,
    busqueda,
    recetas,
    buscarRecetas
  }
})

export {
  useBebidaStore
}