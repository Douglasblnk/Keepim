<script setup>
import useAlert from '@composables/use-alert'
import useRequest from '@/composables/use-requestst'
import { getToken } from '@/utils/token'

const emit = defineEmits([ 'close' ])

const { setAlert } = useAlert()
const { useAxios } = useRequest()

const folderName = ref()
const folderDate = ref()
const images = ref([])

const addImages = (imgs) => {
  images.value = [ ...imgs ]
}

const closeModal = () => {
  images.value = []

  emit('close')
}

const validateSubmission = () => {
  if (!folderName.value || !folderDate.value) { return false }

  return true
}

const createFolder = async () => {
  const payload = {
    data: {
      name: folderName.value,
      date: folderDate.value,
    },
    headers: {
      token: `Bearer ${getToken()}`,
    },
  }

  const { data, error } = await useAxios('folder').post(payload)

  if (error && error.status !== 200) {
    return setAlert({
      type: 'negative',
      text: error.data,
    })
  }

  setAlert({
    type: 'positive',
    text: data.msg,
  })

  closeModal()
}

const confirm = async () => {
  const isValid = validateSubmission()

  if (!isValid) {
    return setAlert({
      type: 'negative',
      text: 'Preencha os campos corretamente!',
      timeout: 3000,
    })
  }

  await createFolder()
}
</script>

<template>
  <div
    class="add-folder-modal"
    un-w="90vw md:500px"
    un-p="x-lg y-lg"
    un-bg="accent"
    un-rounded="md"
  >
    <div
      un-flex="~ col"
      un-align="items-center"
    >
      <FIcon
        icon="folder-plus"
        size="3x"
        un-text="white"
      />

      <p
        un-text="medium white"
        un-m="t-md"
      >
        Adicionar pasta
      </p>
    </div>

    <div
      un-flex="~ col"
      un-m="t-xl"
      un-p="x-sm"
    >
      <Input
        v-model="folderName"
        label="Nome da pasta:"
        placeholder="Digite o nome da pasta"
        un-w="full"
        light
      />

      <Input
        v-model="folderDate"
        label="Data:"
        un-m="y-lg"
        un-w="10/12"
        type="date"
        light
      />

      <p un-text="white">
        Adicionar imagens
      </p>

      <Uploader
        @inserted="addImages"
      />
    </div>

    <div
      un-w="full"
      un-flex="~"
      un-justify="center"
      un-m="t-xl"
    >
      <Button
        label="Cancelar"
        un-bg="!gray-500"
        un-m="x-xs"
        flat
        unelevated
        @click="closeModal"
      />

      <Button
        label="Adicionar"
        un-m="x-xs"
        primary
        flat
        unelevated
        @click="confirm"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.add-folder-modal {
  &__img {
    &:not(:first-child) {
      @apply
        -ml-sm
    }
  }
}
</style>
