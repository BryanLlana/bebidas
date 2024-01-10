import { defineStore } from "pinia"
import { ref } from "vue"

const useModalStore = defineStore('modal', () => {
  const modal = ref(false)

  const cambiarEstadoModal = () => {
    modal.value = !modal.value
  }

  return {
    modal, 
    cambiarEstadoModal
  }
})

export {
  useModalStore
}