<template>
    <v-container>
        <v-app-bar app color="#087A57" dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <h2 style="text-decoration: cursive">Killerbee</h2>
            <v-spacer></v-spacer>
            <v-btn @click="$router.push({name: 'Authentification'}).catch((err) => {})">
                <v-icon>mdi-login</v-icon>
                <span>LOGIN</span>
            </v-btn>
        </v-app-bar>
    </v-container>
</template>