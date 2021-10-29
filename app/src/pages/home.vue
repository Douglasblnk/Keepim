<script setup>
const showModal = ref(false);

const addFolder = () => {
  showModal.value = true;
};
</script>

<template>
  <div
    w:w="md:6/12"
    w:m="x-auto"
    w:text="white"
  >
    <PhotoKeepTitle />

    <div w:m="x-lg md:auto">
      <ShortcutAction
        @add-folder="addFolder"
      />

      <Modal
        v-model="showModal"
        @close="showModal = false"
      />
    </div>
  </div>
</template>
