<script setup lang="ts">
import { useForm } from 'vee-validate'
import { notify } from '@/utils'
import { getErrorMsg } from '@/utils/handle-error'

const { validate } = useForm()
const { close } = useDialog()
const { push } = useRouter()

const collection = ref('')
const creationDate = ref('')

const queryClient = useQueryClient()

const {
  mutate,
  isLoading,
} = useMutation({
  mutationFn: createCollectionRequest,
  onError: (error) => {
    notify({
      type: 'negative',
      message: getErrorMsg(error) as string,
    })
  },
  onSuccess: async (data) => {
    if (data !== undefined) {
      await notify({
        type: 'positive',
        message: 'Coleção criada com sucesso!',
        timeout: 800,
      })

      close()

      queryClient.invalidateQueries({ queryKey: [ 'collections-count' ], type: 'all' })
      queryClient.invalidateQueries({ queryKey: [ 'collections-list' ], type: 'all' })

      push({
        path: `/colecoes/${data.id}`,
      })
    }
  },
})

async function createCollection() {
  const { valid } = await validate()

  if (!valid)
    return

  mutate({
    collectionName: collection.value,
    collectionDate: creationDate.value,
  })
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
    <label un-font-bold>Data da coleção:</label>

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
