<script setup>
import { useRouter } from 'vue-router'
// import { setToken } from '@/utils/token'

const { notify } = useQuasar()
const { validate } = useForm()

const {
  execute,
  onDone,
  onError,
} = useRequest(SIGN_IN)

const { replace } = useRouter()
// const { setUserState } = useState()

const password = ref()
const username = ref()

onDone((data) => {
  console.log('data :>> ', data)

  setTimeout(() => replace('/home'), 1000)

  // setToken(data)
  // setUserState(data)

  notify({
    type: 'positive',
    message: 'Login efetuado com sucesso!',
    timeout: 1000,
  })
})

onError((error) => {
  console.log('error :>> ', error)
  notify({
    type: 'negative',
    message: error.value?.message,
    timeout: 1000,
  })
})

const makeLogin = async () => {
  const { valid } = await validate()

  if (!valid) {
    return
  }

  execute({
    username: username.value.toLowerCase(),
    password: password.value,
  })
}
</script>

<template>
  <div
    un-flex="~ col"
    un-h-screen
    un-mx-auto
    un-w="sm:col-6 md:col-4 80vw"
  >
    <div
      un-flex="~ col [2]"
      un-justify-center
      un-items-center
    >
      <KeepimTitle
        un-py-5xl
      />
    </div>

    <div un-flex="~ col [2]">
      <KInput
        v-model="username"
        type="text"
        name="usuário"
        label="Usuário:"
        icon="i-mdi-email-outline"
        vee-rules="required"
        @keydown.enter="makeLogin"
      />

      <KInput
        v-model="password"
        type="password"
        label="Senha:"
        icon="i-mdi-lock-outline"
        vee-rules="required|min:8"
        name="senha"
        @keydown.enter="makeLogin"
      />
    </div>

    <div un-flex="1">
      <QBtn
        label="Acessar"
        color="primary"
        un-w-full
        no-caps
        @click="makeLogin"
      />
    </div>
  </div>
</template>

<route lang="yaml">
path: /login
meta:
  title: Entrar
</route>
