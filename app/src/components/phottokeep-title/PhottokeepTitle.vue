<template>
  <h1 class="phottokeep-title">
    PhotoKeep
  </h1>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="postcss">
.phottokeep-title {
  @apply
    !font-black
    text-3xl;

  background: linear-gradient(90deg, #6F95AA -1.12%, #A4C1E4 100%) !important;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
