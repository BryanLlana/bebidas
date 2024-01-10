import { defineStore } from "pinia"
import { computed, onMounted, ref, watch } from "vue"
import { useModalStore } from "./modal"
import { useBebidaStore } from "./bebidas"

const useFavoritoStore = defineStore('favorito', () => {
  const modalStore = useModalStore()
  const bebidaStore = useBebidaStore()
  const favoritos = ref([])

  onMounted(() => {
    const favoritosLS = localStorage.getItem('favoritos')
    if (favoritosLS) {
      favoritos.value = JSON.parse(favoritosLS)
    }
  })

  watch(favoritos, () => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
  }, {
    deep: true
  })

  const agregarFavorito = () => {
    if (favoritos.value.some(favorito => favorito.id === bebidaStore.receta.id)) {
      favoritos.value = favoritos.value.filter(favorito => favorito.id !== bebidaStore.receta.id)
    } else {
      favoritos.value.push(bebidaStore.receta)
    }
    modalStore.cambiarEstadoModal()
  } 

  const existeFavorito = computed(() => {
    return favoritos.value.some(favorito => favorito.id === bebidaStore.receta.id)
  })

  return {
    favoritos,
    agregarFavorito,
    existeFavorito
  } 
})

export {
  useFavoritoStore
}