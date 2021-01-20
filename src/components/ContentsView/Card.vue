<template>
<div>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src= "img"
    ></v-img>

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
    }
}
</script>