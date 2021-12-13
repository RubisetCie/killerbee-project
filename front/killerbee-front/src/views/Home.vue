<template>
    <v-container>
        <Header />
        <Content />
    </v-container>
</template>
<script>
import Header from '../components/HeaderHome.vue'
import Content from '../components/ContentHome.vue'
export default({
    components: {Header, Content}
})
</script>