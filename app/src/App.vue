<script setup>
import { useRoute } from 'vue-router'
import useAlert from '@/composables/use-alert'

const { isShowing, alertText, alertType } = useAlert()

const isBottomNavHidden = computed(() => {
  const { name } = useRoute()

  return name !== 'index'
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

  <Alert
    :is-showing="isShowing"
    :type="alertType"
    :text="alertText"
  />

  <transition
    name="fade"
    mode="out-in"
  >
    <BottomNav v-if="isBottomNavHidden" />
  </transition>
</template>
