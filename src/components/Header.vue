<script setup>
  import Alerta from './Alerta.vue'
  import { RouterLink, useRoute } from 'vue-router'
  import { computed, ref } from 'vue'
  import { useBebidaStore } from '../stores/bebidas'
  
  const bebidaStore = useBebidaStore()
  const route = useRoute()
  const error = ref('')

  const paginaInicio = computed(() => {
    return route.name === 'inicio'
  })

  const validarBusqueda = async () => {
    if (Object.values(bebidaStore.busqueda).includes('')) {
      error.value = 'Todos los campos son obligatorios'

      setTimeout(() => {
        error.value = ''
      }, 3000)

      return
    }

    await bebidaStore.buscarRecetas()
  }

</script>

<template>
  <header class="bg-slate-800" :class="{ header: paginaInicio }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink to="/">
            <img class="w-32" src="/img/logo.svg" alt="Logotipo" />
          </RouterLink>
        </div>
        <nav class="flex gap-4">
          <RouterLink :to="{ name: 'inicio' }" class="text-white uppercase font-bold">
            Inicio
          </RouterLink>
          <RouterLink :to="{ name: 'favoritos' }" class="text-white uppercase font-bold">
            Favoritos
          </RouterLink>
        </nav>
      </div>
      <form @submit.prevent="validarBusqueda" v-if="paginaInicio" class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
        <Alerta v-if="error">{{ error }}</Alerta>
        <div class="space-y-4">
          <label for="ingrediente" class="block text-white uppercase font-extrabold text-lg">
            Nombre o Ingredientes
          </label>
          <input v-model="bebidaStore.busqueda.ingrediente" id="ingrediente" type="text" class="p-3 w-full rounded-lg focus:outline-none" placeholder="Ej: Vodka, Tequila, etc">
        </div>
        <div class="space-y-4">
          <label for="categoria" class="block text-white uppercase font-extrabold text-lg">
            Categoría
          </label>
          <select v-model="bebidaStore.busqueda.categoria" id="categoria" class="p-3 w-full rounded-lg focus:outline-none">
            <option value="">--Seleccione--</option>
            <option v-for="categoria in bebidaStore.categorias" :value="categoria.nombreCategoria">{{ categoria.nombreCategoria }}</option>
          </select>
        </div>

        <input type="submit" value="Buscar Recetas" class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase">
      </form>
    </div>
  </header>
</template>

<style>
  .header {
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
  }
</style>
