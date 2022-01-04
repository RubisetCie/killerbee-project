<template>
    <v-container>
        <v-app-bar app color="#087A57" dark>
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <h2 style="text-decoration: cursive">LOGIN</h2>
                <v-spacer></v-spacer>
                <h2 style="text-decoration: cursive">Killerbee</h2>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group>
                    <v-list-item  @click="$router.push({ name: 'Applications' }).catch((err) => {})" >
                        <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>HOME</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </v-container>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    drawer: false,
  }),
};
</script>