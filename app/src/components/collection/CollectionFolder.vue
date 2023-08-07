<script setup lang="ts">
defineProps<{
  name: string
  thumbnail?: string
}>()

const hover = ref(false)
</script>

<template>
  <div
    un-rounded-2xl
    un-shadow
    un-bg-dark-secondary
    un-relative
    un-overflow-hidden
    un-flex
    un-justify-center
    un-cursor-pointer
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      v-if="thumbnail"
      un-p-md
    >
      <QIcon
        name="i-mdi-image-off-outline"
        size="md"
      />
    </div>

    <div
      v-else
      un-absolute
      top-0
      un-w-full
      un-h-full
      un-transition
      :class="hover && 'transform-scale-110'"
    >
      <QImg
        ratio="1"
        src="https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg"
      />
    </div>

    <div
      un-absolute
      un-bottom-2
      un-p="y-xs x-sm"
      un-max-w="90%"
      un-rounded-lg
      un-backdrop-blur-8px
      class="bg-dark-primary/30"
    >
      <span
        un-line-clamp-1
        un-truncate-1
        un-select-none
        un-text="xs center"
      >
        {{ name }}
      </span>
    </div>
  </div>
</template>
