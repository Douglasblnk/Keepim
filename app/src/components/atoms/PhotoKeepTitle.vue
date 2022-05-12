<script setup>
import { useEventListener } from '@vueuse/core'

const target = ref(null)
const reachedTop = ref(null)

const Fn = useEventListener(
  document,
  'scroll',
  () => {
    const { offsetTop } = target.value

    if (offsetTop > 64)
      reachedTop.value = true

    else reachedTop.value = false
  },
)

onBeforeUnmount(() => Fn())
</script>

<template>
  <h1
    ref="target"
    un-font="normal tracking-widest"
    un-pos="sticky top-0"
    un-transition="~ all"
    un-my-xxl
    un-py-lg
    un-bg-background
    un-select-none
    un-z-marginals
    :un-text="reachedTop ? 'gray-100 [24px] center' : 'gray-100 [38px] center'"
  >
    PhotoKeep
  </h1>
</template>
