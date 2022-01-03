<template>
    <v-container>
        <Header />
        <div id="head-content">
            <div id="search-content">
                <form id="search">
                    <h3>Search:</h3><input placeholder="modifiez-moi" v-model="query" required/>
                    <v-icon v-on:click="searchQuery(query)">mdi-magnify</v-icon>
                </form>
            </div>
            <v-spacer></v-spacer>
            <div id="search-content-id">
                <form class="search">
                    <h3>Search:</h3><input placeholder="Recherche par id" v-model="id" />
                    <v-icon v-on:click="searchById(id)">mdi-magnify</v-icon>
                </form> 
            </div>
            <v-spacer></v-spacer>
            <div id="modification">
                <!--<div v-if="role == 'DBA'"></div>-->
                <v-btn v-on:click="$router.push({ name: 'AddModel' }).catch((err) => {})" color="#FFBB33" style="float: right;">
                    <v-icon>mdi-pencil</v-icon>
                    AJOUTER
                </v-btn>
            </div>
            <div id="delete">
                <!--<div v-if="role == 'DBA'"></div>-->
                <v-btn v-on:click="$router.push({ name: 'DeleteModel' }).catch((err) => {})" color="#C70039" style="float: right;">
                    <v-icon>mdi-trash-can</v-icon>
                    DELETE
                </v-btn>
            </div>
        </div>
        <div v-if="query == ''">
            <div v-if="id == null">
                <v-row>
                    <v-col cols="12" sm="4" md="4" lg="3" v-for="model in models" :key="model.model.id" style="margin-left: auto; margin-right: auto;">
                        <FreezeBee :model="model" />
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <!--<FreezebeeID :modelID="modelID" />-->
                <v-card :loading="loading" class="mx-auto my-12" max-width="500">
                    <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                    <v-img class="img" :src= srcPicture></v-img>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-title>Freezebee: {{modelID.name}}</v-card-title>
                    <v-card-text>
                        <ul>
                            <li>Ref: {{modelID.reference}}</li>
                            <li>Gamme : {{modelID.variety}}</li>
                            <li>Masse: {{modelID.mass}} kg</li>
                            <li>Couleur: 
                                <ul>
                                    <li> Rouge: {{modelID.color.r}}; </li>
                                    <li> Vert: {{modelID.color.g}}; </li>
                                    <li> Bleu: {{modelID.color.b}};</li>
                                </ul>
                            </li>
                            <li>Dimensions: 
                                <ul>
                                    <li>Largeur: {{modelID.dimensions.width}} m; </li>
                                    <li>Longueur: {{modelID.dimensions.length}} m; </li>
                                    <li>Hauteur: {{modelID.dimensions.height}} m;</li>
                                </ul>
                            </li>
                            <li>Coefficient de Portance: {{modelID.lift}} kg.m/s^2</li>
                            <li>Prix: {{modelID.price}} €</li>
                        </ul>
                    </v-card-text>
                    <v-card-actions>
                    <v-btn color="deep-purple lighten-2" text @click="fabrication(modelID)">
                        Fabrication
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple lighten-2" text @click="details(modelID)">
                        Détails
                    </v-btn>
                    </v-card-actions>
                </v-card>-->
            </div>
        </div>  
        <div v-else>
            ModelQuery
            <!--<v-row>
                <v-col cols="12" sm="4" md="4" lg="3" v-for="modelq in modelsQuery" :key="modelq.modelq.id" style="margin-left: auto; margin-right: auto;">
                    <FreezeBee :model="modelq" />
                </v-col>
            </v-row>-->
        </div>
    </v-container>
</template>

<script>
import FreezeBee from '../components/Freezebe.vue';
//import FreezebeeID from '../components/FreezebeeID.vue'
import Header from '../components/HeaderHome.vue'
export default({
    data: ()=> ({
        query: "",
        modelsQuery:[],
        errorMessage:"",
        id: null,
        loading: false,
        srcPicture: require("../assets/img/freezebee.jpg"),
    }),
    components:{
        FreezeBee,
        Header,
        //FreezebeeID
    },
    mounted(){
      this.$store.dispatch("getAllModels");
    },
    computed: {
        models(){
            console.log(typeof(this.$store.state.models))
            return this.$store.state.models;
        },
        modelID(){
            console.log(this.$store.state.modelId)
            return this.$store.state.modelId;
        }
    },
    methods:{
        searchQuery(query){
            console.log(query);
            if(query == ''){
                this.errorMessage = "Veuillez saisir un mot de recherche.";
                console.log(this.errorMessage);
            }else{
                console.log("Vue - QueryModel:")
                console.log(query)
                console.log(typeof(query))
                this.$store.dispatch("getQueryModel", query);
                this.modelsQuery = this.$store.state.modelsQuery
            }
        },
        searchById(id){
            console.log("ID saisi: "+ id)
            if(id== ''){
                this.errorMessage = "Veuillez saisir un mot de recherche.";
                console.log(this.errorMessage);
            }else{
                this.$store.dispatch("getByIdModel", {id: id});
            }
        },
        fabrication(model){
            console.log(model)
            this.$store.state.modelChoice = model
            this.$router.push({ name: 'FreezeBeeFabrications' })
        },
        details(model){
            console.log(model)
            this.$store.state.modelChoice = model
            this.$router.push({ name: 'FreezeBeeDetails' })
        }
    }
})
</script>

<style>
    #head-content{
        display: flex;
    }
    #modification{
        margin-right: 20px;
    }
</style>