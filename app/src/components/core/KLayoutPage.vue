<script setup lang=ts>
defineOptions({
  inheritAttrs: false,
})

defineProps<{ withBlur?: boolean }>()

const attrs = useAttrs()
</script>

<template>
  <div un-flex="~ col grow">
    <div
      v-if="$slots.header"
      un-pos-sticky
      un-top-0
      un-z-10
      :style="withBlur ? { background: 'rgba(32, 36, 39, 0.70)' } : {}"
      :class="withBlur ? 'backdrop-blur-md' : 'bg-background'"
    >
      <div
        un-w="sm:col-8 lg:col-6 col-12"
        un-p-x-lg
        un-pt-lg
        v-bind="attrs"
      >
        <slot name="header" />
      </div>
    </div>

    <div
      un-w="sm:col-8 lg:col-6 col-12"
      un-flex="~ col grow"
      un-p-x-lg
      v-bind="attrs"
    >
      <slot />
    </div>
  </div>
</template>
