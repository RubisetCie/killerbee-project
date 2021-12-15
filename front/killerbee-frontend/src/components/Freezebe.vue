<template>
    <v-container>
        Hello
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
            <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-img height="250" :src= srcPicture></v-img>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>Freezebee: {{model.name}} -- Ref: {{model.reference}}</v-card-title>
            <v-card-text>
                <ul>
                    <li>Gamme : {{model.variety}}</li>
                    <li>Masse: {{model.mass}} kg</li>
                    <li>Couleur: {{model.color}}</li>
                    <li>Dimensions: {{model.dimensions}} m^3</li>
                    <li>Coefficient de Portance: {{model.lift}} kg.m/s^2</li>
                    <li>Prix: {{model.price}} €</li>
                </ul>
            </v-card-text>
            <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="fabrication()">
                Fabrication
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple lighten-2" text @click="details()">
                En savoir plus
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
    methods: {
      fabrication() {
          this.$router.push({name: "Fabrications"});
      },
       details() {
          this.$router.push({ name: "Details" });
      },
    },
  }
</script>