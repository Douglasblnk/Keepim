<script setup>
import { onClickOutside } from '@vueuse/core';

defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['close']);

const target = ref(null);

onClickOutside(target, event => emit('close'));
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        w:pos="absolute top-0 left-0"
        w:backdrop="~ blur-lg"
        w:bg="black opacity-30"
        w:w="full"
        w:h="full"
        w:flex="~"
        w:justify="center"
        w:align="items-center"
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
