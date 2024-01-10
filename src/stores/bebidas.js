import bebidaService from '@/services/bebidaService'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

const useBebidaStore = defineStore('bebidas', () => {
  const categorias = ref([])

  onMounted(async () => {
    const { data : { drinks }} = await bebidaService.obtenerCategorias()
    categorias.value = drinks.map(drink => ({ nombreCategoria: drink.strCategory }))
  })

  return {
    categorias
  }
})

export {
  useBebidaStore
}