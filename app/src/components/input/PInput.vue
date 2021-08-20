<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PInput',

  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },

    type: {
      type: String,
      default: 'text',
    },

    placeholder: {
      type: String,
      default: '',
    },

    error: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    return {
      model,
    };
  },
});
</script>

<template>
  <div class="flex flex-col">
    <input
      v-model="model"
      class="p-input"
      :w:border="error ? '1 solid danger' : ''"
      :type="type"
      :placeholder="placeholder"
    >

    <div
      w:flex="~"
      w:justify="center"
      w:h="min-lg"
    >
      <small
        v-show="error"
        w:m="x-sm t-sm"
        w:pos="absolute"
        w:text="danger"
      >
        {{ error }}
      </small>
    </div>
  </div>
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
    bg-gray-100;
}
</style>
