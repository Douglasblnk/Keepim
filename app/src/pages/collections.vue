<script setup lang="ts">
const { routeTransition } = useRouteTransition()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition
      :name="routeTransition"
      mode="out-in"
    >
      <component
        :is="Component"
        un-mx-auto
      />
    </transition>
  </RouterView>
</template>

<route lang="yaml">
path: /colecoes
meta:
  title: Coleções
</route>
