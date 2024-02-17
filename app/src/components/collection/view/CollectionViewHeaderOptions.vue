<script setup lang="ts">
import { getErrorMsg, notify } from '@/utils'

defineProps<{ contextMenu?: boolean }>()

const emit = defineEmits<{
  editCollection: []
  openAddImageDialog: []
  removePhotoAction: []
  addCoverAction: []
  makeFavorite: []
  deleteCollectionAction: []
}>()

const queryClient = useQueryClient()

const store = useCollectionStore()

const { collection } = storeToRefs(store)

const menuActions = ref()

const {
  mutate,
  isPending,
} = useMutation({
  mutationFn: makeCollectionFavoriteRequest,
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
        message: 'Coleção favoritada',
        timeout: 800,
      })

      menuActions.value.hide()

      queryClient.invalidateQueries({ queryKey: [ 'collection' ] })
      queryClient.invalidateQueries({ queryKey: [ 'collections-list' ] })
    }
  },
})

function makeFavorite() {
  if (collection?.value?.id)
    mutate(collection.value.id)
}
</script>

<template>
  <QPopupProxy
    ref="menuActions"
    transition-show="jump-down"
    transition-hide="jump-up"
    :context-menu="contextMenu"
  >
    <QList un-min-w-260px>
      <QItem
        v-if="!contextMenu"
        un-p-y-none
        un-md-p-r-none
        un-sticky
        un-top-0
        un-mb-sm
        un-z-1
        un-bg-dark-primary
      >
        <QItemSection un-title>
          Ações
        </QItemSection>

        <QItemSection side>
          <QBtn
            icon="i-mdi-close"
            round
            un-rounded-full
            un-p-none
            flat
            @click="menuActions.hide()"
          />
        </QItemSection>
      </QItem>

      <QItem
        v-if="!contextMenu"
        clickable
        @click="emit('editCollection'); menuActions.hide()"
      >
        <QItemSection
          avatar
          un-min-w-auto
        >
          <QIcon :name="store.isEditingInfo ? 'i-mdi-pencil-remove-outline' : 'i-mdi-pencil-outline'" />
        </QItemSection>

        <QItemSection un-text-gray>
          {{ store.isEditingInfo ? 'Cancelar edição' : 'Editar coleção' }}
        </QItemSection>
      </QItem>

      <QItem
        v-if="!contextMenu"
        clickable
        @click="emit('openAddImageDialog'); menuActions.hide()"
      >
        <QItemSection
          avatar
          un-min-w-auto
        >
          <QIcon name="i-mdi-image-plus-outline" />
        </QItemSection>

        <QItemSection un-text-gray>
          Adicionar imagens
        </QItemSection>
      </QItem>

      <QItem
        v-if="!contextMenu"
        clickable
        @click="makeFavorite"
      >
        <QItemSection
          avatar
          un-min-w-auto
        >
          <QIcon
            v-if="!isPending"
            :name="collection?.favorite ? 'i-mdi-heart' : 'i-mdi-heart-outline'"
          />

          <QIcon
            v-else
            name="i-mdi-loading"
            class="animate-spin"
          />
        </QItemSection>

        <QItemSection un-text-gray>
          {{ collection?.favorite ? 'Desfavoritar coleção' : 'Favoritar coleção' }}
        </QItemSection>
      </QItem>

      <QSeparator
        v-if="collection?.photos?.imgs?.length && !contextMenu"
        spaced="md"
      />

      <QItem
        v-if="collection?.photos?.imgs?.length"
        clickable
        @click="emit('addCoverAction'); menuActions.hide()"
      >
        <QItemSection
          avatar
          un-min-w-auto
        >
          <QIcon name="i-mdi-image-frame" />
        </QItemSection>

        <QItemSection un-text-gray>
          Definir {{ contextMenu ? 'como' : '' }} capa
        </QItemSection>
      </QItem>

      <QItem
        v-if="collection?.photos?.imgs?.length"
        clickable
        @click="emit('removePhotoAction'); menuActions.hide()"
      >
        <QItemSection
          avatar
          un-min-w-auto
        >
          <QIcon name="i-mdi-trash-can-outline" />
        </QItemSection>

        <QItemSection un-text-gray>
          Remover {{ contextMenu ? 'foto' : 'fotos' }}
        </QItemSection>
      </QItem>

      <QSeparator
        v-if="!contextMenu"
        spaced="md"
      />

      <QItem
        v-if="!contextMenu"
        clickable
        un-color-negative
        @click="emit('deleteCollectionAction'); menuActions.hide()"
      >
        <QItemSection
          avatar
          un-min-w-auto
        >
          <QIcon name="i-mdi-folder-remove-outline" />
        </QItemSection>

        <QItemSection>
          Excluir coleção
        </QItemSection>
      </QItem>
    </QList>
  </QPopupProxy>
</template>
