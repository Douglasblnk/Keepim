<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },

  items: {
    type: Array,
    default: () => [],
  },

  showAction: {
    type: Boolean,
    default: true,
  },
})

defineEmits([ 'seeAll' ])

const { createSwiper } = useUtils()

onMounted(async () => {
  await createSwiper(
    '.swiper',
    {
      slidesPerView: 'auto',
      spaceBetween: 10,
      grabCursor: true,
      freeMode: true,
    },
    [ 'FreeMode' ],
  )
})
</script>

<template>
  <div
    un-flex
    un-flex-col
  >
    <div
      un-flex
      un-justify-between
    >
      <p un-text-medium>
        {{ title }}
      </p>

      <div
        v-if="showAction"
        un-flex
        un-items-center
        un-cursor-pointer
        @click="$emit('seeAll')"
      >
        <p
          un-text="small gray-400"
          un-select-none
        >
          Ver todas
        </p>

        <Icon
          icon="i-mdi-arrow-right"
          un-m="l-sm"
          un-text="gray-400"
        />
      </div>
    </div>

    <div un-mt-sm>
      <div
        class="swiper slide-content"
        un-flex
      >
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in items"
            :key="`slide-content-${index}`"
            class="swiper-slide"
            un-w="auto"
          >
            <slot v-bind="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
