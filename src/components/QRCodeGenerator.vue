<template>
  <div>
    <h1>Gerador de QRCode</h1>
    <div class="options">
      <div class="option" @click="setContentType('text')">
        <font-awesome-icon icon="file-alt" size="2x" />
        <p>Gerar QR Code de Texto</p>
      </div>
      <div class="option" @click="setContentType('url')">
        <font-awesome-icon icon="globe" size="2x" />
        <p>Gerar QR Code de URL</p>
      </div>
      <div class="option" @click="setContentType('video')">
        <font-awesome-icon icon="video" size="2x" />
        <p>Gerar QR Code de Vídeo</p>
      </div>
      <div class="option" @click="setContentType('image')">
        <font-awesome-icon icon="image" size="2x" />
        <p>Gerar QR Code de Imagem</p>
      </div>
    </div>
    <div v-if="contentType">
      <div v-if="contentType === 'text' || contentType === 'url' || contentType === 'video'">
        <div class="input-group">
          <font-awesome-icon :icon="iconType" class="input-icon" />
          <input type="text" v-model="content" :placeholder="placeholderText" />
        </div>
      </div>
      <div v-else-if="contentType === 'image'">
        <div class="input-group">
          <font-awesome-icon icon="image" class="input-icon" />
          <input type="file" @change="onFileChange" />
        </div>
        <div class="input-group">
          <font-awesome-icon icon="link" class="input-icon" />
          <input type="text" v-model="contentUrl" placeholder="Digite o URL da imagem" />
        </div>
      </div>
      <button @click="generateQRCode">Gerar QRCode</button>
    </div>
    <div v-if="loading" class="loading-spinner"></div>
    <canvas v-show="!loading" ref="canvas"></canvas>
    <div v-if="imageSrc && !loading">
      <h2>Pré-visualização da Imagem</h2>
      <img :src="imageSrc" alt="Pré-visualização" style="max-width: 200px; margin: 20px auto;" />
    </div>
  </div>
</template>

<script>
import QRious from 'qrious';

export default {
  data() {
    return {
      contentType: null,
      content: '',
      contentUrl: '',
      imageSrc: null,
      loading: false,
    };
  },
  computed: {
    placeholderText() {
      switch (this.contentType) {
        case 'url': return 'Digite a URL';
        case 'video': return 'Digite o URL do vídeo';
        case 'image': return 'Anexe uma imagem ou digite o URL';
        default: return 'Digite o texto';
      }
    },
    iconType() {
      switch (this.contentType) {
        case 'url': return 'globe';
        case 'video': return 'video';
        case 'image': return 'image';
        default: return 'file-alt';
      }
    },
  },
  methods: {
    setContentType(type) {
      this.contentType = type;
      this.content = '';
      this.contentUrl = '';
      this.imageSrc = null;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageSrc = event.target.result;
          this.content = event.target.result;
          this.contentUrl = `data:image/png;base64,${event.target.result.split(',')[1]}`;
        };
        reader.readAsDataURL(file);
      }
    },
    generateQRCode() {
      if (!this.content && !this.contentUrl) {
        alert('Por favor, insira o conteúdo para gerar o QR Code.');
        return;
      }
      this.loading = true;
      setTimeout(() => {
        new QRious({
          element: this.$refs.canvas,
          value: this.contentUrl || this.content,
          size: 200,
        });
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f0f8ff;
}

h1 {
  text-align: center;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.option {
  text-align: center;
  cursor: pointer;
}

.option p {
  margin-top: 10px;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.input-icon {
  margin-right: 10px;
}

select,
input {
  padding: 10px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

button:hover {
  background-color: #0056b3;
}

canvas {
  display: block;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  display: block;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
