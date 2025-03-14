<template>
  <div id="app">
    <QRCodeGenerator />
  </div>
</template>

<script>
import QRCodeGenerator from './components/QRCodeGenerator.vue';

export default {
  name: 'App',
  components: {
    QRCodeGenerator,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
  background-color: #f8f9fa;
  padding: 20px;
}
</style>
