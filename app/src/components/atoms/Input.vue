<script setup>
const props = defineProps({
  modelValue: {
    type: [ String, Number ],
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
})

const emit = defineEmits([ 'update:modelValue' ])

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <div un-flex="~ col">
    <p
      un-m="b-xs"
      :style="{ color: labelColor }"
    >
      {{ label }}
    </p>

    <input
      v-model="model"
      un-rounded="full"
      un-flex="~"
      un-outline="none"
      un-text="white"
      :un-bg="light ? 'gray-500' : 'ascendent'"
      un-p="y-3 x-5"
      :un-border="error ? '1 solid danger' : 'none'"
      :type="type"
      :placeholder="placeholder"
    >
  </div>
</template>
