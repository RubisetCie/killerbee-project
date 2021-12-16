<template>
    <v-container>
        <v-card :loading="loading" class="mx-auto my-12" max-width="500">
            <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-img class="img" :src= srcPicture></v-img>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>Freezebee: {{model.model.name}}</v-card-title>
            <v-card-text>
                <ul>
                    <li>Ref: {{model.model.reference}}</li>
                    <li>Gamme : {{model.model.variety}}</li>
                    <li>Masse: {{model.model.mass}} kg</li>
                    <li>Couleur: 
                        <ol> Rouge: {{model.model.color.r}}; </ol>
                        <ol> Vert: {{model.model.color.g}}; </ol>
                        <ol> Bleu: {{model.model.color.b}};</ol>
                    </li>
                    <li>Dimensions: 
                        <ol>Largeur: {{model.model.dimensions.width}} m; </ol>
                        <ol>Longueur: {{model.model.dimensions.length}} m; </ol>
                        <ol>Hauteur: {{model.model.dimensions.height}} m;</ol>
                    </li>
                    <li>Coefficient de Portance: {{model.model.lift}} kg.m/s^2</li>
                    <li>Prix: {{model.model.price}} €</li>
                </ul>
            </v-card-text>
            <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="$router.push({ name: 'FreezeBeeFabrications' })">
                Fabrication
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple lighten-2" text @click="$router.push({ name: 'FreezeBeeDetails' })">
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
        model:{
            type: Object
        }
    },
  }
</script>
