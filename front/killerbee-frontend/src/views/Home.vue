<template>
    <v-container>
        <Header />
        <v-row>
            <v-col cols="12" sm="4" md="4" lg="3" v-for="model in models" :key="model.id" style="margin-left: auto; margin-right: auto;">
                <FreezeBee :model="model" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FreezeBee from '../components/Freezebe.vue';
import Header from '../components/HeaderHome.vue'
export default({
    components:{
        FreezeBee,
        Header
    },
    mounted(){
      this.$store.dispatch("getAllModels");
    },
    computed: {
        models(){
            return this.$store.state.models;
        }
    }
})
</script>
