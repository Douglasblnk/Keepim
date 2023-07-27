<script setup lang="ts">
const { back } = useRouter()
</script>

<template>
  <div un-p-lg>
    <div
      un-relative
      un-flex
      un-items-center
      un-justify-between
    >
      <QIcon
        name="i-mdi-arrow-left"
        size="md"
        un-absolute
        @click="back"
      />

      <h1
        un-title
        un-mx-auto
      >
        Configurações
      </h1>
    </div>

    <KInfoUser un-mt-xl />
  </div>
</template>

<route lang="yaml">
path: /configuracoes
meta:
  title: Configurações
  transition: slide-down
</route>
