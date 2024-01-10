import bebidaService from '@/services/bebidaService'
import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import { useModalStore } from './modal'

const useBebidaStore = defineStore('bebidas', () => {
  const modalStore = useModalStore()
  const categorias = ref([])
  const recetas = ref([])
  const busqueda = reactive({
    ingrediente: '',
    categoria: ''
  })
  const receta = ref({})

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

  const seleccionarReceta = async id => {
    const { data: { drinks } } = await bebidaService.obtenerReceta(id)
    receta.value = drinks.map(drink => {
      const ingredienteCantidadArray = []

      for (let i = 1; i <= 15; i++) {
        const ingredienteCantidad = {
          ingrediente: drink[`strIngredient${i}`],
          cantidad: drink[`strMeasure${i}`]
        }

        if (ingredienteCantidad.ingrediente) {
          ingredienteCantidadArray.push(ingredienteCantidad)
        }
      }

      return {
        id: drink.idDrink,
        nombre: drink.strDrink,
        instrucciones: drink.strInstructions,
        ingredientes: ingredienteCantidadArray,
        imagen: drink.strDrinkThumb
      }
    })[0]

    modalStore.cambiarEstadoModal()
  }

  return {
    categorias,
    busqueda,
    recetas,
    receta,
    seleccionarReceta,
    buscarRecetas
  }
})

export {
  useBebidaStore
}