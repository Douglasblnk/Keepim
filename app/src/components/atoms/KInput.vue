<script setup>
import { useField } from 'vee-validate'
import { fieldProps } from '@utils/index'

const props = defineProps({
  ...fieldProps,
  icon: String,
})

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  handleReset,
} = useField(props.name, props.veeRules, { initialValue: props.modelValue })
</script>

<template>
  <QInput
    :error-message="errorMessage"
    :error="!!errorMessage"
    :name="name"
    :model-value="inputValue"
    clearable
    outlined
    @clear="handleReset"
    @update:model-value="handleChange"
    @blur="handleBlur"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps = {}"
    >
      <slot
        v-bind="slotProps"
        :name="name"
      />
    </template>

    <template
      v-if="icon"
      #prepend
    >
      <QIcon
        :name="icon"
        size="xs"
      />
    </template>
  </QInput>
</template>
