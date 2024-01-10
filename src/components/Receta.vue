<script setup>
  import { useBebidaStore } from '../stores/bebidas'

  defineProps({
    receta: {
      type: Object,
      required: true
    }
  })

  const bebidaStore = useBebidaStore()
</script>

<template>
  <div class="bg-orange-400 shadow-lg rounded-lg">
    <div>
      <img :src="receta.imagen" :alt="`Imagen receta ${receta.nombre}`">
    </div>
    <div class="p-5">
      <h2 class="text-center font-bold text-2xl mb-3">{{ receta.nombre }}</h2>

      <div>
        <button @click="bebidaStore.seleccionarReceta(receta.id)" class="py-2 px-3 bg-orange-700 hover:bg-orange-600 transition-all text-white font-bold uppercase rounded-lg w-full">Ver Receta</button>
      </div>
    </div>
  </div>
</template>
