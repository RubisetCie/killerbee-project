<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="4" md="4" lg="3" v-for="model in models" :key="model.id" style="margin-left: auto; margin-right: auto;">
                <FreezeBee :model=model />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FreezeBee from './Freezebe.vue'

export default({
    components:{
        FreezeBee
    },
    computed: {
        models(){
            return this.$store.state.model;
        }
    }
})
</script>
