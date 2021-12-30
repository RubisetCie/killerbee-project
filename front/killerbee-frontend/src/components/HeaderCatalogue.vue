<template>
    <v-container>
        <v-app-bar app color="#087A57" dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <h2 style="text-decoration: cursive">CATALOGUE DES INGREDIENTS</h2>
            <v-spacer></v-spacer>
            <h2 style="text-decoration: cursive">Killerbee</h2>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group>
                <v-list-item  @click="$router.push({ name: 'Home' }).catch((err) => {})" >
                    <v-list-item-icon>
                    <v-icon>mdi-ballot-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>CATALOGUE <br> DES FREEZEBEE</v-list-item-title>
                </v-list-item>

                <v-list-item  @click="$router.push({ name: 'CatalogueIngredients' }).catch((err) => {})" >
                    <v-list-item-icon>
                    <v-icon>mdi-ballot</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>CATALOGUE <br> DES INGREDIENTS</v-list-item-title>
                </v-list-item>

                <v-list-item  @click="$router.push({ name: 'Processus' }).catch((err) => {})" >
                    <v-list-item-icon>
                    <v-icon>mdi-ballot-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>GESTION <br> DES PROCESSUS</v-list-item-title>
                </v-list-item>

                <v-list-item @click="logout()">
                    <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>DECONNEXION</v-list-item-title>
                </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </v-container>
</template>

<script>
export default {
  name: "HeaderCatalogue",
  data: () => ({
    drawer: false,
  }),
  methods:{
      async logout(){
        this.$store.dispatch("logout")
        this.$router.push({ name: "Authentification" });
      }
  }
};
</script>