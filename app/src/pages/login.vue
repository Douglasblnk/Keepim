<script setup>
import { useRouter } from 'vue-router'

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

async function makeLogin() {
  const { valid } = await validate()

  if (!valid)
    return

  execute({
    username: username.value.toLowerCase(),
    password: password.value,
  })
}
</script>

<template>
  <div
    un-w="sm:col-7 md:col-5 lg:col-3"
    un-m-auto
    un-flex="~ col"
    un-h-screen
  >
    <KeepimTitle
      un-py-5xl
      un-flex-grow
    />

    <div
      un-flex="~ col"
      un-flex-grow
      un-justify-center
      un-px-md
    >
      <div
        un-mb-6xl
        un-text-center
      >
        <span un-text="white 2xl">
          Acesse sua conta
        </span>
      </div>

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

      <QBtn
        label="Acessar"
        color="primary"
        un-mt-sm
        no-caps
        @click="makeLogin"
      />
    </div>

    <span
      un-flex-grow
      un-text-gray-text
      un-flex
      un-w-full
      un-justify-center
      un-items-end
      un-py-md
    >
      Não possui uma conta ainda?

      <span
        un-ml-xs
        un-text-secondary
        un-cursor-pointer
      >
        <RouterLink to="/registrar">
          Cadastre-se
        </RouterLink>
      </span>
    </span>
  </div>
</template>

<route lang="yaml">
path: /login
meta:
  title: Entrar
</route>
