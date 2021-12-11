<template>
  <v-app>
    <Header />
    <v-main>
      <Contenu />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/HeaderApp.vue';
import Footer from './components/Footer.vue';
import Contenu from './components/ContentApp.vue'
export default Vue.extend({
  components: {Header,Footer, Contenu},
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
