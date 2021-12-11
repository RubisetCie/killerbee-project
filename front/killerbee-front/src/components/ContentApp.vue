<template>
    <v-container>
        <div class="text">
            <h2>BIENVENUE</h2>
        </div>
        <div class="image">
            <!--<v-img :src="srcPicture"></v-img>-->
        </div>
    </v-container>
</template>

<script>

export default defineComponent({
    data(){
        return{
            srcPicture: require("../assets/img/49351.png"),
        }
    }
})
</script>
