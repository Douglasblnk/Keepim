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

  label: {
    type: String,
    default: '',
  },

  labelColor: {
    type: String,
    default: 'white',
  },

  errorMsg: {
    type: String,
    default: '',
  },

  light: Boolean,
  error: Boolean,
});

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>

<template>
  <div w:flex="~ col">
    <p
      w:m="b-xs"
      :style="{ color: labelColor }"
    >
      {{ label }}
    </p>

    <input
      v-model="model"
      w:rounded="full"
      w:flex="~"
      w:outline="none"
      w:text="white"
      :w:bg="light ? 'gray-500' : 'ascendent'"
      w:w="full"
      w:p="y-3 x-5"
      :w:border="error ? '1 solid danger' : 'none'"
      :type="type"
      :placeholder="placeholder"
    >
  </div>
</template>
