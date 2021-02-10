<template>
  <div class="card-wrapper">
    <div v-show="this.notOnlyText" class="card-content">
      <div v-if="this.imageAddress">
        <img :src="imageAddress" />
      </div>
      <div v-else-if="this.youtubeId">
        <iframe :src="videoUrl"> </iframe>
      </div>
    </div>
    <div class="card-desc">
      <div class="desc nf nf-400">{{ description }}</div>
    </div>

    <!-- <v-card class="mx-auto my-12" width="320">
         <div v-if="this.card.type == 'photo'">
            <v-img height="250" :src="img"></v-img>
         </div>
         <div v-else-if="this.card.type == 'youtube'">
            <iframe :src="videoUrl"> </iframe>
         </div>
         <v-card-text>
            <div>{{ description }}</div>
         </v-card-text>
      </v-card> -->
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: Object,
    pageNum: Number,
  },
  data: function() {
    return {
      description: '',
      contentsId: '',
      imageAddress: '',
      videoAddress: '',
      youtubeId: '',
      youtubeThumbnail: '',
      youtubeTitle: '',
      youtubeUrl: '',
      notOnlyText: false
    };
  },
  methods: {
    getCard: function() {
      this.description = ''
      this.youtubeId = ''
      this.imageAddress = ''

      this.description = this.card.description;

      if (this.card.youtubeId) {
        this.youtubeId = this.card.youtubeId;
        this.notOnlyText = true;
      } else if (this.card.imageAddress) {
        this.imageAddress = this.card.imageAddress;
        this.notOnlyText = true;
      }
    },
  },
  watch: {
    pageNum: function() {
      this.getCard();
    },
    card: function () {
      this.getCard()
    }
  },
  computed: {
    videoUrl: function() {
      return `https://www.youtube.com/embed/${this.youtubeId}`;
    },
  },
};
</script>

<style scoped></style>
