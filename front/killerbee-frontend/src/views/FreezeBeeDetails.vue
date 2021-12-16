<template>
    <v-container>
        <Header/>
        HOME > DETAILS
        <div id="title">
            <h1 style="text-align: center">Freezebee - {{model.name}}</h1>
        </div>
        <div id="content">
            <div id="image"></div>
            <div id="description"></div>
        </div>
    </v-container>
</template>
<script>
    import Header from '../components/HeaderDetails.vue'

    export default{
        components:{
            Header
        },
        computed:{
            model(){
                return this.$store.state.modelChoice
            }
        }

    }
</script>