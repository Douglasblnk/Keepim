<script setup lang="ts">
const {
  isOpen,
  componentName,
  componentInstance,
  componentProps,
  dialogProps,
} = useDialog()
</script>

<template>
  <QDialog
    v-model="isOpen"
    v-bind="dialogProps"
  >
    <QCard un-w-full>
      <QCardSection>
        <Component
          v-bind="componentProps"
          :is="componentInstance"
          :key="componentName"
        />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
