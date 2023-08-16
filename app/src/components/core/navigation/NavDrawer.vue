<script setup lang="ts">
import IconHome from '~icons/mdi/home-outline'
import IconFolder from '~icons/mdi/folder-outline'
import IconList from '~icons/mdi/format-list-bulleted'

import IconAddFolder from '~icons/mdi/folder-plus-outline'
import IconAddImage from '~icons/mdi/image-plus-outline'
import IconAddCategory from '~icons/mdi/tag-plus-outline'

const route = useRoute()
const { push } = useRouter()
const { setDialog } = useDialog()
const { storageState, setStorageState } = useLocalStorage()

const miniState = ref(storageState.value['drawer-mini-state'] === 'true')
const miniStateTransition = ref(storageState.value['drawer-mini-state'] === 'true')

const items = [
  {
    name: 'Navegação',
    children: [
      {
        name: 'Home',
        icon: IconHome,
        isActive: computed(() => route.name === 'home'),
        action: () => push('/'),
      },
      {
        name: 'Coleções',
        icon: IconFolder,
        isActive: computed(() => [ 'collections-id', 'collections' ].includes(route.name as string)),
        action: () => push('/colecoes'),
      },
      {
        name: 'Explorar',
        icon: IconList,
        isActive: computed(() => route.name === 'explore'),
        action: () => push('/explorar'),
      },
    ],
  },
  {
    name: 'Ações',
    children: [
      {
        name: 'Nova coleção',
        icon: IconAddFolder,
        action: () => setDialog({ component: 'CreateCollectionDialog' }),
      },
      {
        name: 'Nova imagem',
        icon: IconAddImage,
        action: () => setDialog({ component: 'AddImageDialog' }),
      },
      {
        name: 'Nova categoria',
        icon: IconAddCategory,
        action: () => setDialog({ component: 'AddCategoryDialog' }),
      },
    ],
  },
]

function toggleMiniState() {
  miniState.value = !miniState.value

  setTimeout(() => {
    miniStateTransition.value = miniState.value
  }, 130)

  storageState.value['drawer-mini-state'] = miniState.value
}

onMounted(() => {
  if (storageState.value['drawer-mini-state'] === undefined)
    setStorageState('drawer-mini-state', miniState.value)
})

defineExpose({
  miniState,
  miniStateTransition,
})
</script>

<template>
  <QDrawer
    behavior="desktop"
    mini-to-overlay
    overlay
    persistent
    :mini="miniState"
    :mini-width="90"
  >
    <div
      un-flex
      un-justify-center
      un-pa-lg
    >
      <KeepimTitle
        :title="miniState ? 'K' : 'Keepim'"
        size="4xl"
        un-cursor-pointer
        @click="toggleMiniState"
      />
    </div>

    <NavDrawerItems
      :items="items"
      :mini-state="miniState"
    />
  </QDrawer>
</template>
