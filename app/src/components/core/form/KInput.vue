<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { v4 as uuid } from 'uuid'
import { useField } from 'vee-validate'
import type { FieldProps } from '@utils/utils'

const props = defineProps<FieldProps & { icon?: string }>()

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(
  () => props.name || uuid(),
  props.veeRules || {},
  { initialValue: props.modelValue, syncVModel: true },
)
</script>

<template>
  <QInput
    :error-message="errorMessage"
    :error="!!errorMessage"
    :name="name"
    :model-value="inputValue"
    clearable
    outlined
    @clear="inputValue = undefined"
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
