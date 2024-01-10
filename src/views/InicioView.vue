<script setup>
  import Receta from '../components/Receta.vue'
  import { useBebidaStore } from '../stores/bebidas'
  const bebidaStore = useBebidaStore()

</script>

<template>
  <p v-if="bebidaStore.recetas.length <= 0" class="text-center text-lg">Busque recetas para listarlas aquí</p>
  <div v-else>
    <h1 class="text-5xl font-bold text-center uppercase mb-6">Recetas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <Receta :receta="receta" :key="receta.id" v-for="receta in bebidaStore.recetas" />
    </div>
  </div>
</template>