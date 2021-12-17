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
            <div id="modification">
                <!--<div v-if="role == 'DBA'"></div>-->
                <v-btn v-on:click="$router.push({ name: 'ModificationModel' }).catch((err) => {})" color="#FFBB33" style="float: right;">
                    MODIFIER
                </v-btn>
            </div>
        </div>
        <br>
        <div  v-for="method in methods" :key="method">
            {{method["method"]}}
        </div>
        <!--<div v-if="query == ''">
            <table>
                <thead>
                    <tr>
                        <th v-for="title in methodsTitle" :key="title">
                            {{ title | capitalize }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="method in methods" :key="method.id">
                        <td v-for="title in methodsTitle" :key="title">
                            {{method.method[title]}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <div>
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
                            {{method.method[title]}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>-->
    </v-container>
</template>
<script type="text/x-template" id="grid-template">
import Header from '../components/HeaderProcessus.vue';

export default{
    data: ()=> ({
        query: "",
        methodsQuery:[],
        errorMessage:""
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