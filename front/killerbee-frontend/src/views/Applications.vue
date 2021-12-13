<template>
    <v-container>
        <Header />
        <Content />
    </v-container>
</template>

<script>
import Header from '../components/HeaderApp.vue';
import Content from '../components/ContentApp.vue';
export default ({
  components: {Header, Content},
});
</script>
