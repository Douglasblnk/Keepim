<script setup>
import useAlert from '@/composables/use-alert';

const { isShowing, alertText, alertType } = useAlert();
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

  <PAlert
    :is-showing="isShowing"
    :type="alertType"
    :text="alertText"
  />

  <PBottomNav />
</template>

<style>
@import './styles/styles.css';
@import './styles/transitions.css';
</style>
