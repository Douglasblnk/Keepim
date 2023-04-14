<script setup>
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits([ 'close' ])

const target = ref(null)

const secondRender = ref(false)

function closeModal() {
  secondRender.value = false

  setTimeout(() => {
    emit('close')
  }, 100)
}

onClickOutside(target, closeModal)

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      document.body.style.overflow = 'hidden'

      return setTimeout(() => {
        secondRender.value = true
      }, 100)
    }

    else {
      document.body.style.overflow = 'auto'

      secondRender.value = false
    }
  },
)

defineExpose({ closeModal })
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        un-pos="fixed top-0 left-0"
        un-backdrop="~ blur-lg"
        un-bg="black opacity-30"
        un-w="screen"
        un-h="screen"
        un-flex="~"
        un-justify="center"
        un-align="items-center"
        un-z="fullscreen"
      >
        <Transition name="modal">
          <div
            v-if="secondRender"
            ref="target"
          >
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
