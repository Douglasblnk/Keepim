<script setup>
import { ref } from 'vue';
import useRequest from '@composables/use-request';

const password = ref();
const user = ref();
const error = ref('');
const errorState = ref();
const loading = ref(false);

const { useAxios } = useRequest();

const resetErrorState = () => {
  clearTimeout(errorState.value);

  errorState.value = setTimeout(() => {
    error.value = '';
  }, 4000);
};

const missingPassword = () => {
  error.value = 'Incorrect credentials, please, try again.';

  resetErrorState();
};

const makeLogin = async() => {
  if (!password.value) return missingPassword();

  try {
    loading.value = true;

    const { data } = await useAxios('auth')
      .post({
        headers: { token: '1234567890' },
        data: { user: user.value, password: password.value },
      });
  }
  catch (error) {
    console.log('error makeLogin :>> ', error);
  }
  finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    w:flex="~ col"
    w:h="screen"
    w:w="screen"
    w:justify="around"
    w:align="items-center"
  >
    <div
      w:flex="~ col [4]"
      w:justify="center"
    >
      <PhotoKeepTitle />

      <div class="login-page__input">
        <PInput
          v-model="user"
          type="text"
          placeholder="Usuário:"
          w:m="t-xl"
          @keydown.enter="makeLogin"
          @keypress="error && (error = '')"
        />

        <PInput
          v-model="password"
          type="password"
          placeholder="Senha:"
          w:m="t-md"
          @keydown.enter="makeLogin"
          @keypress="error && (error = '')"
        />
      </div>
    </div>

    <div w:flex="1">
      <PButton
        w:p="8"
        icon="arrow-right"
        icon-size="lg"
        primary
        circle
        :loading="loading"
        @click="makeLogin"
      />
    </div>

    <PAlert
      type="negative"
      :is-showing="!!error"
      :text="error"
    />
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
