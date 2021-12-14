<template>
    <v-container>
        <v-app-bar app color="#087A57" dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <h2 style="text-decoration: cursive">HOME</h2>
            <v-spacer></v-spacer>
            <h2 style="text-decoration: cursive">Killerbee</h2>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group>
                <v-list-item  @click="$router.push({ name: 'Home' }).catch((err) => {})" >
                    <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>HOME</v-list-item-title>
                </v-list-item>

                <v-list-item  @click="$router.push({ name: 'Catalogue' }).catch((err) => {})" >
                    <v-list-item-icon>
                    <v-icon>mdi-ballot</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>CATALOGUE</v-list-item-title>
                </v-list-item>

                <v-list-item @click="$router.push({ name: 'Modification' }).catch((err) => {})">
                    <v-list-item-icon>
                    <v-icon>mdi-tools</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>MODIFICATION</v-list-item-title>
                </v-list-item>

                <v-list-item v-if="session.token && session.refreshtoken && session.id" @click="logout()">
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
  name: "HeaderHome",
  data: () => ({
    drawer: false,
  }),
  methods:{
      async logout(){
        this.$store.dispatch("logout", params).then((res) => {
            if (res) {
            this.$router.push({ name: "Home" });
            } else {
            document.getElementsByClassName("error-login-msg")[0].style.display =
                "block";
            }
        });
      }
  }
};
</script>