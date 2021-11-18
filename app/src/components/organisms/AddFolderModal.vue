<script setup>
import useAlert from '@composables/use-alert';
import useRequest from '@/composables/use-request';
import { getToken } from '@/utils/token';

const emit = defineEmits(['close']);

const { setAlert } = useAlert();
const { useAxios } = useRequest();

const folderName = ref();
const folderDate = ref();
const images = ref([]);

const addImages = (imgs) => {
  images.value = [...imgs];
};

const closeModal = () => {
  images.value = [];

  emit('close');
};

const validateSubmission = () => {
  if (!folderName.value || !folderDate.value) return false;

  return true;
};

const createFolder = async() => {
  const payload = {
    data: {
      name: folderName.value,
      date: folderDate.value,
    },
    headers: {
      token: `Bearer ${getToken()}`,
    },
  };

  const { data, error } = await useAxios('folder').post(payload);

  if (error && error.status !== 200) {
    return setAlert({
      type: 'negative',
      text: error.data,
    });
  }

  setAlert({
    type: 'positive',
    text: data.msg,
  });

  closeModal();
};

const confirm = async() => {
  const isValid = validateSubmission();

  if (!isValid) {
    return setAlert({
      type: 'negative',
      text: 'Preencha os campos corretamente!',
      timeout: 3000,
    });
  }

  await createFolder();
};

</script>

<template>
  <div
    class="add-folder-modal"
    w:w="90vw md:500px"
    w:p="x-lg y-lg"
    w:bg="ascendent"
    w:rounded="md"
  >
    <div
      w:flex="~ col"
      w:align="items-center"
    >
      <FIcon
        icon="folder-plus"
        size="3x"
        w:text="white"
      />

      <p
        w:text="medium white"
        w:m="t-md"
      >
        Adicionar pasta
      </p>
    </div>

    <div
      w:flex="~ col"
      w:m="t-xl"
      w:p="x-sm"
    >
      <Input
        v-model="folderName"
        label="Nome da pasta:"
        placeholder="Digite o nome da pasta"
        w:w="full"
        light
      />

      <Input
        v-model="folderDate"
        label="Data:"
        w:m="y-lg"
        w:w="10/12"
        type="date"
        light
      />

      <p w:text="white">
        Adicionar imagens
      </p>

      <Uploader
        @inserted="addImages"
      />
    </div>

    <div
      w:w="full"
      w:flex="~"
      w:justify="center"
      w:m="t-xl"
    >
      <Button
        label="Cancelar"
        w:bg="!gray-500"
        w:m="x-xs"
        flat
        unelevated
        @click="closeModal"
      />

      <Button
        label="Adicionar"
        w:m="x-xs"
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
