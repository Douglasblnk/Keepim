<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',

  setup() {

  },
});
</script>

<template>
  <div class="login-page">
    <div class="login-page__header">
      <PhottokeepTitle />

      <div class="login-page__input">
        <PInput
          placeholder="Senha:"
          class="mt-xl"
        />
      </div>
    </div>

    <div class="login-page__action">
      <PButton
        class="p-8"
        icon="arrow-right"
        icon-size="lg"
        primary
        circle
      />
    </div>
  </div>
</template>

<style lang="postcss">
.login-page {
  @apply
    w-screen
    h-screen
    flex
    flex-col
    justify-around
    items-center;

  &__header {
    @apply
      flex
      flex-col
      justify-center
      flex-[4];
  }

  &__action {
    @apply
      flex-1;
  }
}

</style>
