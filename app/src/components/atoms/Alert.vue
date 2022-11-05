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
})
</script>

<template>
  <teleport to="body">
    <transition
      name="alert"
      mode="in-out"
    >
      <div
        v-if="isShowing"
        un-pos="fixed top-lg"
        un-w-full
        un-flex
        un-justify-center
        un-z-notify
      >
        <div
          :class="`bg-${type}`"
          un-text="white base"
          un-shadow="10 gray-700"
          un-h-xl
          un-flex
          un-justify-center
          un-items-center
          un-px-lg
          un-rounded-full
          un-font-base
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
