<script setup lang="ts">
import { notify } from '@utils/index'
import { getErrorMsg } from '@/utils/handle-error'

const { validate } = useForm()
const { setStorageState } = useLocalStorage()
const { replace } = useRouter()

const password = ref()
const username = ref()
const isLoading = ref(false)

async function makeLogin() {
  isLoading.value = true

  try {
    const { valid } = await validate()

    if (!valid)
      return

    const response = await signInRequest({
      password: password.value,
      username: username.value,
    })

    setStorageState('user-info', response)

    notify({
      type: 'positive',
      message: 'Login efetuado com sucesso!',
      timeout: 1000,
    })

    replace('/')
  }

  catch (error) {
    notify({
      type: 'negative',
      message: getErrorMsg(error) as string,
    })
  }

  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <KLayoutPage>
    <KeepimTitle
      title="Keepim"
      show-slogan
      un-py-5xl
      un-flex-grow
    />

    <div
      un-flex="~ col"
      un-flex-grow
      un-justify-start
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
        :loading="isLoading"
      />

      <KInput
        v-model="password"
        type="password"
        label="Senha:"
        icon="i-mdi-lock-outline"
        vee-rules="required|min:8"
        name="senha"
        tabindex="2"
        :loading="isLoading"
        @keydown.enter="makeLogin"
      />

      <QBtn
        label="Acessar"
        color="primary"
        un-mt-sm
        :loading="isLoading"
        @click="makeLogin"
      />
    </div>

    <div
      un-text-gray-text
      un-flex="~ col"
      un-w-full
      un-items-center
      un-py-md
    >
      <span>Não possui uma conta ainda?</span>

      <span
        un-ml-xs
        un-text-secondary
        un-cursor-pointer
      >
        <!-- <RouterLink to="/registrar">
          Cadastre-se
        </RouterLink> -->
      </span>
    </div>
  </KLayoutPage>
</template>

<route lang="yaml">
path: /login
meta:
  title: Entrar
</route>
