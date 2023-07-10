<script setup lang="ts">
const { push } = useRouter()

const SELECTED = [
  'bg-primary',
  'rounded-full',
  'py-sm',
  'px-md',
]

const isQuickActionsOpen = ref(false)

function isSelected(route: string) {
  return useRoute().name === route
}

function select(route: string) {
  isQuickActionsOpen.value = false

  push({ name: route })
}

function toggleQuickActions() {
  isQuickActionsOpen.value = !isQuickActionsOpen.value

  document.body.style.overflow = isQuickActionsOpen.value ? 'hidden' : ''
}

function onAction(action: string) {
  console.log('action :>> ', action)
}
</script>

<template>
  <div
    un-pos="fixed bottom-0"
    un-w-full
    un-flex
    un-justify-center
    un-mx-auto
    un-z-10
  >
    <div
      un-w-full
      un-h-80px
      un-p-x-lg
      un-bg-dark-secondary
      un-flex
      un-justify-between
      un-items-center
      un-shadow-xl
      un-border="rounded-t-3xl"
    >
      <div
        un-w-col-8
        un-flex
        un-justify-between
        un-items-center
      >
        <div
          :class="isSelected('home') && SELECTED"
          un-cursor-pointer
          un-flex
          un-items-center
          un-gap-xs
          un-transition="duration-200"
          @click="select('home')"
        >
          <QIcon
            name="i-mdi-home-outline"
            un-text-md
          />

          <span v-show="isSelected('home')">Home</span>
        </div>

        <div
          :class="isSelected('collections') && SELECTED"
          un-cursor-pointer
          un-flex
          un-items-center
          un-gap-xs
          un-transition="duration-200"
          @click="select('collections')"
        >
          <QIcon
            name="i-mdi-folder-table-outline"
            un-text-md
          />

          <span v-show="isSelected('collections')">Coleções</span>
        </div>

        <div
          :class="isSelected('explore') && SELECTED"
          un-cursor-pointer
          un-flex
          un-items-center
          un-gap-xs
          un-transition="duration-200"
          @click="select('explore')"
        >
          <QIcon
            name="i-mdi-format-list-bulleted"
            un-text-md
          />

          <span v-show="isSelected('explore')">Pesquisar</span>
        </div>
      </div>

      <div
        un-bg-primary
        un-cursor-pointer
        un-rounded-full
        un-p-xs
        un-transition="duration-200"
        :un-transform="isQuickActionsOpen ? 'rotate-45' : ''"
        @click="toggleQuickActions"
      >
        <QIcon
          name="i-mdi-plus"
          un-text-md
        />
      </div>
    </div>

    <QuickActions
      v-model="isQuickActionsOpen"
      @onAction="onAction"
    />
  </div>
</template>
