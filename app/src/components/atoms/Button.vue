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
});

const customClasses = computed(() => ({
  'p-button--primary': props.primary,
  'p-button--secondary': props.secondary,
  'p-button--ascendent': props.ascendent,
  'p-button--disabled': props.disabled,
  'p-button--loading': props.loading,
  'p-button--circle': props.circle,
  'p-button--flat': props.flat,
  'p-button--unelevated': props.unelevated,
}));

</script>

<template>
  <button
    class="p-button"
    :class="customClasses"
    :disabled="disabled || loading"
    :type="type"
  >
    <div
      class="p-button__icon"
      v-if="icon"
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

<style lang="postcss">
.p-button {
  @apply
    rounded-full
    flex
    bg-gray-200
    py-2
    px-5
    transition-shadow
    shadow-2
    items-center
    justify-center
    !outline-none
    active:shadow-8;

  &__icon {
    @apply
      text-white;
  }

  &--primary {
    @apply
      bg-primary;
  }

  &--secondary {
    @apply
      bg-secondary;
  }

  &--ascendent {
    @apply
      bg-ascendent;
  }

  &--disabled {
    @apply
      opacity-30;
  }

  &--circle {
    @apply
      h-12
      w-12;
  }

  &--flat {
    @apply
      rounded-md;
  }

  &--unelevated {
    @apply
      !shadow-none;
  }
}
</style>
