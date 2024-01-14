<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { useField } from 'vee-validate'
import type { FieldProps } from '@utils/utils'
import { dayjs } from '@utils/index'

const props = defineProps<FieldProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  setErrors,
  handleChange,
} = useField(
  () => props.name || uuid(),
  props.veeRules || {},
  { initialValue: props.modelValue, syncVModel: true },
)

const qDatePopup = ref()
const internalDate = ref()

function clear() {
  internalDate.value = undefined
  inputValue.value = undefined
}

function checkIsDateFormat(date: string) {
  setErrors('')

  const validDate = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/

  const dateIsValid = validDate.test(date)

  if (!dateIsValid || date === 'Invalid Date') {
    setErrors('Data mal formatada')
    return false
  }

  return true
}

watch(() => internalDate.value, (date) => {
  if (date?.length === 10) {
    const formattedDate = dayjs(date, 'DD/MM/YYYY', true).format('YYYY-MM-DD')

    if (checkIsDateFormat(formattedDate)) {
      emit('update:modelValue', formattedDate)
      handleChange(formattedDate)
    }
  }
})

watch(() => inputValue.value, (date) => {
  if (!date || date.length !== 10)
    internalDate.value = undefined
})

onMounted(() => {
  if (inputValue.value && checkIsDateFormat(inputValue.value))
    internalDate.value = dayjs(inputValue.value).format('DD/MM/YYYY')
})
</script>

<template>
  <QInput
    v-model="internalDate"
    mask="##/##/####"
    :un-text="!!errorMessage ? 'negative' : 'black'"
    :error-message="errorMessage"
    :error="!!errorMessage"
    placeholder="DD/MM/YYYY"
    no-error-icon
    clearable
    outlined
    @blur="handleBlur"
    @clear="clear"
  >
    <template #append>
      <QBtn
        icon="i-mdi-calendar-month-outline"
        :color="!!errorMessage ? 'negative' : 'primary' "
        round
        dense
        flat
      >
        <QPopupProxy ref="qDatePopup">
          <QDate
            v-model="internalDate"
            mask="DD/MM/YYYY"
            minimal
            v-bind="$attrs"
            @update:model-value="qDatePopup.hide()"
          />
        </QPopupProxy>
      </QBtn>
    </template>
  </QInput>
</template>
