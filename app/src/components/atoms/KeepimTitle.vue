<template>
  <div
    class="keepim-title"
    un-column
    un-items-end
  >
    <span
      class="keepim-title__color"
      un-font="bold montserrat"
      un-bg-background
      un-py-sm
      un-select-none
      un-text="gray-100 6xl center"
    >
      Keepim
    </span>

    <span
      un-text-white
      un-w-150px
      un-text-end
    >
      A place to keep <span
        class="keepim-title__color"
        un-font-bold
      >memories.</span>
    </span>
  </div>
</template>

<style lang="sass">
.keepim-title
  &__color
    background: linear-gradient(90deg, #3A9DD6 0%, #8373D0 50%, #C62687 100%)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
</style>
