<template>
  <div
    un-w-full
    un-flex
    un-flex-wrap
    un-gap-sm
  >
    <QSkeleton
      v-for="index in 18"
      :key="index"
      un-w-125px
      un-h-125px
      un-rounded-3xl
    />
  </div>
</template>
