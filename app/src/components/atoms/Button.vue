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

  icon: {
    type: String,
    default: '',
  },

  iconSize: {
    type: String,
    default: '',
  },

  primary: Boolean,
  secondary: Boolean,
  ascendent: Boolean,
  disabled: Boolean,
  loading: Boolean,
  circle: Boolean,
  flat: Boolean,
  unelevated: Boolean,
})

const customClasses = computed(() => ({
  'p-button--primary': props.primary,
  'p-button--secondary': props.secondary,
  'p-button--ascendent': props.ascendent,
  'p-button--disabled': props.disabled,
  'p-button--loading': props.loading,
  'p-button--circle': props.circle,
  'p-button--flat': props.flat,
  'p-button--unelevated': props.unelevated,
}))
</script>

<template>
  <button
    class="p-button"
    un-rounded-full
    un-flex
    un-bg-gray-200
    un-py-2
    un-px-5
    un-transition-shadow
    un-shadow-2
    un-items-center
    un-justify-center
    un-outline-none
    un-active:shadow-8
    :class="customClasses"
    :disabled="disabled || loading"
    :type="type"
  >
    <div
      v-if="icon"
      class="p-button__icon"
    >
      <FIcon
        v-if="!loading"
        :icon="icon"
        :size="iconSize"
      />

      <FIcon
        v-else
        icon="spinner"
        class="fa-spin"
        :size="iconSize"
      />
    </div>

    <span
      un-text="white"
      un-font="semibold tracking-wide"
      un-select="none"
    >
      {{ label }}
    </span>
  </button>
</template>

<style lang="sass">
.p-button
  &__icon
    color: white

  &--primary
    background-color: var(--color-primary)

  &--secondary
    background-color: var(--color-secondary)

  &--ascendent
    background-color: var(--color-ascendent)
</style>

// &--disabled
//   @apply
//     opacity-30

// &--circle
//   @apply
//     h-12
//     w-12

// &--flat
//   @apply
//     rounded-md

// &--unelevated
//   @apply
//     !shadow-none
