<script setup>
defineEmits([
  'add-folder',
  'add-image',
  'add-category',
]);
</script>

<template>
  <div w:flex="~ col">
    <p w:text="medium">
      Atalhos
    </p>

    <div
      w:flex="~ wrap"
      w:m="t-sm"
    >
      <div
        w:flex="~ col"
        w:align="items-center"
        w:p="md"
        w:m="r-sm b-sm"
        w:bg="ascendent active:gray-500 md:hover:gray-500"
        w:transition="~"
        w:rounded="md"
        w:cursor="pointer"
        @click="$emit('add-folder')"
      >
        <FIcon
          icon="folder-plus"
          w:m="b-sm"
        />

        <p w:select="none">
          Adicionar pasta
        </p>
      </div>

      <div
        w:flex="~ col"
        w:align="items-center"
        w:p="md"
        w:m="r-sm b-sm"
        w:bg="ascendent active:gray-500 md:hover:gray-500"
        w:transition="~"
        w:rounded="md"
        w:cursor="pointer"
        @click="$emit('add-image')"
      >
        <FIcon
          icon="images"
          w:m="b-sm"
        />

        <p w:select="none">
          Adicionar imagem
        </p>
      </div>

      <div
        w:flex="~ col"
        w:align="items-center"
        w:p="md"
        w:m="r-sm b-sm"
        w:bg="ascendent active:gray-500 md:hover:gray-500"
        w:transition="~"
        w:rounded="md"
        w:cursor="pointer"
        @click="$emit('add-category')"
      >
        <FIcon
          icon="tags"
          w:m="b-sm"
        />

        <p w:select="none">
          Adicionar categoria
        </p>
      </div>
    </div>
  </div>
</template>
