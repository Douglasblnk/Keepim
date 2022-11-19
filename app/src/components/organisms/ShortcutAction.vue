<script setup>
defineEmits([
  'add-folder',
  'add-image',
  'add-category',
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
        @click="$emit('add-folder')"
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
        @click="$emit('add-image')"
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
        @click="$emit('add-category')"
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
