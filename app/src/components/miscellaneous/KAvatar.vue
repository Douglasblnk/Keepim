<script setup lang="ts">
import { checkImgExists } from '@utils/index'

const props = defineProps<{
  color?: string
  label?: string
  img?: string
}>()

const imgExist = computed(() => {
  return checkImgExists(props.img)
})

const firstLetterLabel = computed(() =>
  props.label ? props.label.substring(0, 1).toUpperCase() : '',
)

const color = computed(() => (imgExist.value ? 'transparent' : props.color))
</script>

<template>
  <QAvatar
    :color="color"
    un-shadow-lg
    un-overflow-hidden
  >
    <slot>
      <QImg
        v-show="imgExist"
        :src="img"
        no-spinner
        no-transition
      />

      <span v-show="!imgExist">
        {{ firstLetterLabel }}
      </span>
    </slot>
  </QAvatar>
</template>
