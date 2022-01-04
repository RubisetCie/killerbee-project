<template>
    <v-container>
        <v-card :loading="loading" class="mx-auto my-12" max-width="500">
            <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-img class="img" :src= srcPicture></v-img>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>Freezebee: {{modelID.model.name}}</v-card-title>
            <v-card-text>
                <ul>
                    <li>Ref: {{modelID.model.reference}}</li>
                    <li>Gamme : {{modelID.model.variety}}</li>
                    <li>Masse: {{modelID.model.mass}} kg</li>
                    <li>Couleur: 
                        <ul>
                            <li> Rouge: {{modelID.model.color.r}}; </li>
                            <li> Vert: {{modelID.model.color.g}}; </li>
                            <li> Bleu: {{modelID.model.color.b}};</li>
                        </ul>
                    </li>
                    <li>Dimensions: 
                        <ul>
                            <li>Largeur: {{modelID.model.dimensions.width}} m; </li>
                            <li>Longueur: {{modelID.model.dimensions.length}} m; </li>
                            <li>Hauteur: {{modelID.model.dimensions.height}} m;</li>
                        </ul>
                    </li>
                    <li>Coefficient de Portance: {{modelID.model.lift}} kg.m/s^2</li>
                    <li>Prix: {{modelID.model.price}} €</li>
                </ul>
            </v-card-text>
            <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="fabrication(modelID.model)">
                Fabrication
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple lighten-2" text @click="details(modelID.model)">
                Détails
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      srcPicture: require("../assets/img/freezebee.jpg"),
    }),
    props:{
        modelID:{
            type: Object
        }
    },
    methods:{
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
  }
</script>
