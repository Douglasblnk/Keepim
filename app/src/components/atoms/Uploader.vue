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
    w:flex="~ col"
    w:align="items-center"
    w:w="full"
    w:h="auto"
    w:border="white dashed ~"
    w:rounded="md"
    w:p="md"
    w:m="t-sm"
    w:cursor="pointer"
    @click="openFileExplorer"
  >
    <template v-if="!filesList.length">
      <FIcon
        icon="cloud-upload-alt"
        size="3x"
        w:text="white"
      />

      <p
        w:m="t-sm"
        w:text="white center"
        w:select="none"
      >
        Arraste ou clique para fazer o upload
      </p>
    </template>

    <div
      v-else
      w:flex="~"
      w:w="full"
    >
      <Img
        v-for="(image, index) in reducedImagesBlob"
        class="add-folder-modal__img"
        w:w="50px"
        ratio="1"
        rounded
        elevated
        :key="`image-blob-${index}`"
        :url="image"
      />

      <div
        v-if="filesBlob.length > 5"
        class="add-folder-modal__img"
        w:w="50px"
        w:h="50px"
        w:flex="~"
        w:justify="center"
        w:align="items-center"
        w:rounded="full"
        w:bg="gray-500"
        w:z="marginals"
      >
        <p w:text="white">
          + {{ filesBlob.length - 5 }}
        </p>
      </div>
    </div>

    <input
      ref="fileRef"
      w:display="hidden"
      type="file"
      accept="image/png, image/jpeg"
      multiple
      @change="addFile"
    />
  </div>
</template>
