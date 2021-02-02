<template>
<div>
  <v-card class="mx-auto my-12" width="320">
    <div v-if="this.card.type == 'photo'">
        <v-img height="250" :src= "img"></v-img>
    </div>
    <div v-else-if="this.card.type == 'youtube'">
        <iframe
            :src="videoUrl"
            >
        </iframe>
    </div>
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
            videoId: '',
            img : '' ,
            description : '',
            // video = '',
        }
    },
    methods: {
        getCard: function () {
            this.description = this.card.description
            if(this.card.type == "youtube") {
                this.videoId = this.card.youtube.videoId
            }
            else if(this.card.type == "photo") {
                this.img = this.card.photo
            }
        },
    },
    created: function () {
        this.getCard()
    },
    watch: {
        pageNum: function () {
            this.getCard()
        }
    },
    computed: {
        videoUrl: function () {
            return `https://www.youtube.com/embed/${this.videoId}`
        }
    }
}
</script>

<style scoped>
</style>