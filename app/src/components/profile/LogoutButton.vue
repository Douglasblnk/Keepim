<script setup lang="ts">
defineProps<{
  icon: string
  color: string
  title: string
  description?: string
  showProgressBar?: boolean
}>()
</script>

<template>
  <QCard
    un-border-0
    un-cursor-pointer
    un-select-none
    un-shadow
    un-relative
  >
    <QCardSection v-ripple>
      <div
        un-flex
        un-items-center
        un-gap-md
      >
        <div
          un-p-sm
          un-rounded-2xl
          :class="color"
        >
          <QIcon
            :name="icon"
            size="sm"
          />
        </div>

        <div un-flex="~ col">
          <strong>{{ title }}</strong>

          <span
            un-text-sm
            un-text-gray
          >
            {{ description }}
          </span>
        </div>
      </div>
    </QCardSection>

    <div
      v-if="showProgressBar"
      class="progress-bar-container"
    >
      <div class="progress-bar" />
    </div>
  </QCard>
</template>

<style lang="sass" scoped>
.progress-bar-container
  width: 100%
  height: 100%
  position: absolute
  top: 0
  overflow: hidden
  border-radius: 24px !important

.progress-bar
  width: 100%
  height: 100%
  background-color: #4caf50
  opacity: 0.1
  position: relative
  border-radius: 24px !important
  transition: width 2s linear
  animation: decreaseWidth 2s linear forwards

@keyframes decreaseWidth
  0%
    width: 100%
  100%
    width: 0
</style>
