<script setup>
const showModal = ref(false);
const modalComponent = shallowRef(null);
const modalProps = ref(null);
const modalRef = ref(null);

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

const poxa = () => {
  console.log(modalRef.value);
};

console.log('modalRef :>> ', modalRef);

const isComponent = computed(() => modalComponent.value);

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

const lastFolders = [
  {
    title: 'Keila e Letícia',
    date: '12.08.21',
    images: [
      { url: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg' },
      { url: 'https://marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png' },
      { url: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg' },
      { url: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg' },
      { url: 'https://marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png' },
    ],
  },
  {
    title: 'Alison e Will',
    date: '10.10.21',
    images: [
      { url: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg' },
      { url: 'https://marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png' },
      { url: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg' },
      { url: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg' },
      { url: 'https://marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png' },
    ],
  },
  {
    title: 'Keila e Letícia',
    date: '12.08.21',
    images: [
      { url: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg' },
      { url: 'https://marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png' },
      { url: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg' },
      { url: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg' },
      { url: 'https://marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png' },
    ],
  },
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
        title="Ultimas imagens"
        w:m="b-xl"
        :items="lastFolders"
      >
        <template #default="item">
          <Folder
            :title="item.title"
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
