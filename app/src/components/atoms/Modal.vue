<script setup>
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['close']);

const target = ref(null);

onClickOutside(target, event => emit('close'));

const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

const unlockBodyScroll = () => {
  document.body.style.overflow = 'auto';
};

watch(
  () => props.modelValue,
  (value) => {
    if (value) return lockBodyScroll();
    return unlockBodyScroll();
  },
);
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        w:pos="absolute top-0 left-0"
        w:backdrop="~ blur-lg"
        w:bg="black opacity-30"
        w:w="screen"
        w:h="screen"
        w:flex="~"
        w:justify="center"
        w:align="items-center"
        w:z="notify"
      >
        <div
          ref="target"
          w:bg="gray-500"
          w:p="x-lg y-lg"
          w:rounded="md"
        >
          poxa
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
