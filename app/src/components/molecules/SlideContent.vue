<script setup>
import useSwiper from '@composables/use-swiper';

defineProps({
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
});

defineEmits(['see-all, open-image']);

onMounted(async() => {
  await useSwiper(
    '.swiper',
    {
      slidesPerView: 'auto',
      spaceBetween: 10,
      grabCursor: true,
      freeMode: true,
    },
    ['FreeMode'],
  );
});
</script>

<template>
  <div w:flex="~ col">
    <div
      w:flex="~"
      w:justify="between"
    >
      <p w:text="medium">
        {{ title }}
      </p>

      <div
        v-if="showAction"
        w:flex="~"
        w:align="items-center"
        w:cursor="pointer"
        @click="$emit('see-all')"
      >
        <p w:text="small gray-400">
          Ver todas
        </p>

        <FIcon
          icon="long-arrow-alt-right"
          w:m="l-sm"
          w:text="gray-400"
        />
      </div>
    </div>

    <div w:m="t-sm">
      <div
        class="swiper slide-content"
        w:flex="~"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in items"
            :key="`slide-content-${index}`"
            class="swiper-slide"
            w:w="!auto"
          >
            <slot v-bind="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
