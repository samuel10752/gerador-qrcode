<template>
  <div>
    <h1>Conteúdo</h1>
    <div v-if="type === 'image'">
      <img :src="content" alt="Imagem" style="max-width: 100%;" />
    </div>
    <div v-else-if="type === 'video'">
      <video controls :src="content" style="max-width: 100%;" />
    </div>
    <div v-else>
      <p>Conteúdo não suportado</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'content'],
};
</script>
