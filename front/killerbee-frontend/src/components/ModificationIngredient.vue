<template>
    <v-container>
        <Header />
        HOME > CATALOGUE DES INGREDIENTS > MODIFIER UN INGREDIENT > 
        <div id="head-content">
            <!--<div id="search-content-word">
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
            </div>-->
        </div>
        <!--<div v-if="query != ''|| id != null">-->
            <h1 style="text-align: center;">Ingrédient à ajouter:</h1>
            <form>
                <ul>
                    <li>Nom: 
                        <input name="newIngredient.name" placeholder="Nom de l'ingrédient" v-model="newIngredient.name" required/>
                    </li>
                    <li>Référence: 
                        <input name="newIngredient.reference" placeholder="Référence de l'ingrédient" v-model="newIngredient.reference" required/>
                    </li>
                    <li>Description: 
                        <input name="newIngredient.description" placeholder="Description de l'ingrédient" v-model="newIngredient.description" required/>
                    </li>
                    <li>Type: 
                        <input name="newIngredient.type" placeholder="Type d'ingrédient" v-model="newIngredient.type" required/>
                    </li>
                    <li>Couleur (RGB): 
                        Rouge: <input name="newIngredient.color.r" placeholder="Rouge de l'ingrédient" v-model="newIngredient.color.r" required/>
                        Vert: <input name="newIngredient.color.g" placeholder="Vert de l'ingrédient" v-model="newIngredient.color.g" required/>
                        Bleu: <input name="newIngredient.color.b" placeholder="Bleu de l'ingrédient" v-model="newIngredient.color.b" required/>
                    </li>
                    <li>Prix (en €): 
                        <input name="newIngredient.price" placeholder="Prix de l'ingrédient" v-model="newIngredient.price" required/>
                    </li>
                    <li>Densité (en kg.m^3): 
                        <input name="newIngredient.density" placeholder="Densité de l'ingrédient" v-model="newIngredient.density" required/>
                    </li>
                    <li>Coefficient de portance (en kg.m/s^2): 
                        <input name="newIngredient.lift" placeholder="Coefficient de portance de l'ingrédient" v-model="newIngredient.lift" required/>
                    </li>
                </ul>
                <v-btn v-on:click="valider(newIngredient)" color="#FFBB33" style="float: right;">
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
        newIngredient:{
            name:"",
            reference: "",
            description: "",
            type:"",
            color:{
                r:"",
                g:"",
                b:"",
            },
            price:"",
            density:"",
            lift:"",
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
                this.ingredientsQuery = this.$store.state.ingredientsQuery
            }
        },
        searchById(id){
            console.log(id);
            if(id == ''){
                this.errorMessage = "Veuillez saisir un mot de recherche.";
                console.log(this.errorMessage);
            }else{
                this.$store.dispatch("getByIdModel", id);
                this.ingredientId = this.$store.state.ingredientId
            }
        },
        valider(newIngredient){
            this.newIngredient.color.r = parseInt(this.newIngredient.color.r)
            this.newIngredient.color.g = parseInt(this.newIngredient.color.g)
            this.newIngredient.color.b = parseInt(this.newIngredient.color.b)
            this.newIngredient.dimensions.height = parseInt(this.newIngredient.dimensions.height)
            this.newIngredient.dimensions.length = parseInt(this.newIngredient.dimensions.length)
            this.newIngredient.dimensions.width = parseInt(this.newIngredient.dimensions.width)
            this.newIngredient.price = parseInt(this.newIngredient.price)
            this.newIngredient.mass = parseInt(this.newIngredient.mass)
            this.newIngredient.lift = parseInt(this.newIngredient.lift)
            console.log(this.newIngredient)
            console.log(newIngredient)
            this.$store.dispatch("postIngredient",{newIngredient: newIngredient});
            this.$router.push({ name: 'Home' })
        }
    }
})
</script>
