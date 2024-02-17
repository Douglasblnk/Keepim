<script setup lang="ts">
import type { QMenu } from 'quasar'

const props = defineProps<{
  sortBy: string
  orderBy: string
  sortOptions?: {
    label: string
    value: string
  }[]
}>()

const emit = defineEmits([ 'update:sortBy', 'update:orderBy', 'clear' ])

const { orderBy, sortBy } = useVModels(props, emit)

const internalSortBy = ref(sortBy.value || '')
const internalOrderBy = ref(orderBy.value || 'DESC')

const menuRef = ref<QMenu | null>(null)

const isMobile = inject<ComputedRef<boolean>>('isMobile')

const orders = [
  {
    label: isMobile?.value ? 'Maior' : 'Maior para menor',
    value: 'DESC',
    icon: 'i-mdi-sort-descending',
  },
  {
    label: isMobile?.value ? 'Menor' : 'Menor para maior',
    value: 'ASC',
    icon: 'i-mdi-sort-ascending',
  },
]

function applySort() {
  sortBy.value = internalSortBy.value
  orderBy.value = internalOrderBy.value

  menuRef.value?.hide()
}

function selectOption(value: string) {
  internalSortBy.value = value
}

function clear() {
  emit('clear')

  menuRef.value?.hide()
}

watch(() => [ sortBy.value, orderBy.value ], ([ sort, order ]) => {
  internalSortBy.value = sort
  internalOrderBy.value = order
})
</script>

<template>
  <div
    un-flex
    un-items-center
  >
    <div
      un-cursor-pointer
      un-select-none
    >
      <div
        un-bg-primary
        un-rounded-full
        un-p-sm
        un-shadow
        un-cursor-pointer
        un-transition
        un-hover-scale-110
      >
        <QIcon
          name="i-mdi-filter-outline"
          size="sm"
        />
      </div>

      <QPopupProxy
        ref="menuRef"
        self="top right"
        anchor="bottom right"
        :offset="[0, 10]"
        transition-show="jump-down"
        transition-hide="jump-up"
        un-border-none
      >
        <QList
          un-p-md
          un-space-y-lg
        >
          <div
            un-flex="~ col"
            un-gap-md
          >
            <span
              un-font-bold
              un-text-md
            >
              Ordenar por:
            </span>

            <QBtnToggle
              v-model="internalOrderBy"
              :options="orders"
              unelevated
              un-rounded-full
              un-bg-gray-bg
            />
          </div>

          <template v-if="sortOptions?.length">
            <div
              un-flex="~ col"
              un-rounded-2xl
            >
              <span
                un-font-bold
                un-text-md
                un-mb-md
              >
                Filtrar por:
              </span>

              <QItem
                v-for="option in sortOptions"
                v-ripple
                :key="option?.value"
                :active="option?.value === internalSortBy"
                clickable
                @click="selectOption(option.value)"
              >
                <QItemSection>{{ option.label }}</QItemSection>
              </QItem>
            </div>
          </template>

          <div
            un-flex
            un-gap-sm
          >
            <QBtn
              un-w-full
              unelevated
              rounded
              color="cancel"
              label="Limpar"
              @click="clear"
            />

            <QBtn
              un-w-full
              unelevated
              rounded
              color="primary"
              label="Aplicar"
              @click="applySort"
            />
          </div>
        </QList>
      </QPopupProxy>
    </div>
  </div>
</template>
