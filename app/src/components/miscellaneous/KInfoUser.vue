<script setup lang="ts">
const { userStorage } = useLocalStorage()
</script>

<template>
  <div
    un-flex
    un-items-center
    un-gap-md
  >
    <KAvatar
      size="60px"
      color="primary"
      :img="userStorage.avatar"
      :label="userStorage.name"
    />

    <div
      un-flex="~ col"
      un-gap-xs
    >
      <span
        un-text-18px
        un-font-bold
      >
        {{ userStorage.name }}
      </span>

      <span un-text-gray>{{ userStorage.email }}</span>
    </div>
  </div>
</template>
