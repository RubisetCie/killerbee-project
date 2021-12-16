<template>
    <v-container>
        <Header/>
        <h1 style="text-align: center">Création du produit: {{model.name}}</h1>
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
