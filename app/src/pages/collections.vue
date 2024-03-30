<script setup lang="ts">
const { routeTransition } = useRouteTransition()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition
      :name="routeTransition"
      mode="out-in"
    >
      <KeepAlive exclude="[id]">
        <component
          :is="Component"
          un-mx-auto
        />
      </KeepAlive>
    </transition>
  </RouterView>
</template>

<route lang="yaml">
path: /colecoes
meta:
  title: Coleções
</route>
