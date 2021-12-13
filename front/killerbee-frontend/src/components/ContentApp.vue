<template>
    <v-container>
        <div class="text">
            <h1>BIENVENUE</h1>
        </div>
        <div class="image">
            <v-img :src="srcPicture" id="image"></v-img>
        </div>
    </v-container>
</template>

<script>

export default ({
    data(){
        return{
            srcPicture: require("../assets/img/téléchargement.jpeg"),
        }
    }
})
</script>

<style>
    .text{
        text-align: center;
    }
    #image{
        width: auto;
        height: auto;
    }
</style>
