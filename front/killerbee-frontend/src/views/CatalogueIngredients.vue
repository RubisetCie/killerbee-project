<template>
    <v-container>
        <Header />
        <div id="head-content">
            <div id="search-content">
                <form id="search">
                    <h3>Search:</h3><input placeholder="Recherche par mot" v-model="query" required/>
                    <v-icon v-on:click="searchQuery(query)">mdi-magnify</v-icon>
                </form>
            </div>
            <v-spacer></v-spacer>
            <div id="search-content-id">
                <form class="search">
                    <h3>Search:</h3><input placeholder="Recherche par id" v-model="id" required/>
                    <v-icon v-on:click="searchById(id)">mdi-magnify</v-icon>
                </form> 
            </div>
            <v-spacer></v-spacer>
            <div id="modification">
                <!--<div v-if="role == 'DBA'"></div>-->
                <v-btn v-on:click="$router.push({ name: 'AddIngredient' }).catch((err) => {})" color="#FFBB33" style="float: right;">
                  <v-icon>mdi-pencil</v-icon>
                    AJOUTER
                </v-btn>
            </div>
            <div id="delete">
                <!--<div v-if="role == 'DBA'"></div>-->
                <v-btn v-on:click="$router.push({ name: 'DeleteIngredient' }).catch((err) => {})" color="#C70039" style="float: right;">
                    <v-icon>mdi-trash-can</v-icon>
                    DELETE
                </v-btn>
            </div>
        </div>
        <br>
        <div v-if="query == ''">
            <div v-if="id == null">
                <table>
                    <thead>
                        <tr>
                            <th v-for="title in ingredientsTitle" :key="title">
                                {{ title | capitalize }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ingredient in ingredients" :key="ingredient.ingredient.id">
                            <td v-for="title in ingredientsTitle" :key="title">
                                {{ingredient.ingredient[title]}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <table>
                    <thead>
                        <tr>
                            <th v-for="title in ingredientsTitle" :key="title">
                                {{ title | capitalize }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ingredient in ingredientID" :key="ingredient.id">
                            <td v-for="title in ingredientsTitle" :key="title">
                                {{ingredient[title]}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>
            <div>
                {{ingredientsQuery}}
            </div>
            <table>
                <thead>
                    <tr>
                        <th v-for="title in ingredientsTitle" :key="title">
                            {{ title | capitalize }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ingredient in ingredientsQuery" :key="ingredient.id">
                        <td v-for="title in ingredientsTitle" :key="title">
                            {{ingredient.ingredient[title]}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>
</template>
<script type="text/x-template" id="grid-template">
import Header from '../components/HeaderCatalogue.vue'

export default{
    data: ()=> ({
        query: "",
        ingredientsQuery:[],
        errorMessage:"",
        id: null
    }),
    filters: {
          capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
          }
    },
    components:{
        Header
    },
    mounted(){
      this.$store.dispatch("getAllIngredients");

    },
    computed:{
        ingredients(){
            console.log(typeof(this.$store.state.ingredients))
            return this.$store.state.ingredients
        },
        ingredientsTitle(){
            return this.$store.state.ingredientsTitle
        },
        ingredientID(){
            return this.$store.state.ingredientId
        }
    },
    methods: {
        searchQuery(query){
            console.log(query);
            if(query == ''){
                this.errorMessage = "Veuillez saisir un mot de recherche.";
                console.log(this.errorMessage);
            }else{
                this.$store.dispatch("getQueryIngredients", query);
                this.ingredientsQuery = this.$store.state.ingredientsQuery
            }
        },
        sortBy(key) {
            this.sortKey = key;
        },
        searchById(id){
            console.log("ID saisi: "+ id)
            if(id== ''){
                this.errorMessage = "Veuillez saisir un mot de recherche.";
                console.log(this.errorMessage);
            }else{
                this.$store.dispatch("getByIdIngredient", {id: id});
            }
        },
    }
}
</script>

<style>
    body {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 14px;
    color: #444;
    }

    table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
    }

    th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }

    td {
    background-color: #f9f9f9;
    }

    th,
    td {
    min-width: 120px;
    padding: 10px 20px;
    }

    th.active {
    color: #fff;
    }

    th.active .arrow {
    opacity: 1;
    }

    .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
    }

    .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
    }

</style>