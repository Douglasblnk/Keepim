<script setup>
const emit = defineEmits([
  'addFolder',
  'addImage',
  'addCategory',
])
</script>

<template>
  <div un-flex="~ col">
    <p un-text="medium">
      Atalhos
    </p>

    <div
      un-flex="~ wrap"
      un-m="t-sm"
    >
      <div
        un-flex="~ col"
        un-align="items-center"
        un-p="md"
        un-m="r-sm b-sm"
        un-bg="accent active:gray-500 md:hover:gray-500"
        un-transition="~"
        un-rounded="md"
        un-cursor="pointer"
        @click="emit('addFolder')"
      >
        <FIcon
          icon="folder-plus"
          un-m="b-sm"
        />

        <p un-select="none">
          Adicionar pasta
        </p>
      </div>

      <div
        un-flex="~ col"
        un-align="items-center"
        un-p="md"
        un-m="r-sm b-sm"
        un-bg="accent active:gray-500 md:hover:gray-500"
        un-transition="~"
        un-rounded="md"
        un-cursor="pointer"
        @click="emit('addImage')"
      >
        <FIcon
          icon="images"
          un-m="b-sm"
        />

        <p un-select="none">
          Adicionar imagem
        </p>
      </div>

      <div
        un-flex="~ col"
        un-align="items-center"
        un-p="md"
        un-m="r-sm b-sm"
        un-bg="accent active:gray-500 md:hover:gray-500"
        un-transition="~"
        un-rounded="md"
        un-cursor="pointer"
        @click="emit('addCategory')"
      >
        <FIcon
          icon="tags"
          un-m="b-sm"
        />

        <p un-select="none">
          Adicionar categoria
        </p>
      </div>
    </div>
  </div>
</template>
