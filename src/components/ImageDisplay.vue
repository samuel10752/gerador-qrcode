<template>
    <div>
      <h1>Imagem</h1>
      <img :src="imageUrl" alt="Imagem" style="max-width: 100%;" />
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      imageUrl() {
        const uniqueId = this.$route.query.id;
        return `http://localhost:8080/uploads/${uniqueId}.png`;
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin-top: 20px;
  }
  img {
    display: block;
    margin: 20px auto;
  }
  </style>
  