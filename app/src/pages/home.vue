<script setup>
const showModal = ref(false);

const addFolder = () => {
  showModal.value = true;
};

const items = [
  { url: 'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg' },
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
    w:w="md:6/12"
    w:m="x-auto"
    w:text="white"
  >
    <PhotoKeepTitle />

    <div w:m="x-lg md:auto">
      <SlideContent
        title="Ultimas imagens"
        w:m="b-xl"
        :items="items"
      />

      <ShortcutAction
        w:p="b-[150px]"
        @add-folder="addFolder"
      />

      <Modal
        v-model="showModal"
        @close="showModal = false"
      />
    </div>
  </div>
</template>
