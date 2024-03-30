<script setup lang="ts">
const { routeTransition } = useRouteTransition()
const route = useRoute()

const $q = useQuasar()

const isMobile = computed(() => $q.screen.width <= 768)

$q.iconMapFn = iconName => (iconName.startsWith('i-') ? { cls: iconName } : undefined)

$q.dark.set(true)

const bottomNavHiddenPattern = [
  'login',
  'profile',
  'collections-id',
]

const isDrawerShown = computed(() => {
  return route.name !== undefined && !isMobile.value && route.name !== 'login'
})

const isBottomNavHidden = computed(() => {
  return route.name !== undefined && !bottomNavHiddenPattern.includes(route.name as string) && isMobile.value
})

const isBackBtnShown = computed(() => {
  return route.name === 'collections'
})

const title = ref()

const navDrawer = ref()

const pagePadding = computed(() => {
  if (isMobile.value || route.name === 'login')
    return 'padding-left: 0'

  return navDrawer.value?.miniState ? 'padding-left: 90px' : 'padding-left: 300px'
})

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
provide('miniState', computed(() => navDrawer.value?.miniStateTransition))
</script>

<template>
  <QLayout view="lhr LpR lFr">
    <RouterView v-slot="{ Component }">
      <QPageContainer :style="pagePadding">
        <QPage un-flex="~ col grow">
          <NavDrawer
            ref="navDrawer"
            :model-value="isDrawerShown"
          />

          <Suspense>
            <transition
              :name="routeTransition"
              mode="out-in"
            >
              <component
                :is="Component"
                un-mx-auto
              />
            </transition>
          </Suspense>

          <Transition
            enter-active-class="transition-all duration-300 ease"
            leave-active-class="transition-all duration-300 ease"
            enter-from-class="opacity-0 translate-y-60"
            leave-to-class="opacity-0 translate-y-60"
            mode="out-in"
          >
            <BottomNav v-if="isBottomNavHidden" />
          </Transition>

          <QPageScroller
            v-if="isBackBtnShown"
            position="bottom-right"
            :scroll-offset="250"
            :offset="isMobile ? [18, 90] : [18, 18]"
          >
            <QBtn
              icon="i-mdi-arrow-up"
              un-bg="accent/60"
              un-rounded-full
              un-p-none
              round
            />
          </QPageScroller>
        </QPage>
      </QPageContainer>
    </RouterView>
  </QLayout>

  <GenericDialog />
</template>
