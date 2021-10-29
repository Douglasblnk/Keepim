<script setup>
import { useRouter } from 'vue-router';
import useRequest from '@composables/use-request';
import useAlert from '@composables/use-alert';
import { setToken } from '@/utils/token';

const password = ref();
const user = ref();
const loading = ref(false);

const { useAxios } = useRequest();
const { setAlert } = useAlert();
const { replace } = useRouter();

const setErrorState = (error) => {
  setAlert({
    type: 'negative',
    text: error,
  });
};

const makeLogin = async() => {
  if (!password.value) return setErrorState('Por favor, digite suas credenciais.');

  loading.value = true;

  const { data, error } = await useAxios('auth')
    .post({
      data: {
        id: user.value,
        password: password.value,
      },
    });

  loading.value = false;

  if (!data && error) return setErrorState(error.data);

  setAlert({
    type: 'positive',
    text: 'Login efetuado com sucesso!',
    timeout: 1000,
  });

  setToken(data);

  setTimeout(() => replace('/home'), 1000);
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

      <div w:m="t-md">
        <Input
          v-model="user"
          type="text"
          placeholder="Usuário:"
          w:m="t-xl"
          @keydown.enter="makeLogin"
        />

        <Input
          v-model="password"
          type="password"
          placeholder="Senha:"
          w:m="t-md"
          @keydown.enter="makeLogin"
        />
      </div>
    </div>

    <div w:flex="1">
      <Button
        w:p="!8"
        icon="arrow-right"
        icon-size="lg"
        primary
        circle
        :loading="loading"
        @click="makeLogin"
      />
    </div>
  </div>
</template>
