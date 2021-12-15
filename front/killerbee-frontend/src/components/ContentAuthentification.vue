<template>
    <v-container>
        <div class="card card-container">
                <img id="profile-img" :src="srcPicture" class="profile-img-card"/>
                <v-divider class="mx-4"></v-divider>
                <h2 class="title">LOGIN</h2>
                <validation-observer ref="observer">
                    <v-form @submit.prevent="submit">
                        <validation-provider  v-slot="{ errors }" name="Username" rules="required|username">
                            <v-text-field v-model="username" class="zone" :error-messages="errors" label="Username" required outlined dark filled dense></v-text-field>
                        </validation-provider>
                        <validation-provider color="#087A57" v-slot="{ errors }" name="Password" rules="required">
                            <v-text-field v-model="password" class="zone" :error-messages="errors" label="Password" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass" required outlined dense dark filled :type="showPass ? 'text' : 'password'"></v-text-field>
                        </validation-provider>
                        <div class="text-center">
                            <v-btn class="signin-btn" type="submit" rounded color="#087A57" dark>
                                Sign In
                            </v-btn>
                        </div>
                    </v-form>
                </validation-observer>
            </div>
    </v-container>
</template>