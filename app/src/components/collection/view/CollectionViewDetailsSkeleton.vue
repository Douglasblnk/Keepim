<template>
  <div un-w-full>
    <QSkeleton
      un-w="50%"
      un-h-24px
      un-rounded-full
      un-mx-auto
      un-mb-md
    />

    <QSkeleton
      un-w="90%"
      un-h-14px
      un-rounded-full
      un-mx-auto
      un-mb-sm
    />

    <QSkeleton
      un-w="70%"
      un-h-14px
      un-rounded-full
      un-mx-auto
      un-mb-sm
    />

    <QSkeleton
      un-w-100px
      un-h-14px
      un-rounded-full
      un-mb-lg
      un-mt-xl
    />

    <div
      un-flex
      un-items-center
      un-gap-md
    >
      <QSkeleton
        un-w-60px
        un-h-60px
        un-rounded-full
        un-mb-sm
      />

      <QSkeleton
        un-w-170px
        un-h-14px
        un-rounded-full
        un-mb-sm
      />
    </div>

    <QSkeleton
      un-w-100px
      un-h-14px
      un-rounded-full
      un-mb-lg
      un-mt-lg
    />

    <div
      v-for="participants in 2"
      :key="participants"
      un-flex
      un-items-center
      un-gap-md
      un-mb-sm
    >
      <QSkeleton
        un-w-40px
        un-h-40px
        un-rounded-full
      />

      <QSkeleton
        un-w-120px
        un-h-14px
        un-rounded-full
      />
    </div>

    <QSkeleton
      un-w-100px
      un-h-14px
      un-rounded-full
      un-mb-lg
      un-mt-lg
    />

    <div
      un-flex
      un-items-center
      un-gap-md
      un-mb-sm
    >
      <QSkeleton
        un-w-40px
        un-h-40px
        un-rounded-full
      />

      <QSkeleton
        un-w-180px
        un-h-14px
        un-rounded-full
      />
    </div>
  </div>
</template>
