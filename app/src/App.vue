<script setup>
import { useRoute } from 'vue-router'

const { routeTransition } = useRouteTransition()

const $q = useQuasar()

const route = useRoute()
const title = ref()

$q.iconMapFn = iconName => (iconName.startsWith('i-') ? { cls: iconName } : undefined)

$q.dark.set(true)

const isBottomNavHidden = computed(() => {
  const { name } = useRoute()

  return name !== undefined && name !== 'login'
})

watch(
  () => route.meta,
  (meta) => {
    console.log(meta)
    title.value = meta.title ? ` - ${meta.title}` : ''
  },
)

useHead({
  title: computed(() => `Keepim ${title.value || ''}`),
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <transition
        :name="routeTransition"
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
