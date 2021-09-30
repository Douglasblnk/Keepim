<script setup>
import useAlert from '@/composables/use-alert';

const { isShowing, alertText, alertType } = useAlert();
</script>

<template>
  <RouterView />

  <PAlert
    :is-showing="isShowing"
    :type="alertType"
    :text="alertText"
  />
</template>

<style>
@import './styles/styles.css';
</style>
