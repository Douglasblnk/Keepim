<script setup>
import { useRouter } from 'vue-router'
import useAxios from '@composables/use-axios'
import useAlert from '@composables/use-alert'
import { setToken } from '@/utils/token'

const password = ref()
const username = ref()
const loading = ref(false)

const { Post } = useAxios()
const { setAlert } = useAlert()
const { replace } = useRouter()

const setErrorState = (error) => {
  setAlert({
    type: 'negative',
    text: error,
  })
}

const makeLogin = async () => {
  if (!password.value)
    return setErrorState('Por favor, digite suas credenciais.')

  loading.value = true

  const { data, error } = await Post('sign-in').data({
    username: username.value.toLowerCase(),
    password: password.value,
  })

  loading.value = false

  if (!data && error)
    return setErrorState(error.data)

  setAlert({
    type: 'positive',
    text: 'Login efetuado com sucesso!',
    timeout: 1000,
  })

  setToken(data)

  setTimeout(() => replace('/home'), 1000)
}
</script>

<template>
  <div
    un-flex="~ col"
    un-h="screen"
    un-w="screen"
    un-justify="around"
    un-align="items-center"
  >
    <div
      un-flex="~ col [4]"
      un-justify="center"
    >
      <PhotoKeepTitle />

      <div un-m="t-md">
        <Input
          v-model="username"
          type="text"
          placeholder="Usuário:"
          un-m="t-xl"
          @keydown.enter="makeLogin"
        />

        <Input
          v-model="password"
          type="password"
          placeholder="Senha:"
          un-m="t-md"
          @keydown.enter="makeLogin"
        />
      </div>
    </div>

    <div un-flex="1">
      <Button
        un-p="md"
        icon="arrow-right"
        icon-size="lg"
        primary
        circle
        label="poxa vida"
        :loading="loading"
        @click="makeLogin"
      />
    </div>
  </div>
</template>
