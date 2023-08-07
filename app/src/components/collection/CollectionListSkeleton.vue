<template>
  <div>
    <div
      v-for="item in [5, 3, 2]"
      :key="item"
      un-space-y-md
      un-mt-lg
    >
      <QSkeleton
        un-w-110px
        un-rounded-full
      />

      <div
        un-flex
        un-flex-wrap
      >
        <QSkeleton
          v-for="(skeleton) in item"
          :key="skeleton"
          un-w-90px
          un-h-90px
          un-mr-sm
          un-mb-sm
          un-rounded-2xl
        />
      </div>
    </div>
  </div>
</template>
