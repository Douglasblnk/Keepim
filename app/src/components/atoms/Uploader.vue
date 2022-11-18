<script setup>
const emit = defineEmits(['inserted']);

const fileRef = ref(null);
const filesList = ref([]);
const filesBlob = ref([]);

const reducedImagesBlob = computed(() => {
  const copiedImagesBlob = [...filesBlob.value];

  return copiedImagesBlob.splice(0, 5);
});

const createFilesBlob = (files) => {
  filesBlob.value = [];

  for (const file of files)
    filesBlob.value.push(URL.createObjectURL(file));
};

const addFile = (event) => {
  const { files } = event.target;

  if (!files.length) return;

  filesList.value = [...files];

  createFilesBlob(files);

  emit('inserted', files);
};

const openFileExplorer = () => {
  fileRef.value.click();
};
</script>

<template>
  <div
    un-flex="~ col"
    un-align="items-center"
    un-w="full"
    un-h="auto"
    un-border="white dashed ~"
    un-rounded="md"
    un-p="md"
    un-m="t-sm"
    un-cursor="pointer"
    @click="openFileExplorer"
  >
    <template v-if="!filesList.length">
      <FIcon
        icon="cloud-upload-alt"
        size="3x"
        un-text="white"
      />

      <p
        un-m="t-sm"
        un-text="white center"
        un-select="none"
      >
        Arraste ou clique para fazer o upload
      </p>
    </template>

    <div
      v-else
      un-flex="~"
      un-w="full"
    >
      <Img
        v-for="(image, index) in reducedImagesBlob"
        class="add-folder-modal__img"
        un-w="50px"
        ratio="1"
        rounded
        elevated
        :key="`image-blob-${index}`"
        :url="image"
      />

      <div
        v-if="filesBlob.length > 5"
        class="add-folder-modal__img"
        un-w="50px"
        un-h="50px"
        un-flex="~"
        un-justify="center"
        un-align="items-center"
        un-rounded="full"
        un-bg="gray-500"
        un-z="marginals"
      >
        <p un-text="white">
          + {{ filesBlob.length - 5 }}
        </p>
      </div>
    </div>

    <input
      ref="fileRef"
      un-display="hidden"
      type="file"
      accept="image/png, image/jpeg"
      multiple
      @change="addFile"
    />
  </div>
</template>
