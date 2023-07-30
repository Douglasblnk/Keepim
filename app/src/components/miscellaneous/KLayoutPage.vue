<script setup lang=ts>
defineProps<{
  defaultHeader?: string
}>()

const { back } = useRouter()
</script>

<template>
  <div
    un-sm-w-col-10
    un-lg-w-col-7
    un-w-full
    un-flex="~ col grow"
    un-mx-auto
    :class="defaultHeader ? 'p-x-lg' : 'p-lg'"
  >
    <div
      un-pos-sticky
      un-top-0
      un-z-10
    >
      <slot name="header">
        <div
          v-if="defaultHeader"
          un-relative
          un-flex
          un-items-center
          un-justify-between
          un-backdrop-blur-md
          style="background: rgba(32, 36, 39, 0.30);"
          un-py-md
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

    <slot />
  </div>
</template>
