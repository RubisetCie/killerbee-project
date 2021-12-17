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
        max-width: 25%;
        max-height: 25%;
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        margin-bottom: auto;
    }
</style>
