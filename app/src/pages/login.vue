<script setup>
import { handleError } from '@/utils/handle-error'

const { notify } = useQuasar()
const { validate } = useForm()

const { replace } = useRouter()

const password = ref()
const username = ref()

const { isFetching, refetch } = useQuery({
  queryKey: [ 'sign-in', { password, username } ],
  queryFn: ({ queryKey }) => signIn(queryKey[1]),
  enabled: false,
  onSuccess: (data) => {
    notify({
      type: 'positive',
      message: 'Login efetuado com sucesso!',
      timeout: 1000,
    })
  },
  onError: (error) => {
    const err = handleError(error)

    notify({
      type: 'negative',
      message: err,
    })
  },
})

async function makeLogin() {
  const { valid } = await validate()

  if (!valid)
    return

  refetch()
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
      un-justify-start
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
        tabindex="1"
        :loading="isFetching"
      />

      <KInput
        v-model="password"
        type="password"
        label="Senha:"
        icon="i-mdi-lock-outline"
        vee-rules="required|min:8"
        name="senha"
        tabindex="2"
        :loading="isFetching"
        @keydown.enter="makeLogin"
      />

      <QBtn
        label="Acessar"
        color="primary"
        un-mt-sm
        no-caps
        :loading="isFetching"
        @click="makeLogin"
      />
    </div>

    <!-- <span
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
    </span> -->
  </div>
</template>

<route lang="yaml">
path: /login
meta:
  title: Entrar
</route>
