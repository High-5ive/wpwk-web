<template>
   <div>
      <v-card id="create">
         <v-speed-dial v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :open-on-hover="hover" :transition="transition">
            <template v-slot:activator>
               <v-btn id="main-dial" v-model="fab" color="blue darken-2" dark fab>
                  <v-icon v-if="fab">
                     mdi-close
                  </v-icon>
                  <v-icon v-else>
                     mdi-baby-carriage
                  </v-icon>
                  <!-- <img v-else src="@/assets/c_wk.png" style="width:35px" /> -->
               </v-btn>
            </template>
            <v-btn fab dark small color="green">
               <router-link to="/ContentsCreate"><v-icon>mdi-baby-bottle</v-icon></router-link>
            </v-btn>
            <v-btn fab dark small color="yellow darken-1" @click="changeCommuModal(true)">
               <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab dark small color="red">
               <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo" @click="scrollTop">
               <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
         </v-speed-dial>
      </v-card>

      <!-- 커뮤니티 글 작성 모달 -->
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
         <v-card>
            <v-btn icon dark @click="dialog = false">
               <v-icon>mdi-close</v-icon>
            </v-btn>

            <article-form @createArticle="createArticle" @emit-close="changeCommuModal" />
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
import ArticleForm from '@/components/Community/ArticleForm';

export default {
   data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',

      dialog: false, //모달용 변수
   }),
   components: { ArticleForm },
   computed: {
      activeFab() {
         switch (this.tabs) {
            case 'one':
               return { class: 'purple', icon: 'account_circle' };
            case 'two':
               return { class: 'red', icon: 'edit' };
            case 'three':
               return { class: 'green', icon: 'keyboard_arrow_up' };
            default:
               return {};
         }
      },
   },
   watch: {
      top(val) {
         this.bottom = !val;
      },
      right(val) {
         this.left = !val;
      },
      bottom(val) {
         this.top = !val;
      },
      left(val) {
         this.right = !val;
      },
   },

   methods: {
      scrollTop: function() {
         this.intervalId = setInterval(() => {
            if (window.pageYOffset === 0) {
               clearInterval(this.intervalId);
            }
            window.scroll(0, window.pageYOffset - 50);
         }, 0.001);
      },
      scrollListener: function() {
         this.visible = window.scrollY > 150;
      },

      //글 작성 여부에 따른 작성 폼 모달 오픈/닫기 제어
      changeCommuModal: function(state) {
         this.dialog = state;
      },

      createArticle: function(article) {
         this.dialog = false;
         console.log('스피드다이얼 내 현 주소 : ', this.$router.currentRoute.name);
         console.log('건내받은 아티클 : ', article);

         // ArticleForm.vue로 부터 받은 article 데이터를 여기로 보내지 말고
         // 자체적으로 비동기 처리하고, 여기선 커뮤니티로 이동하는 라우터만 남기기

         if (this.$router.currentRoute.name == 'Main') {
            console.log('메인페이지에서 커뮤니티로 넘어가기');
            this.$router.push({ name: 'community', params: { createdArticle: article } });
         } else {
            console.log('그외 페이지');
            this.$emit('emit-create', article);
         }
      },
   },
   mounted: function() {
      window.addEventListener('scroll', this.scrollListener);
   },
   beforeDestroy: function() {
      window.removeEventListener('scroll', this.scrollListener);
   },
};
</script>

<style lang="scss" scoped>
@import 'src/css/vars';

#create .v-speed-dial {
   position: fixed;
   bottom: 40px;
   right: 30px;
   z-index: 5;

   button {
      &#main-dial {
         width: 60px;
         height: 60px;
         background-color: orange !important;
         border: 2px white solid !important;
      }
   }
   a {
      color: white !important;
      text-decoration: none !important;
   }
}
#create .v-btn--floating {
   position: relative;
}

.v-card,
v-sheet,
theme--light {
   // background-color: blue !important;
   height: 100%;
   overflow: hidden;
}
</style>
