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
         var elem = document.querySelector('.card-wrapper');

         if (elem.classList.contains('effect')) {
            elem.classList.remove('effect');
            elem.classList.add('otherEff');
         } else if (elem.classList.contains('otherEff')) {
            elem.classList.remove('otherEff');
            elem.classList.add('effect');
         } else {
            elem.classList.add('effect');
         }
      },
   },
   watch: {
      // pageNum: function() {
      //    this.getCard();
      // },
      card: function() {
         // console.log('2 이펙트를 추가하고');
         this.getCard();
         this.doEffect();
      },
   },
   computed: {
      videoUrl: function() {
         return `https://www.youtube.com/embed/${this.youtubeId}`;
      },
   },
};
</script>

<style lang="scss">
@-webkit-keyframes bounce-in-bottom2 {
   0% {
      -webkit-transform: translateY(500px);
      transform: translateY(500px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
   }
   38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
   }
   55% {
      -webkit-transform: translateY(65px);
      transform: translateY(65px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
   81% {
      -webkit-transform: translateY(28px);
      transform: translateY(28px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
   95% {
      -webkit-transform: translateY(8px);
      transform: translateY(8px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
}
@keyframes bounce-in-bottom2 {
   0% {
      -webkit-transform: translateY(500px);
      transform: translateY(500px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
   }
   38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
   }
   55% {
      -webkit-transform: translateY(65px);
      transform: translateY(65px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
   81% {
      -webkit-transform: translateY(28px);
      transform: translateY(28px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
   95% {
      -webkit-transform: translateY(8px);
      transform: translateY(8px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
}

.effect {
   -webkit-animation: bounce-in-bottom2 0.8s both;
   animation: bounce-in-bottom2 0.8s both;
}

.otherEff {
   -webkit-animation: bounce-in-bottom 0.8s both;
   animation: bounce-in-bottom 0.8s both;
}

@-webkit-keyframes bounce-in-bottom {
   0% {
      -webkit-transform: translateY(500px);
      transform: translateY(500px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
   }
   38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
   }
   55% {
      -webkit-transform: translateY(65px);
      transform: translateY(65px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
   81% {
      -webkit-transform: translateY(28px);
      transform: translateY(28px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
   95% {
      -webkit-transform: translateY(8px);
      transform: translateY(8px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
}
@keyframes bounce-in-bottom {
   0% {
      -webkit-transform: translateY(500px);
      transform: translateY(500px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
   }
   38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
   }
   55% {
      -webkit-transform: translateY(65px);
      transform: translateY(65px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
   81% {
      -webkit-transform: translateY(28px);
      transform: translateY(28px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
   95% {
      -webkit-transform: translateY(8px);
      transform: translateY(8px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
   }
   100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
   }
}
</style>
