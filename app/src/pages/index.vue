<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',

  setup() {

  },
});
</script>

<template>
  <div class="login">
    <div class="login__header">
      <PhottokeepTitle />

      <div class="login__input">
        <PInput
          placeholder="Senha:"
          class="mt-xl"
        />
      </div>
    </div>

    <div class="login__action">
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
@layer components {
  .login {
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
}
</style>
