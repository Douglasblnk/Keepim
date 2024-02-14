<script setup lang="ts">
import { getErrorMsg, notify } from '@utils'
import type { CollectionResponse } from '@/types'

const store = useCollectionStore()
const queryClient = useQueryClient()

const { collection } = storeToRefs(store)

function makeCollectionModel(): Partial<Omit<CollectionResponse, 'id' | 'username' | 'photos' | 'cover'>> {
  return {
    collectionName: collection?.value?.collectionName,
    collectionDate: collection?.value?.collectionDate,
    description: collection?.value?.description,
    equipments: [ ...collection?.value?.equipments || [] ],
    participants: [ ...collection?.value?.participants || [] ],
    place: collection?.value?.place,
  }
}

const { mutate, isPending } = useMutation({
  mutationFn: updateCollectionRequest,
  onError: (error) => {
    notify({
      type: 'negative',
      message: getErrorMsg(error) as string,
    })
  },
  onSuccess: async (data) => {
    if (data !== undefined) {
      await notify({
        type: 'positive',
        message: 'Coleção atualizada com sucesso!',
        timeout: 800,
      })

      await queryClient.invalidateQueries({ queryKey: [ 'collection' ], type: 'all' })

      store.$patch({ isEditingInfo: false })
    }
  },
})

const showRemoveParticipantsIcon = ref<Record<string, boolean>>({})
const showRemoveEquipmentsIcon = ref<Record<string, boolean>>({})

const participants = ref('')

const equipmentIcons: Record<string, string> = {
  camera: 'i-mdi-camera-outline',
  lens: 'i-custom-lens',
  flash: 'i-mdi-flash-outline',
  tripod: 'i-custom-tripod',
  memoryCard: 'i-mdi-sd',
  filter: 'i-mdi-filter-outline',
}

const equipmentsType = [
  { name: 'Câmera', type: 'camera' },
  { name: 'Lente', type: 'lens' },
  { name: 'Flash', type: 'flash' },
  { name: 'Tripé', type: 'tripod' },
  { name: 'Cartão de memória', type: 'memoryCard' },
  { name: 'Filtro', type: 'filter' },
]

const equipments = ref({
  type: '',
  name: '',
})

const collectionModel = ref(makeCollectionModel())

function saveEdition() {
  mutate({ body: collectionModel.value, collectionId: store.collection?.id })
}

function cancelEdition() {
  collectionModel.value = {}

  store.$patch({ isEditingInfo: false })
}

function addParticipants() {
  if (participants.value)
    collectionModel.value.participants?.push(participants.value)

  participants.value = ''
}

function addEquipments() {
  if (equipments.value.name && equipments.value.type)
    collectionModel.value.equipments?.push(equipments.value)

  equipments.value = {
    name: '',
    type: '',
  }
}

function removeParticipants(participant: string) {
  const index = collectionModel.value.participants?.indexOf(participant)

  if (index !== undefined && index !== -1)
    collectionModel.value.participants?.splice(index, 1)
}

function removeEquipment(equipment: { name: string; type: string }) {
  const index = collectionModel.value.equipments?.indexOf(equipment)

  if (index !== undefined && index !== -1)
    collectionModel.value.equipments?.splice(index, 1)
}
</script>

<template>
  <div>
    <div
      un-flex
      un-gap-md
      un-justify-center
      un-mb-lg
    >
      <QBtn
        label="Salvar alterações"
        color="primary"
        :loading="isPending"
        @click="saveEdition"
      />

      <QBtn
        label="Cancelar edição"
        color="cancel"
        :loading="isPending"
        @click="cancelEdition"
      />
    </div>

    <div
      un-space-y-md
      un-mb-60px
    >
      <div
        un-bg="dark-primary/40"
        un-p="y-md x-lg"
        un-rounded-xl
        un-relative
      >
        <span un-font-bold>Informações básicas</span>

        <div
          un-flex="~ col md:row"
          un-md-gap-md
          un-mt-md
        >
          <KInput
            v-model="collectionModel.collectionName"
            label="Nome da coleção"
            name="nome da coleção"
            vee-rules="required"
            class="w-col-12 md:w-col-7"
            @clear="collectionModel.collectionName = ''"
          />

          <KInputDate
            v-model="collectionModel.collectionDate"
            label="Data da coleção"
            name="data da coleção"
            vee-rules="required"
            class="w-col-12 md:w-col-5"
            @clear="collectionModel.collectionDate = ''"
          />
        </div>

        <KInput
          v-model="collectionModel.description"
          type="textarea"
          label="Descrição da coleção"
          class="w-col-12 md:w-col-7 pb-none"
          hide-bottom-space
          autogrow
        />
      </div>

      <div
        un-bg="dark-primary/40"
        un-p="y-md x-lg"
        un-rounded-xl
        un-space-y-md
        un-transition="~ height"
      >
        <span un-font-bold>Participantes</span>

        <KInput
          v-model="participants"
          label="Adicione participantes à coleção"
          bg-color="red"
          class="pb-none"
          hide-bottom-space
          @keypress.enter="addParticipants"
        >
          <template #append>
            <QIcon
              name="i-mdi-send"
              un-cursor-pointer
              @click="addParticipants"
            />
          </template>
        </KInput>

        <TransitionGroup
          tag="div"
          name="slide-down"
          un-space-y-xs
        >
          <div
            v-for="(participant, index) in collectionModel.participants"
            :key="`participant-${index}`"
            un-bg-dark-primary
            un-p-sm
            un-rounded-xl
            un-flex
            un-justify-between
            un-items-center
            @mouseover="showRemoveParticipantsIcon[participant] = true"
            @mouseleave="showRemoveParticipantsIcon[participant] = false"
          >
            <div
              un-flex
              un-items-center
              un-gap-sm
            >
              <KAvatar
                :label="participant"
                un-bg-primary
                un-mr-sm
              />

              <span>{{ participant }}</span>
            </div>

            <Transition name="fade">
              <QBtn
                v-show="showRemoveParticipantsIcon[participant]"
                icon="i-mdi-close"
                un-rounded-full
                un-p-none
                round
                flat
                @click="removeParticipants(participant)"
              />
            </Transition>
          </div>
        </TransitionGroup>
      </div>

      <div
        un-bg="dark-primary/40"
        un-p="y-md x-lg"
        un-rounded-xl
        un-space-y-md
      >
        <span un-font-bold>Equipamentos</span>

        <div
          un-flex="~ col lg:row"
          un-lg-gap-md
        >
          <KSelect
            v-model="equipments.type"
            label="Tipo do equipmento"
            option-label="name"
            option-value="type"
            name="tipo equipamento"
            class="w-col-12 lg:w-col-5 pb-none"
            :options="equipmentsType"
            hide-bottom-space
            emit-value
          >
            <template #option="{ itemProps, opt }">
              <QItem v-bind="itemProps">
                <QItemSection avatar>
                  <QIcon :name="equipmentIcons[opt.type]" />
                </QItemSection>

                <QItemSection un-space-y-sm>
                  <span un-font-bold>{{ opt.name }}</span>
                </QItemSection>
              </QItem>
            </template>
          </KSelect>

          <KInput
            v-model="equipments.name"
            label="Adicione equipamentos à coleção"
            bg-color="red"
            class="lg:w-col-7 pb-none"
            hide-bottom-space
            @keypress.enter="addEquipments"
          >
            <template #append>
              <QIcon
                name="i-mdi-send"
                un-cursor-pointer
                @click="addEquipments"
              />
            </template>
          </KInput>
        </div>

        <TransitionGroup
          tag="div"
          name="slide-down"
          un-space-y-xs
        >
          <div
            v-for="(equipment, index) in collectionModel.equipments"
            :key="`equipment-${index}`"
            un-gap-sm
            un-flex
            un-items-center
            un-bg-dark-primary
            un-p-sm
            un-rounded-xl
            un-justify-between
            @mouseover="showRemoveEquipmentsIcon[equipment.name] = true"
            @mouseleave="showRemoveEquipmentsIcon[equipment.name] = false"
          >
            <div
              un-flex
              un-items-center
              un-gap-sm
              un-h-11
            >
              <QIcon
                :name="equipmentIcons[equipment.type]"
                size="sm"
              />

              <span>{{ equipment.name }}</span>
            </div>

            <Transition name="fade">
              <QBtn
                v-show="showRemoveEquipmentsIcon[equipment.name]"
                icon="i-mdi-close"
                un-rounded-full
                un-p-none
                round
                flat
                @click="removeEquipment(equipment)"
              />
            </Transition>
          </div>
        </TransitionGroup>
      </div>

      <div
        un-bg="dark-primary/40"
        un-p="y-md x-lg"
        un-rounded-xl
        un-space-y-md
      >
        <span un-font-bold>Adicione um local</span>

        <div
          un-flex
          un-items-center
          un-gap-sm
        >
          <KInput
            v-model="collectionModel.place"
            label="Local"
            class="w-col-12 pb-none"
            hide-bottom-space
          >
            <template #prepend>
              <QIcon
                name="i-mdi-map-marker-outline"
                size="sm"
              />
            </template>
          </KInput>
        </div>
      </div>
    </div>
  </div>
</template>
