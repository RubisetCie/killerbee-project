<template>
    <v-container>
        <Header />
        HOME > CATALOGUE DES FREEZEBEE > AJOUTER UN FREEZEBEE
        <br>
        <!--<div id="head-content">
            <div id="search-content-word">
                <form class="search">
                    <h3>Search:</h3><input name="query" placeholder="Recherche par mot" v-model="query" required/>
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
        </div>-->
        <!--<div v-if="query != ''|| id != null">-->
            <h1 style="text-align: center;">Modèle de Freezebee à ajouter:</h1>
            <form>
                <ul>
                    <li>Nom: 
                        <input name="newModel.name" placeholder="Nom du freezebee" v-model="newModel.name" required/>
                    </li>
                    <li>Référence: 
                        <input name="newModel.reference" placeholder="Référence du freezebee" v-model="newModel.reference" required/>
                    </li>
                    <li>Description: 
                        <input name="newModel.description" placeholder="Description du freezebee" v-model="newModel.description" required/>
                    </li>
                    <li>Gamme: 
                        <input name="newModel.variety" placeholder="Gamme du freezebee" v-model="newModel.variety" required/>
                    </li>
                    <li>Couleur (RGB): 
                        Rouge: <input name="newModel.color.r" placeholder="Hauteur du freezebee" v-model="newModel.color.r" required/>
                        Vert: <input name="newModel.color.g" placeholder="Longueur du freezebee" v-model="newModel.color.g" required/>
                        Bleu: <input name="newModel.color.b" placeholder="Largeur du freezebee" v-model="newModel.color.b" required/>
                    </li>
                    <li>Prix (en €): 
                        <input name="newModel.price" placeholder="Prix du freezebee" v-model="newModel.price" required/>
                    </li>
                    <li>Dimensions (en m^3): 
                        Hauteur: <input name="newModel.dimensions.height" placeholder="Hauteur du freezebee" v-model="newModel.dimensions.height" required/>
                        Longueur: <input name="newModel.dimensions.length" placeholder="Longueur du freezebee" v-model="newModel.dimensions.length" required/>
                        Largeur: <input name="newModel.dimensions.width" placeholder="Largeur du freezebee" v-model="newModel.dimensions.width" required/>
                    </li>
                    <li>Masse (en kg): 
                        <input name="newModel.mass" placeholder="Masse du freezebee" v-model="newModel.mass" required/>
                    </li>
                    <li>Coefficient de portance (en kg.m/s^2): 
                        <input name="newModel.lift" placeholder="Coefficient de portance du freezebee" v-model="newModel.lift" required/>
                    </li>
                </ul>
                <v-btn v-on:click="valider(newModel)" color="#FFBB33" style="float: right;">
                    VALIDER
                </v-btn>
            </form>
        <!--</div>-->
    </v-container>
</template>
<script>
import Header from './HeaderHome.vue'

export default ({
    data: ()=> ({
        query: "",
        id: null,
        modelsQuery:[],
        errorMessage:"",
        newModel:{
            name:"",
            reference: "",
            description: "",
            variety:"",
            color:{
                r:"",
                g:"",
                b:"",
            },
            price:"",
            dimensions:{
                height:"",
                length:"",
                width:"",
            },
            mass:"",
            lift:"",
            needs:[]
        }
    }),
    components:{
        Header
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
        searchById(id){
            console.log(id);
            if(id == ''){
                this.errorMessage = "Veuillez saisir un mot de recherche.";
                console.log(this.errorMessage);
            }else{
                this.$store.dispatch("getByIdModel", id);
                this.modelId = this.$store.state.modelId
            }
        },
        valider(newModel){
            this.newModel.color.r = parseInt(this.newModel.color.r)
            this.newModel.color.g = parseInt(this.newModel.color.g)
            this.newModel.color.b = parseInt(this.newModel.color.b)
            this.newModel.dimensions.height = parseInt(this.newModel.dimensions.height)
            this.newModel.dimensions.length = parseInt(this.newModel.dimensions.length)
            this.newModel.dimensions.width = parseInt(this.newModel.dimensions.width)
            this.newModel.price = parseInt(this.newModel.price)
            this.newModel.mass = parseInt(this.newModel.mass)
            this.newModel.lift = parseInt(this.newModel.lift)
            console.log(this.newModel)
            console.log(newModel)
            this.$store.dispatch("postModel",{newModel: newModel});
            this.$router.push({ name: 'Home' })
        }
    }
})
</script>
