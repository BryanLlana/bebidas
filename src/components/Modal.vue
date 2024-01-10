<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useModalStore } from '../stores/modal'
import { useBebidaStore } from '@/stores/bebidas'
import { useFavoritoStore } from '@/stores/favoritos'

const modalStore = useModalStore()
const bebidaStore = useBebidaStore()
const favoritoStore = useFavoritoStore()
</script>

<template>
  <TransitionRoot as="template" :show="modalStore.modal">
    <Dialog as="div" class="relative z-10" @close="modalStore.cambiarEstadoModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <div>
                <div class="mt-3">
                  <DialogTitle as="h2" class="text-gray-900 text-4l font-extrabold my-5">
                    {{ bebidaStore.receta.nombre }}
                  </DialogTitle>
                  <img :src="bebidaStore.receta.imagen" :alt="`Imagen ${bebidaStore.receta.nombre}`">
                  <DialogTitle as="h2" class="text-gray-900 text-4l font-extrabold my-5">
                    Ingrendientes y Cantidades
                  </DialogTitle>
                  <p v-for="ingrediente in bebidaStore.receta.ingredientes" class="text-lg text-gray-500">
                    {{ ingrediente.ingrediente }} - {{ ingrediente.cantidad }}
                  </p>
                  <DialogTitle as="h2" class="text-gray-900 text-4l font-extrabold my-5">
                    Instrucciones
                  </DialogTitle>
                  <p class="text-lg text-gray-500">
                    {{ bebidaStore.receta.instrucciones }}
                  </p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button @click="modalStore.cambiarEstadoModal" type="button" class="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500">Cerrar</button>
                <button @click="favoritoStore.agregarFavorito" type="button" class="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500">{{ favoritoStore.existeFavorito ? 'Eliminar Favorito' : 'Agregar Favorito' }}</button>
              </div>
            </DialogPanel>
          </TransitionChild>
      </div>
    </div>
  </Dialog>
</TransitionRoot></template>