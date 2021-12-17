<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from './components/Footer.vue';
export default Vue.extend({
  components: {Footer}, 
  name: 'App',
  
  data: () => ({
    //  
  }),
});
</script>
