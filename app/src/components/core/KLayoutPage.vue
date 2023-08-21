<script setup lang=ts>
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  defaultHeader?: string
  withBlur?: boolean
}>()

const { back } = useRouter()
const attrs = useAttrs()
</script>

<template>
  <div un-flex="~ col grow">
    <div
      v-if="defaultHeader || $slots.header"
      un-pos-sticky
      un-top-0
      un-z-10
      un-pt-lg
      :style="withBlur ? { background: 'rgba(32, 36, 39, 0.70)' } : {}"
      :class="withBlur ? 'backdrop-blur-md' : 'bg-background'"
    >
      <div
        un-w="sm:col-8 lg:col-6 col-12"
        un-p-x-lg
        v-bind="attrs"
      >
        <slot name="header">
          <div
            v-if="defaultHeader"
            un-relative
            un-flex
            un-items-center
            un-justify-between
            un-pb-md
          >
            <QIcon
              name="i-mdi-arrow-left"
              size="md"
              un-absolute
              un-cursor-pointer
              @click="back"
            />

            <h1
              un-title
              un-mx-auto
            >
              {{ defaultHeader }}
            </h1>
          </div>
        </slot>
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
