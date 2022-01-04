<template>
    <v-container>
        <Header />
        <div id="head-content">
            <div id="search-content">
                <form id="search">
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
            <v-spacer></v-spacer>
            <div id="modification">
                <!--<div v-if="role == 'DBA'"></div>-->
                <v-btn v-on:click="$router.push({ name: 'AddProcessus' }).catch((err) => {})" color="#FFBB33" style="float: right;">
                   <v-icon>mdi-pencil</v-icon>
                    AJOUTER
                </v-btn>
            </div>
        </div>
        <br>
        <div v-if="query == ''">
            <div v-if="id == null">
                <table>
                    <thead>
                        <tr>
                            <th v-for="title in methodsTitle" :key="title">
                                {{ title | capitalize }}
                            </th>
                            <th>SUPPRIMER?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="method in methods" :key="method.id">
                            <td v-for="title in methodsTitle" :key="title">
                                <div v-if="title == 'étape du processus'">
                                   <div v-for="(step, idx) in method.method.steps" :key="idx">
                                        <tr>
                                            <strong>Description:</strong> {{step.description}}<br>
                                            <strong>Validation: </strong> {{step.validation}}
                                        </tr>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="title == 'nom du modèle'">
                                        {{method.method.model.name}}
                                    </div>
                                    <div v-else>
                                        {{method.method[title]}}
                                    </div>
                                </div>
                            </td>
                            <div id="delete">
                                <!--<div v-if="role == 'DBA'"></div>-->
                                <v-btn v-on:click="deleteMethod(method.id)" color="#C70039">
                                    <v-icon>mdi-trash-can</v-icon>
                                    DELETE
                                </v-btn>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <!--<div v-for="(champ, idx) in methodID" :key="idx">
                        {{champ.name}}
                        {{champ.description}}
                </div>-->
                <table>
                    <thead>
                        <tr>
                            <th v-for="title in methodsTitle" :key="title">
                                {{ title | capitalize }}
                            </th>
                            <th>SUPPRIMER?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(method, index) in methodID" :key="index">
                            <td>
                                {{method.name}}
                            </td>
                            <td>
                                {{method.description}}
                            </td>
                            <td>
                                {{method.model}}
                            </td>
                            <td>
                                <div v-for="(step, idx) in method.steps" :key="idx">
                                        <strong>Description:</strong> {{step.description}}<br>
                                        <strong>Validation: </strong> {{step.validation}}
                                </div>
                            </td>
                            <div id="delete">
                                <!--<div v-if="role == 'DBA'"></div>-->
                                <v-btn v-on:click="deleteMethod(method.id)" color="#C70039">
                                    <v-icon>mdi-trash-can</v-icon>
                                    DELETE
                                </v-btn>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>
            <!--<div>
                {{processusQuery}}
            </div>
            <table>
                <thead>
                    <tr>
                        <th v-for="title in methodsTitle" :key="title">
                            {{ title | capitalize }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="method in methodsQuery" :key="method.id">
                        <td v-for="title in methodsTitle" :key="title">
                            <div v-if="title == 'étape du processus'">
                                <div v-for="step in method.method.steps" :key="step">
                                    <strong>Description:</strong> {{step.description}}<br>
                                    <strong>Validation: </strong> {{step.validation}}
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="title == 'nom du modèle'">
                                    {{method.method.model.name}}
                                </div>
                                <div v-else>
                                    {{method.method[title]}}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>-->
        </div>
    </v-container>
</template>
<script type="text/x-template" id="grid-template">
import Header from '../components/HeaderProcessus.vue';

export default{
    data: ()=> ({
        query: "",
        methodsQuery:[],
        errorMessage:"", 
        id: null
    }),
    components:{
        Header
    },
    mounted(){
      this.$store.dispatch("getAllMethods");

    },
    computed:{
        methods(){
            console.log(this.$store.state.methods)  
            return this.$store.state.methods
        },
        methodsTitle(){
            return this.$store.state.methodsTitle
        },
        stepTitle(){
            return this.$store.state.stepTitle
        },
        methodID(){
            return this.$store.state.methodId
        }
    },
    methods: {
        searchQuery(query){
            console.log(query);
            if(query == ''){
                this.errorMessage = "Veuillez saisir un mot de recherche.";
                console.log(this.errorMessage);
            }else{
                this.$store.dispatch("getQueryMethods", query);
                this.methodsQuery = this.$store.state.methodsQuery
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
                this.$store.dispatch("getByIdMethod", {id: id});
            }
        },
        deleteMethod(id){
            console.log("Processus.vue")
            console.log("Delete Method:")
            console.log(id)
            this.$store.dispatch("deleteMethod", {id: id});
        }
    },
    filters: {
          capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
          }
    },
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