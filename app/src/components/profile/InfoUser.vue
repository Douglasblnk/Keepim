<script setup lang="ts">
const { userStorage } = useLocalStorage()
</script>

<template>
  <QCard
    un-border-0
    un-shadow
  >
    <QCardSection
      un-flex="~ col"
      un-items-center
      un-text-center
      un-gap-md
    >
      <KAvatar
        size="120px"
        color="primary"
        :img="userStorage?.avatar"
        :label="userStorage?.name"
      />

      <div
        un-flex="~ col"
        un-gap-xs
      >
        <span
          un-text-18px
          un-font-bold
        >
          {{ userStorage?.name }}
        </span>

        <span
          un-text-sm
          un-text-gray
        >{{ userStorage?.username }}</span>
      </div>
    </QCardSection>
  </QCard>
</template>
