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

defineEmits(['see-all']);

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
  <div un-flex="~ col">
    <div
      un-flex="~"
      un-justify="between"
    >
      <p un-text="medium">
        {{ title }}
      </p>

      <div
        v-if="showAction"
        un-flex="~"
        un-align="items-center"
        un-cursor="pointer"
        @click="$emit('see-all')"
      >
        <p
          un-text="small gray-400"
          un-select="none"
        >
          Ver todas
        </p>

        <FIcon
          icon="long-arrow-alt-right"
          un-m="l-sm"
          un-text="gray-400"
        />
      </div>
    </div>

    <div un-m="t-sm">
      <div
        class="swiper slide-content"
        un-flex="~"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in items"
            :key="`slide-content-${index}`"
            class="swiper-slide"
            un-w="!auto"
          >
            <slot v-bind="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
