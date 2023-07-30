<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  showSlogan?: boolean
}>(), {
  size: '6xl',
})
</script>

<template>
  <div
    class="keepim-title"
    un-flex="~ col"
    un-justify-center
    un-items-center
  >
    <div
      un-flex="~ col"
      un-items-end
    >
      <Transition
        enter-active-class="transition-all duration-100 ease"
        leave-active-class="transition-all duration-100 ease"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <span
          :key="title"
          class="keepim-title__color"
          un-font="bold poppins"
          un-bg-background
          un-py-sm
          un-select-none
          un-text="gray-100 center"
          :class="`text-${size}`"
        >
          {{ title }}
        </span>
      </Transition>

      <span
        v-if="showSlogan"
        un-text-white
        un-w-150px
        un-text-end
      >
        A place to keep <span
          class="keepim-title__color"
          un-font-bold
        >memories.</span>
      </span>
    </div>
  </div>
</template>

<style lang="sass">
.keepim-title
  &__color
    background: linear-gradient(90deg, #3A9DD6 0%, #8373D0 50%, #C62687 100%)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
</style>
