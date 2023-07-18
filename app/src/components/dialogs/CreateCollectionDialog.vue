<script setup lang="ts">
defineProps<{ isLoading?: boolean }>()

const { close, emit } = useDialog()

const collection = ref('')
const creationDate = ref('')
</script>

<template>
  <div
    un-flex="~ col"
    un-items-center
    un-gap-sm
  >
    <QIcon
      name="i-mdi-folder-plus"
      size="xl"
    />

    <span un-title>Criar coleção</span>
  </div>

  <div
    un-mt-xl
    un-space-y-sm
  >
    <label un-font-bold>Nome da coleção:</label>

    <KInput
      v-model="collection"
      placeholder="Coleção..."
    />
  </div>

  <div un-space-y-sm>
    <label un-font-bold>Data da criação:</label>

    <KInputDate
      v-model="creationDate"
    />
  </div>

  <div
    un-mt-md
    un-flex
    un-items-center
    un-gap-sm
  >
    <QBtn
      label="Cancelar"
      color="cancel"
      un-w-full
      :disable="isLoading"
      @click="close"
    />

    <QBtn
      label="Criar"
      color="primary"
      un-w-full
      :loading="isLoading"
      @click="emit('on-create', { collection, creationDate })"
    />
  </div>
</template>
