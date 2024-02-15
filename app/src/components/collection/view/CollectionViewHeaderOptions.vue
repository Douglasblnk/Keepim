<script setup lang="ts">
defineProps<{ contextMenu?: boolean }>()

const emit = defineEmits<{
  editCollection: []
  openAddImageDialog: []
  removePhotoAction: []
  addCoverAction: []
  deleteCollectionAction: []
}>()

const store = useCollectionStore()

const { collection } = storeToRefs(store)

const menuActions = ref()
</script>

<template>
  <QPopupProxy
    ref="menuActions"
    transition-show="jump-down"
    transition-hide="jump-up"
    :context-menu="contextMenu"
    auto-close
  >
    <QList un-min-w-260px>
      <QItem
        v-if="!contextMenu"
        un-pr-none
        un-pt-none
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
        @click="emit('editCollection')"
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
        v-if="collection?.photos?.imgs?.length"
        clickable
        @click="emit('addCoverAction')"
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
        v-if="!contextMenu"
        clickable
        @click="emit('openAddImageDialog')"
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
        v-if="collection?.photos?.imgs?.length"
        clickable
        @click="emit('removePhotoAction')"
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

      <QItem
        v-if="!contextMenu"
        clickable
        un-color-negative
        @click="emit('deleteCollectionAction')"
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
