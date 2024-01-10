<script setup>
  import { useFavoritoStore } from '@/stores/favoritos'
  import Receta from '@/components/Receta.vue';
  const favoritoStore = useFavoritoStore()
</script>

<template>
  <p v-if="favoritoStore.favoritos.length <= 0" class="text-center text-lg">No hay favoritos</p>
  <div v-else>
    <h1 class="text-5xl font-bold text-center uppercase mb-6">Favoritos</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <Receta :receta="receta" :key="receta.id" v-for="receta in favoritoStore.favoritos" />
    </div>
  </div>
</template>