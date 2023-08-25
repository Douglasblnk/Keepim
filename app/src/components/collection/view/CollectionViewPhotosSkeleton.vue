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
      un-w-95px
      un-h-95px
      un-rounded-3xl
    />
  </div>
</template>
