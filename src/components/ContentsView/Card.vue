<template>
<div>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img height="250" :src= "img"></v-img>

    <v-card-text>
      <div>{{ description }}</div>
    </v-card-text>
  </v-card>

</div>
</template>

<script>
export default {
    name: "Card",
    props: {
        card: Object,
        pageNum: Number,
    },
    data: function () {
        return {
            // video = '',
            img : '' ,
            description : '',
        }
    },
    methods: {
        getCard: function () {
            this.img = this.card.img
            this.description = this.card.description
        },
    },
    created: function () {
        this.getCard()
    },
    watch: {
        pageNum: function () {
            this.getCard()
        }
    }
}
</script>

<style scoped>
</style>