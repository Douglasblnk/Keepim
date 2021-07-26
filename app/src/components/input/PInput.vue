<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PInput',

  props: {
    type: {
      type: String,
      default: 'text',
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  setup() {
    return {};
  },
});
</script>

<template>
  <input
    class="p-input"
    :type="type"
    :placeholder="placeholder"
  >
</template>

<style lang="postcss">
.p-input {
  @apply
    flex
    w-full
    border-none
    rounded-full
    px-5
    py-3
    outline-none
    !bg-gray-100;
}
</style>
