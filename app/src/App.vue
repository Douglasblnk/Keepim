<script setup lang="ts">
const { routeTransition } = useRouteTransition()
const route = useRoute()

const $q = useQuasar()

const isMobile = computed(() => $q.screen.width <= 768)

$q.iconMapFn = iconName => (iconName.startsWith('i-') ? { cls: iconName } : undefined)

$q.dark.set(true)

const bottomNavHiddenPattern = [
  'login',
  'configuration',
]

const isDrawerShown = computed(() => {
  return route.name !== undefined && !isMobile.value && route.name !== 'login'
})

const isBottomNavHidden = computed(() => {
  return route.name !== undefined && !bottomNavHiddenPattern.includes(route.name as string) && isMobile.value
})

const title = ref()

watch(
  () => route.meta,
  (meta) => {
    title.value = meta.title ? ` - ${meta.title}` : ''
  },
)

useHead({
  title: computed(() => `Keepim ${title.value || ''}`),
})

provide('isMobile', isMobile)
</script>

<template>
  <QLayout view="lhr LpR lFr">
    <RouterView v-slot="{ Component }">
      <QPageContainer>
        <QPage un-flex="~ col grow">
          <NavDrawer :model-value="isDrawerShown" />

          <Suspense>
            <transition
              :name="routeTransition"
              mode="out-in"
            >
              <component :is="Component" />
            </transition>
          </Suspense>

          <Transition
            name="slide-up"
            mode="out-in"
          >
            <BottomNav v-if="isBottomNavHidden" />
          </Transition>
        </QPage>
      </QPageContainer>
    </RouterView>
  </QLayout>

  <GenericDialog />
</template>
