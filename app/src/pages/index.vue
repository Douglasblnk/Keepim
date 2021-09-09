<script>
import { defineComponent, ref } from 'vue';
import useRequest from '@composables/use-request';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const password = ref();
    const errorMsg = ref();
    const errorState = ref();
    const loading = ref(false);

    const { useAxios } = useRequest();

    const resetErrorState = () => {
      clearTimeout(errorState.value);

      errorState.value = setTimeout(() => {
        errorMsg.value = '';
      }, 4000);
    };

    const missingPassword = () => {
      errorMsg.value = 'Por favor, verifique sua senha!';

      resetErrorState();
    };

    const makeLogin = async() => {
      if (!password.value) return missingPassword();

      try {
        loading.value = true;
        const { data } = useAxios('auth');
        console.log('data :>> ', data);
      }
      catch (error) {

      }
    };

    return {
      makeLogin,
      password,
      errorMsg,
    };
  },
});
</script>

<template>
  <div class="login-page">
    <div class="login-page__header">
      <PhottokeepTitle />

      <div class="login-page__input">
        <PInput
          v-model="password"
          type="password"
          placeholder="Senha:"
          class="mt-xl"
          :error="errorMsg"
          @keydown.enter="makeLogin"
          @keypress="errorMsg && (errorMsg = '')"
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
        @click="makeLogin"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.login-page {
  @apply
    flex
    flex-col
    h-screen
    w-screen
    justify-around
    items-center;

  &__header {
    @apply
      flex
      flex-col
      flex-[4]
      justify-center;
  }

  &__action {
    @apply
      flex-1;
  }
}
</style>
