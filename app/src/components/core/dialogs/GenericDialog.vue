<script setup lang="ts">
const {
  isOpen,
  componentName,
  componentInstance,
  componentProps,
  dialogProps,
} = useDialog()

const noCard = computed(() => {
  return dialogProps.value.noCard
})
</script>

<template>
  <QDialog
    v-model="isOpen"
    v-bind="dialogProps"
    transition-show="jump-down"
    transition-hide="jump-up"
  >
    <QCard
      v-if="!noCard"
      un-w-full
    >
      <QCardSection>
        <Component
          v-bind="componentProps"
          :is="componentInstance"
          :key="componentName"
        />
      </QCardSection>
    </QCard>

    <Component
      v-bind="componentProps"
      :is="componentInstance"
      v-if="noCard"
      :key="componentName"
    />
  </QDialog>
</template>
