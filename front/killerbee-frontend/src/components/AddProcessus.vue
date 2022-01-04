<template>
    <v-container>
        <Header/>
        HOME > CATALOGUE DES PROCESSUS > AJOUTER
        <h1 style="text-align: center;">Processus de fabrication à ajouter:</h1>
        <form>
            <ul>
                <li>Nom: 
                    <input name="newMethod.name" placeholder="Nom du processus" v-model="newMethod.name" required/>
                </li>
                <li>Description: 
                    <input name="newMethod.description" placeholder="Description du processus" v-model="newMethod.description" required/>
                </li>
                <li>Identifiant du modèle utilisant ce processus: 
                    <input name="newMethod.modelID" placeholder="Identifiant du modèle" v-model="newMethod.modelID" required/>
                </li>
                <li>Etapes du processus: 
                    <ul>
                        <li>Description d'une étape: 
                            <input name="steps.description" placeholder="Description du processus" v-model="steps.description" required/>
                        </li>
                        <li>Vérification de la conformité:
                            <input name="steps.validation" placeholder="Validation du processus" v-model="steps.validation" required />
                        </li>
                    </ul>
                </li>
            </ul>
            <v-btn v-on:click="valider(newMethod, steps)" color="#FFBB33" style="float: right;">
                VALIDER
            </v-btn>
        </form>
    </v-container>
</template>

<script>
import Header from './HeaderProcessus.vue'
 export default ({
     components: {
         Header
     },
     data: ()=>({
         newMethod:{
             name: "",
             description: "",
             modelID: "",
             steps:{}

         },
         steps:{
             description: "",
             validation: ""
         },
     }),
     methods:{
        valider(newMethod, steps){
            this.newMethod.name = newMethod.name
            this.newMethod.description = newMethod.description
            this.newMethod.modelID = newMethod.modelID
            this.newMethod.steps = steps
            console.log(this.newMethod)
            this.$store.dispatch("postMethod",{newMethod: newMethod});
            this.$router.push({ name: 'Processus' })
        }
     }
 })
</script>
