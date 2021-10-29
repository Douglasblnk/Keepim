<script setup>
import { useEventListener } from '@vueuse/core';

const target = ref(null);
const reachedTop = ref(null);

const Fn = useEventListener(
  document,
  'scroll',
  () => {
    const { offsetTop } = target.value;

    if (offsetTop > 64)
      reachedTop.value = true;

    else reachedTop.value = false;
  },
);

onBeforeUnmount(() => Fn());
</script>

<template>
  <h1
    ref="target"
    w:font="normal tracking-widest"
    w:m="y-xxl"
    w:p="y-lg"
    w:bg="background"
    w:pos="sticky top-0"
    w:select="none"
    w:transition="~ all"
    :w:text="reachedTop ? 'gray-100 [24px] center' : 'gray-100 [38px] center'"
  >
    PhotoKeep
  </h1>
</template>
