<script setup>
import useAlert from '@composables/use-alert';
import useRequest from '@/composables/use-request';
import { getToken } from '@/utils/token';

const { useAxios } = useRequest();
const { setAlert } = useAlert();

const showModal = ref(false);
const modalComponent = shallowRef(null);
const modalProps = ref(null);
const modalRef = ref(null);
const lastFolders = ref([]);

const isComponent = computed(() => modalComponent.value);

const executeAction = (component) => {
  modalComponent.value = defineAsyncComponent(
    () => import(`../components/organisms/${component}.vue`),
  );

  showModal.value = true;
};

const openImage = (item) => {
  modalComponent.value = defineAsyncComponent(
    () => import('../components/molecules/ImgModal.vue'),
  );

  modalProps.value = item;
  showModal.value = true;
};

const closeModal = () => {
  modalProps.value = null;
  showModal.value = false;
};

const getLastFolders = async() => {
  const { data, error } = await useAxios('folder')
    .get({
      headers: {
        limit: 4,
        token: `Bearer ${getToken()}`,
      },
    });

  if (error && error.status !== 200) {
    return setAlert({
      type: 'negative',
      text: error.data,
    });
  }

  lastFolders.value = data;
};

getLastFolders();

const lastImages = [
  { url: 'https://previews.123rf.com/images/captblack76/captblack761210/captblack76121000063/15975743-vertical-view-of-eiffel-tower-and-cityscape-paris-france.jpg' },
  { url: 'https://marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png' },
  { url: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg' },
  { url: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg' },
  { url: 'https://marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png' },
  { url: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg' },
  { url: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg' },
  { url: 'https://marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png' },
  { url: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg' },
];
</script>

<template>
  <div
    w:w="md:4/12"
    w:m="x-auto"
    w:p="b-[150px]"
    w:text="white"
  >
    <PhotoKeepTitle />

    <div w:m="x-lg md:auto">
      <SlideContent
        title="Ultimas imagens"
        w:m="b-xl"
        :items="lastImages"
      >
        <template #default="item">
          <Img
            w:w="200px"
            :url="item.url"
            clickable
            @click="openImage(item)"
          />
        </template>
      </SlideContent>

      <SlideContent
        title="Ultimas pastas"
        w:m="b-xl"
        :items="lastFolders"
      >
        <template #default="item">
          <Folder
            :name="item.name"
            :date="item.date"
            :images="item.images"
          />
        </template>
      </SlideContent>

      <ShortcutAction
        @add-folder="executeAction('AddFolderModal')"
        @add-image="executeAction('AddImageModal')"
        @add-category="executeAction('AddCategoryModal')"
      />

      <Modal
        ref="modalRef"
        v-model="showModal"
        @close="closeModal"
      >
        <Component
          :is="isComponent"
          v-bind="modalProps"
          @close="modalRef.closeModal()"
        />
      </Modal>
    </div>
  </div>
</template>
