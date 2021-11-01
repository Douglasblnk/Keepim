<script setup>
defineProps({
  isShowing: Boolean,

  text: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'warning',
    validator: type => [
      'warning', 'info', 'positive', 'negative',
    ].includes(type),
  },
});
</script>

<template>
  <teleport to="body">
    <transition
      name="alert"
      mode="in-out"
    >
      <div
        v-if="isShowing"
        w:w="full"
        w:flex="~"
        w:justify="center"
        w:pos="fixed top-lg"
        w:z="notify"
      >
        <div
          :class="`bg-${type}`"
          w:h="xl"
          w:flex="~"
          w:text="white base"
          w:justify="center"
          w:align="items-center"
          w:p="x-lg"
          w:rounded="full"
          w:font="base"
          w:shadow="10 gray-700"
        >
          {{ text }}
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style>
.alert-enter-active,
.alert-leave-active {
  transition: all .4s;
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
