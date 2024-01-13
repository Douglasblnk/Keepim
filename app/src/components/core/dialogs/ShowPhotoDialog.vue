<script setup lang="ts">
defineProps<{
  photo: string
}>()
</script>

<template>
  <div>
    <QImg
      :src="photo"
      :ratio="16 / 9"
    />
  </div>
</template>
