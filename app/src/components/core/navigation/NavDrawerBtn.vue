<script setup lang="ts">
defineProps<{
  items: {
    name: string
    icon?: globalThis.Component
    avatar?: string
    isActive?: ComputedRef<boolean>
    action: () => void
  }[]
  miniState: boolean
}>()
</script>

<template>
  <div
    v-for="(child, childIndex) in items"
    :key="`child-${childIndex}`"
    un-flex
    un-items-center
    un-gap-md
    un-w-full
    un-hover="!text-white"
    un-p-md
    un-rounded-2xl
    un-cursor-pointer
    un-transition="background duration-200"
    :class="{
      'bg-primary/80 hover:bg-primary': child.isActive?.value,
      'hover:bg-dark-primary': !child.isActive?.value,
    }"
    @click="child.action"
  >
    <QTooltip
      v-if="miniState"
      un-text-sm
      un-bg-dark-primary
      un-px-lg
      un-py-md
      un-shadow
      un-rounded-full
      anchor="center right"
      self="center left"
    >
      {{ child.name }}
    </QTooltip>

    <QIcon un-text-lg>
      <KAvatar
        v-if="!child.icon"
        color="primary"
        size="lg"
        :img="child.avatar"
        :label="child.name"
        un-rounded-full
      />

      <Component
        :is="child.icon"
        v-else
      />
    </QIcon>

    <span
      un-overflow="hidden"
      un-whitespace-nowrap
      :class="miniState && 'hidden'"
    >
      {{ child.name }}
    </span>
  </div>
</template>
