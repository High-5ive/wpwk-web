<template>
   <div class="card-wrapper">
      <div v-show="this.notOnlyText" class="card-content">
         <div v-if="this.imageAddress">
            <img :src="imageAddress" />
         </div>
         <div v-else-if="this.youtubeId">
            <iframe :src="videoUrl" allowfullscreen> </iframe>
         </div>
      </div>
      <div class="card-desc">
         <div class="desc nf nf-400">{{ description }}</div>
      </div>
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
         notOnlyText: false,

         nowPage: 0,
      };
   },
   methods: {
      getCard: function() {
         this.description = '';
         this.youtubeId = '';
         this.imageAddress = '';

         this.description = this.card.description;

         if (this.card.youtubeId) {
            this.youtubeId = this.card.youtubeId;
            this.notOnlyText = true;
         } else if (this.card.imageAddress) {
            this.imageAddress = this.card.imageAddress;
            this.notOnlyText = true;
         }
      },
      doEffect: function() {
         console.log('추가!');
         var elem = document.querySelector('.card-wrapper');
         elem.classList.add('effect');
         console.log(elem);
      },
      doNotEffect: function() {
         console.log('삭제!');
         var elem = document.querySelector('.card-wrapper');
         elem.classList.remove('effect');
         console.log(elem);
      },

      getEffect: function() {
         this.getCard();

         var elem = document.querySelector('.card-wrapper');
         if (elem.classList.contains('effect')) {
            console.log('존재');
            elem.classList.remove('effect');
            console.log('존재하니 삭제완료', elem);
         } else {
            console.log('미존재');
            console.log(elem);
            elem.classList.add('effect');
         }
         //  elem.classList.remove('effect');
      },
   },
   watch: {
      // pageNum: function() {
      //    this.getCard();
      // },
      card: function() {
         this.getCard();
         console.log('watch', this.card, this.pageNum);
         //  this.getEffect();
         //  this.doNotEffect();
         //  setTimeout(this.doEffect(), 10000);
      },
   },
   created() {
      console.log('created', this.card, this.pageNum);
   },
   computed: {
      videoUrl: function() {
         return `https://www.youtube.com/embed/${this.youtubeId}`;
      },
   },
};
</script>

<style lang="scss">
.effect {
   animation: 1s ease-out 0s 1 slideInFromTop;

   @keyframes slideInFromTop {
      0% {
         transform: translateY(-30px);
         opacity: 0;
      }

      100% {
         transform: translateY(0);
         opacity: 1;
      }
   }
}
</style>
