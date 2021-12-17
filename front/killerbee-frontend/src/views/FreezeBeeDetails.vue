<template>
    <v-container>
        <Header/>
        HOME > DETAILS
        <div id="head-content">
            <div id="title">
                <h1 style="text-align: center">Freezebee - {{model.name}}</h1>
            </div>
            <v-spacer></v-spacer>
            <div id="modification">
                <!--<div v-if="role == 'DBA'"></div>-->
                <v-btn v-on:click="$router.push({ name: 'ModificationDetailsModel' }).catch((err) => {})" color="#FFBB33" style="float: right;">
                    MODIFIER
                </v-btn>
            </div>
        </div>
        <div id="contenu">
            <!--<div id="imagefreezebee2">
                 <v-img :src="srcPicture" id="freezebee2"></v-img>
            </div>-->
            <div id="description">
                <ul>
                    <li class="detailsSubTitle">
                        <h2>Description: </h2>
                        <p class="detailsText">{{model.description}}</p>
                    </li>
                </ul>
            </div>
            <v-spacer></v-spacer>
            <div id="caracteristiques">
                <ul>
                    <li class="detailsSubTitle">
                        <h2>Caractéristiques: </h2>
                        <ul class="detailsText">
                            <li>Ref: {{model.reference}}</li>
                            <li>Gamme : {{model.variety}}</li>
                            <li>Masse: {{model.mass}} kg</li>
                            <li>Couleur: 
                                <ul>
                                    <li> Rouge: {{model.color.r}}; </li>
                                    <li> Vert: {{model.color.g}}; </li>
                                    <li> Bleu: {{model.color.b}};</li>
                                </ul>
                            </li>
                            <li>Dimensions: 
                                <ul>
                                    <li>Largeur: {{model.dimensions.width}} m; </li>
                                    <li>Longueur: {{model.dimensions.length}} m; </li>
                                    <li>Hauteur: {{model.dimensions.height}} m;</li>
                                </ul>
                            </li>
                            <li>Coefficient de Portance: {{model.lift}} kg.m/s^2</li>
                            <li>Prix: {{model.price}} €</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </v-container>
</template>
<script>
    import Header from '../components/HeaderDetails.vue'

    export default{
        data(){
            return{
                srcPicture: require("../assets/img/freezebee.jpg"),
            }
        },  
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
<style>
    #imagefreezebee2{
        margin-top: 5%;
        height: auto;
        width: auto;
    }
    #freezebee2{
        margin-left:0%;
        width: 200px;
        height: 200px;
    }
    .detailsSubTitle{
        color: #F8A51D;
    }
    .detailsText{
        color: black;
    }
    .description{
        margin-right: auto;
        margin-left: auto;
    }
</style>