<template>
  <div class="cl-container">
    <Card :card="card" :pageNum="pageNum" />
    <div class="cl-footer">
      <div class="footer-pagination">
        <!-- <span class="page-count">{{ pageNum }} / {{ this.cards.length }} 페이지</span> -->
        <div class="text-center">
          <v-pagination
            v-model="pageNum"
            :length="this.cards.length"
            :total-visible="5"
            circle
          >
          </v-pagination>
        </div>
      </div>
      <div class="footer-navi">
        <div class="left-button" @click="prevPage">
          <v-icon>mdi-chevron-left</v-icon>
        </div>
        <div class="right-button">
          <div v-if="pageNum === this.cards.length" @click="evaluationValue">
            <v-icon style="color:white">
              mdi-flag
            </v-icon>
          </div>
          <div v-else @click="nextPage">
            <v-icon :disabled="pageNum >= this.cards.length">
              mdi-chevron-right
            </v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card';

export default {
  name: 'CardList',
  data: function() {
    return {
      pageNum: 1,
      evaluation: false,
      card: {}
      // card: {
      //   description: '',
      //   contentsId: '',
      //   imageAddress: '',
      //   videoAddress: '',
      //   youtubeId: '',
      //   youtubeThumbnail: '',
      //   youtubeTitle: '',
      //   youtubeUrl: '',
      // },
    };
  },
  methods: {
    nextPage() {
      this.pageNum++;
    },
    prevPage() {
      if (this.pageNum <= 1) {
        alert('첫 페이지입니다 ^-^');
        return;
      }
      this.pageNum--;
    },
    evaluationValue() {
      this.evaluation = true;
      this.$emit('evaluationPage', this.evaluation);
    },
    getCard() {
      this.card = this.cards[this.pageNum - 1];
    },
  },
  components: {
    Card,
  },
  props: ['cards',],
  watch: {
    pageNum: function() {
      this.getCard();
    },
    cards: function() {
       this.getCard()
    },
  },
};
</script>
