<template>
    <v-container>
        <Header/>
        HOME > {{model.name}} > DETAILS
        <div id="head-content">
            <div id="title">
                <h1 style="text-align: center">Création du Freezebee: {{model.name}}</h1>
            </div>
            <v-spacer></v-spacer>
            <div id="modification">
                <!--<div v-if="role == 'DBA'"></div>-->
                <v-btn v-on:click="$router.push({ name: 'ModificationFabricationModel' }).catch((err) => {})" color="#FFBB33" style="float: right;">
                    MODIFIER
                </v-btn>
            </div>
        </div>
        <ul>
            <li><h3>Composants nécessaires: </h3></li>
        <div>
            <!--<div v-for="need in model.needs" :key="need.id">
                <div v-for="title in fabricationsTitle" :key="title">
                    {{need.dosing}}
              </div>
            </div>-->
            <table>
                <th v-for="title in fabricationsTitle" :key="title">
                    {{ title | capitalize }}
                </th>
                <tbody>
                    <tr v-for="need in model.needs" :key="need.id">
                         <td v-for="title in fabricationsTitle" :key="title">
                            {{need.ingredient[title]}}
                            <p v-if="title == 'name'">{{need.ingredient.name}}</p> 
                            <p v-if="title == 'dosing'">{{need.dosing}}</p>  
                        </td>   
                    </tr>
                </tbody>
            </table>
        </div>
        </ul>
    </v-container>
</template>
<script>
import Header from '../components/HeaderFabrications.vue'

export default({
    data: ()=>({
        tableTitle: {}
    }),
    components:{
        Header
    },
    filters: {
          capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
          }
    },
    computed:{
        model(){
            return this.$store.state.modelChoice
        },
        fabricationsTitle(){
            return this.$store.state.fabricationsTitle
        }
    }
})
</script>
