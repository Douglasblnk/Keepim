<script setup lang="ts">
import { getErrorMsg, notify } from '@/utils'

const { collection } = storeToRefs(useCollectionStore())

const { push } = useRouter()
const { close } = useDialog()

const queryClient = useQueryClient()

const { mutate, isPending } = useMutation({
  mutationFn: deleteCollectionRequest,
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
        message: 'Coleção atualizada com sucesso!',
        timeout: 800,
      })

      await queryClient.invalidateQueries({ queryKey: [ 'collections-list' ], type: 'all' })

      push({ path: '/colecoes' })
    }
  },
})

async function remove() {
  mutate(collection?.value?.id || '')
}
</script>

<template>
  <div
    un-flex="~ col"
    un-items-center
    un-justify-center
  >
    <div
      un-title
      un-text-center
    >
      Tem certeza que deseja excluir a coleção?
    </div>

    <div
      un-text-center
      un-my-xl
    >
      Esta ação não poderá ser desfeita e todas as fotos da coleção serão removidas.
    </div>

    <div
      un-flex
      un-gap-sm
    >
      <QBtn
        label="Excluir"
        color="primary"
        :loading="isPending"
        @click="remove"
      />

      <QBtn
        label="Cancelar"
        color="cancel"
        :loading="isPending"
        @click="close"
      />
    </div>
  </div>
</template>
