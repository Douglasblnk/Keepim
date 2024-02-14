<script setup lang="ts">
const store = useCollectionStore()

const { collection, isEditingInfo } = storeToRefs(store)

const equipmentIcons: Record<string, string> = {
  camera: 'i-mdi-camera-outline',
  lens: 'i-custom-lens',
  flash: 'i-mdi-flash-outline',
  tripod: 'i-custom-tripod',
  memoryCard: 'i-mdi-sd',
  filter: 'i-mdi-filter-outline',
}

const missingDetails = computed(() => {
  return !collection?.value?.participants?.length
    && !collection?.value?.equipments?.length
    && !collection?.value?.place
})

function editDetails() {
  store.$patch({ isEditingInfo: true })
}
</script>

<template>
  <Transition
    name="slide-up"
    mode="out-in"
  >
    <CollectionViewDetailsForm v-if="isEditingInfo" />

    <div v-else>
      <div
        un-flex="~ col"
        un-gap-md
        un-items-center
        un-mb-lg
      >
        <span
          un-text="lg center"
        >
          {{ collection?.collectionName }}
        </span>

        <span
          v-if="collection?.description"
          un-w-col-11
          un-md-w-col-7
          un-text="center gray-text"
        >
          {{ collection?.description }}
        </span>
      </div>

      <div
        v-if="!missingDetails"
        un-space-y-md
        un-mb-30px
      >
        <div
          v-if="collection?.participants?.length"
          un-bg="dark-primary/40"
          un-p="y-md x-lg"
          un-rounded-xl
          un-space-y-md
        >
          <span un-font-bold>Participantes:</span>

          <div
            v-for="(participant, index) in collection?.participants"
            :key="`participant-${index}`"
            un-gap-sm
          >
            <KAvatar
              :label="participant"
              un-bg-primary
              un-mr-sm
            />

            <span>{{ participant }}</span>
          </div>
        </div>

        <div
          v-if="collection?.equipments?.length"
          un-bg="dark-primary/40"
          un-p="y-md x-lg"
          un-rounded-xl
          un-space-y-md
        >
          <span un-font-bold>Equipamentos:</span>

          <div
            v-for="(equipment, index) in collection?.equipments"
            :key="`equipment-${index}`"
            un-gap-sm
            un-flex
            un-items-center
          >
            <QIcon
              :name="equipmentIcons[equipment.type]"
              size="sm"
            />

            <span>{{ equipment.name }}</span>
          </div>
        </div>

        <div
          v-if="collection?.place"
          un-bg="dark-primary/40"
          un-p="y-md x-lg"
          un-rounded-xl
          un-space-y-md
        >
          <span un-font-bold>Local:</span>

          <div
            un-flex
            un-items-center
            un-gap-sm
          >
            <QIcon
              name="i-mdi-map-marker-outline"
              size="sm"
            />

            <span>{{ collection?.place }}</span>
          </div>
        </div>
      </div>

      <div
        v-else
        un-mt-6xl
        un-flex="~ col"
        un-items-center
        un-gap-md
        un-text-gray-text
      >
        <span>Não há detalhes para esta coleção</span>

        <QBtn
          label="Adicionar detalhes"
          color="primary"
          icon="i-mdi-plus"
          @click="editDetails"
        />
      </div>
    </div>
  </Transition>
</template>
