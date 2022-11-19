<script setup>
import { useRoute } from 'vue-router'

const $q = useQuasar()

$q.iconMapFn = iconName => (iconName.startsWith('i-') ? { cls: iconName } : undefined)

$q.dark.set(true)

const isBottomNavHidden = computed(() => {
  const { name } = useRoute()

  return name !== undefined && name !== 'login'
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </Suspense>
  </RouterView>

  <transition
    name="fade"
    mode="out-in"
  >
    <BottomNav v-if="isBottomNavHidden" />
  </transition>
</template>
