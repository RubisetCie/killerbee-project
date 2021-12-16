<template>
    <v-container>
        <Header />
        <form id="search">
            <h3>Search:</h3><input name="query" placeholder="modifiez-moi" v-model="query" required/>
            <v-icon v-on:click="searchQuery(query)">mdi-magnify</v-icon>
        </form>
        <div v-if="query == ''">
            <v-row>
                <v-col cols="12" sm="4" md="4" lg="3" v-for="model in models" :key="model.id" style="margin-left: auto; margin-right: auto;">
                    <FreezeBee :model="model" />
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-row>
                <v-col cols="12" sm="4" md="4" lg="3" v-for="modelq in modelsQuery" :key="modelq.id" style="margin-left: auto; margin-right: auto;">
                    <FreezeBee :modelq="modelq" />
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import FreezeBee from '../components/Freezebe.vue';
import Header from '../components/HeaderHome.vue'
export default({
    data: ()=> ({
        query: "",
        modelsQuery:[],
        errorMessage:""
    }),
    components:{
        FreezeBee,
        Header
    },
    mounted(){
      this.$store.dispatch("getAllModels");
    },
    computed: {
        models(){
            console.log(typeof(this.$store.state.models))
            return this.$store.state.models;
        }
    },
    methods:{
        searchQuery(query){
            console.log(query);
            if(query == ''){
                this.errorMessage = "Veuillez saisir un mot de recherche.";
                console.log(this.errorMessage);
            }else{
                this.$store.dispatch("getQueryModel", query);
                this.modelsQuery = this.$store.state.modelsQuery
            }
        },
    }
})
</script>
