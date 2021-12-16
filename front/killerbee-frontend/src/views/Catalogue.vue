<template>
    <v-container>
        <Header />
        <form id="search">
            Search: <input name="query" placeholder="modifiez-moi" v-model="query" required/>
            <v-icon v-on:click="searchQuery(query)">mdi-magnify</v-icon>
        </form>
        <br>
        <table>
            <thead>
                <tr>
                    <th v-for="title in ingredientsTitle" :key="title">
                        {{ title | capitalize }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ingredient in ingredients" :key="ingredient.id">
                    <td v-for="title in ingredientsTitle" :key="title">
                        {{ingredient.ingredient[title]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </v-container>
</template>
<script type="text/x-template" id="grid-template">
import Header from '../components/HeaderCatalogue.vue'

export default{
    data: ()=> ({
        query: ""
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
        paramQuery(){
            return {
                query: this.query,
            };
        },
        ingredients(){
            console.log(typeof(this.$store.state.ingredients))
            return this.$store.state.ingredients
        },
        ingredientsTitle(){
            return this.$store.state.ingredientsTitle
        }
    },
    methods: {
        searchQuery(query){
            console.log(query)
            this.$store.dispatch("getQueryIngredients", query)
        },
        sortBy(key) {
            this.sortKey = key;
          }
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