<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },

  label: {
    type: String,
    default: '',
  },

  primary: Boolean,
  secondary: Boolean,
  ascendent: Boolean,
  disabled: Boolean,
  loading: Boolean,
  circle: Boolean,
  unelevated: Boolean,
})

const customClasses = computed(() => ({
  'p-button--primary': props.primary,
  'p-button--secondary': props.secondary,
  'p-button--ascendent': props.ascendent,
  'p-button--disabled': props.disabled,
  'p-button--loading': props.loading,
  'p-button--circle': props.circle,
  'p-button--unelevated': props.unelevated,
}))
</script>

<template>
  <button
    class="p-button"
    un-rounded
    un-bg-gray-200
    un-py-3
    un-px-6
    un-transition-shadow
    un-shadow-2
    un-outline-none
    un-border-none
    un-active:shadow-8
    :class="customClasses"
    :disabled="disabled || loading"
    :type="type"
  >
    <slot>
      <span
        un-text="white"
        un-font="semibold tracking-wide"
        un-select="none"
      >
        {{ label }}
      </span>
    </slot>
  </button>
</template>

<style lang="sass">
.p-button
  &--primary
    @apply bg-primary

  &--secondary
    @apply bg-secondary

  &--ascendent
    @apply bg-ascendent

  &--disabled
    @apply opacity-30

  &--circle
    @apply rounded-full p-0

  &--unelevated
    @apply shadow-none
</style>
