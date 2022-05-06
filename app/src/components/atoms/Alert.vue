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
        un-w="full"
        un-flex="~"
        un-justify="center"
        un-pos="fixed top-lg"
        un-z="notify"
      >
        <div
          :class="`bg-${type}`"
          un-h="xl"
          un-flex="~"
          un-text="white base"
          un-justify="center"
          un-align="items-center"
          un-p="x-lg"
          un-rounded="full"
          un-font="base"
          un-shadow="10 gray-700"
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
