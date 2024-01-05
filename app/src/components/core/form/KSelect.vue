<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { useField } from 'vee-validate'
import type { FieldProps } from '@utils/utils'
import { QSelect } from 'quasar'
import type { QSelectSlots } from 'quasar'

const props = defineProps<FieldProps>()

const slots = useSlots() as unknown as QSelectSlots

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  handleReset,
} = useField(
  () => props.name || uuid(),
  props.veeRules || {},
  { initialValue: props.modelValue, syncVModel: true },
)
</script>

<template>
  <QSelect
    class="k-select"
    popup-content-class="!max-h-300px bg-dark-primary"
    behavior="menu"
    :menu-offset="[0, 4]"
    :error-message="errorMessage"
    :error="!!errorMessage"
    :name="name"
    :model-value="inputValue"
    :virtual-scroll-slice-ratio-after="60"
    :virtual-scroll-slice-ratio-before="60"
    clearable
    outlined
    map-options
    @clear="handleReset"
    @update:model-value="handleChange"
    @blur="handleBlur"
  >
    <template
      v-for="(_, name) in slots"
      #[name]="slotProps = {}"
    >
      <slot
        v-bind="slotProps"
        :name="name"
      />
    </template>
  </QSelect>
</template>
