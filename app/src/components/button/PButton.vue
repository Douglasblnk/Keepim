<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PButton',

  props: {
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
    disabled: Boolean,
    loading: Boolean,
    circle: Boolean,
  },

  setup(props) {
    const customClasses = computed(() => ({
      'p-button--primary': props.primary,
      'p-button--secondary': props.secondary,
      'p-button--disabled': props.disabled,
      'p-button--loading': props.loading,
      'p-button--circle': props.circle,
    }));

    return {
      customClasses,
    };
  },
});
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
        :icon="icon"
        :size="iconSize"
      />
    </div>

    <span>
      {{ label }}
    </span>
  </button>
</template>

<style lang="postcss">
.p-button {
  @apply
    flex
    items-center
    justify-center
    px-5
    py-2
    rounded-full
    shadow-2
    transition-shadow
    active:shadow-8
    !outline-none
    bg-gray-200;

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

  &--disabled {
    @apply
      opacity-30
  }

  &--circle {
    @apply
      w-12
      h-12;
  }

  span {
    @apply
      text-white
      font-semibold
      tracking-wide;
  }
}
</style>
