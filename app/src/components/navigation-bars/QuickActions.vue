<script setup lang="ts">
defineProps<{ modelValue: boolean }>()

const emit = defineEmits([ 'onAction', 'update:modelValue' ])

const actions = [
  { name: 'Nova coleção', icon: 'i-mdi-folder-plus-outline', emit: 'addCollection' },
  { name: 'Nova imagem', icon: 'i-mdi-image-plus-outline', emit: 'addImage' },
  { name: 'Nova categoria', icon: 'i-mdi-tag-plus-outline', emit: 'addCategory' },
]
</script>

<template>
  <Teleport to="body">
    <Transition
      name="fade"
      mode="in-out"
    >
      <div
        v-if="modelValue"
        un-w-screen
        un-h-screen
        un-fixed
        un-left-0
        un-top-0
        un-backdrop="~ blur-md"
        un-flex
        un-items-end
        un-justify-end
      >
        <div
          un-mb-100px
          un-mr-lg
          un-flex="~ col"
          un-gap-md
        >
          <div
            v-for="(action) in actions"
            :key="action.name"
            un-flex
            un-items-center
            un-justify-end
            un-gap-md
            @click="emit('onAction', action.emit); emit('update:modelValue', false)"
          >
            <span un-text-shadow-xl>{{ action.name }}</span>

            <div
              un-center
              un-bg-dark-primary
              un-w-13
              un-h-13
              un-rounded-full
            >
              <QIcon
                :name="action.icon"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
