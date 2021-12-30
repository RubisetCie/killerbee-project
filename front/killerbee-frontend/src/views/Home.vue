<template>
    <v-container>
        <Header />
        <div id="head-content">
            <div id="search-content">
                <form id="search">
                    <h3>Search:</h3><input name="query" placeholder="modifiez-moi" v-model="query" required/>
                    <v-icon v-on:click="searchQuery(query)">mdi-magnify</v-icon>
                </form>
            </div>
            <v-spacer></v-spacer>
            <div id="search-content-id">
                <form class="search">
                    <h3>Search:</h3><input name="id" placeholder="Recherche par id" v-model="id" required/>
                    <v-icon v-on:click="searchById(id)">mdi-magnify</v-icon>
                </form> 
            </div>
            <v-spacer></v-spacer>
            <div id="modification">
                <!--<div v-if="role == 'DBA'"></div>-->
                <v-btn v-on:click="$router.push({ name: 'ModificationModel' }).catch((err) => {})" color="#FFBB33" style="float: right;">
                    MODIFIER
                </v-btn>
            </div>
        </div>
        <div v-if="query == ''">
            <v-row>
                <v-col cols="12" sm="4" md="4" lg="3" v-for="model in models" :key="model.model.id" style="margin-left: auto; margin-right: auto;">
                    <FreezeBee :model="model" />
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-row>
                <v-col cols="12" sm="4" md="4" lg="3" v-for="modelq in modelsQuery" :key="modelq.modelq.id" style="margin-left: auto; margin-right: auto;">
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
        errorMessage:"",
        id: null
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

<style>
    #head-content{
        display: flex;
    }
</style>