<script setup>
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
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

  errorMsg: {
    type: String,
    default: '',
  },

  error: Boolean,
});

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>

<template>
  <div w:flex="~ col">
    <input
      v-model="model"
      w:rounded="full"
      w:flex="~"
      w:outline="none"
      w:text="white"
      w:bg="ascendent"
      w:w="full"
      w:p="y-3 x-5"
      :w:border="error ? '1 solid danger' : 'none'"
      :type="type"
      :placeholder="placeholder"
    >
  </div>
</template>
