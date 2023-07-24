<script setup lang="ts">
import { useForm } from 'vee-validate'
import { notify } from '@/utils'
import { getErrorMsg } from '@/utils/handle-error'

const { validate } = useForm()
const { close } = useDialog()

const collection = ref('')
const creationDate = ref('')
const isLoading = ref(false)

async function createCollection() {
  const { valid } = await validate()

  if (!valid)
    return

  isLoading.value = true

  try {
    const response = await createCollectionRequest({
      collectionName: collection.value,
      collectionDate: creationDate.value,
    })

    if (!response)
      return

    await notify({
      type: 'positive',
      message: 'Coleção criada com sucesso!',
      timeout: 800,
    })

    close()
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
      vee-rules="required"
      name="coleção"
      placeholder="Coleção..."
    />
  </div>

  <div un-space-y-sm>
    <label un-font-bold>Data da criação:</label>

    <KInputDate
      v-model="creationDate"
      name="data"
      vee-rules="required"
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
      @click="createCollection"
    />
  </div>
</template>
