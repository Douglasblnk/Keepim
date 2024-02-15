<script setup lang="ts">
const props = defineProps<{
  callback: () => void
  photo: string
  isLoadingDeletion: boolean
}>()

const { close } = useDialog()

async function remove() {
  props.callback()
}

watch(() => props.isLoadingDeletion, (value) => {
  if (value === false)
    close()
})
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
      Tem certeza que deseja remover essa foto?
    </div>

    <QImg
      :src="photo"
      ratio="1"
      un-max-w-100px
      un-max-h-100px
      un-rounded-2xl
      un-shadow
      un-mt-sm
      un-mb-lg
    />

    <div
      un-flex
      un-gap-sm
    >
      <QBtn
        label="Remover"
        color="primary"
        :loading="isLoadingDeletion"
        @click="remove"
      />

      <QBtn
        label="Cancelar"
        color="cancel"
        :loading="isLoadingDeletion"
        @click="close"
      />
    </div>
  </div>
</template>
