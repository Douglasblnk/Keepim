<script setup lang="ts">
const { replace } = useRouter()
const { deleteStorageState } = useLocalStorage()

const confirmLogout = ref(false)
const timeout: Ref<NodeJS.Timeout | null> = ref(null)

function preLogout() {
  confirmLogout.value = true

  timeout.value = setTimeout(() => {
    confirmLogout.value = false
  }, 2000)
}

async function logout() {
  clearTimeout(timeout.value!)

  const response = await signOutRequest()

  if (response) {
    deleteStorageState('user-info')
    replace('/login')
  }
}
</script>

<template>
  <KLayoutPage default-header="Perfil">
    <div
      un-grow
      un-flex="~ col"
    >
      <KInfoUser un-mt-lg />
      <KInfoUser un-mt-lg />
      <KInfoUser un-mt-lg />
      <KInfoUser un-mt-lg />
      <KInfoUser un-mt-lg />
      <KInfoUser un-mt-lg />
      <KInfoUser un-mt-lg />

      <ConfigButton
        title="Editar perfil"
        description="Altere suas informações de perfil"
        icon="i-mdi-account-outline"
        color="bg-#6A5590"
        un-mt-lg
      />

      <ConfigButton
        title="Sistema"
        description="Configure o tema da aplicação"
        icon="i-mdi-cog-outline"
        color="bg-#6D9ABB"
        un-mt-sm
      />

      <div
        un-flex="~ col-reverse"
        un-w-full
        un-flex-grow
      >
        <Transition
          name="fade-100"
          mode="out-in"
        >
          <ConfigButton
            v-if="!confirmLogout"
            title="Sair do sistema"
            icon="i-mdi-logout"
            color="bg-negative"
            un-mt-lg
            un-w-full
            @click="preLogout"
          />

          <ConfigButton
            v-else
            title="Confirmar saída?"
            icon="i-mdi-check"
            color="bg-positive"
            un-mt-lg
            un-w-full
            show-progress-bar
            @click="logout"
          />
        </Transition>
      </div>
    </div>
  </KLayoutPage>
</template>

<route lang="yaml">
path: /configuracoes
meta:
  title: Configurações
  transition: slide-up
  backTransition: slide-down-back
</route>
