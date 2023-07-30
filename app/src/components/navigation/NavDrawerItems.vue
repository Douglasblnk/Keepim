<script setup lang="ts">
defineProps<{
  items: {
    name: string
    children: {
      name: string
      icon: Component
      isActive?: ComputedRef<boolean>
      action: () => void
    }[]
  }[]
  miniState: boolean
  miniStateTransition: boolean
}>()

const { userStorage } = useLocalStorage()

const { push } = useRouter()
</script>

<template>
  <div
    un-p-md
    un-flex="~ col"
    style="height: calc(100% - 104px);"
    un-justify-between
  >
    <div un-space-y-md>
      <div
        v-for="(item, index) in items"
        :key="`item-${index}`"
        un-flex="~ col"
        un-space-y-sm
      >
        <span
          v-if="!miniState"
          un-text-gray-text
        >
          {{ item.name }}
        </span>

        <NavDrawerBtn
          :items="item.children"
          :mini-state="miniState"
          :mini-state-transition="miniStateTransition"
        />

        <QSeparator
          v-if="(index < (items.length - 1)) && miniState"
          spaced="lg"
        />
      </div>
    </div>

    <NavDrawerBtn
      :items="[
        {
          name: userStorage.name,
          avatar: userStorage.avatar,
          action: () => push('/configuracoes'),
        },
      ]"
      :mini-state="miniState"
      :mini-state-transition="miniStateTransition"
    />
  </div>
</template>
