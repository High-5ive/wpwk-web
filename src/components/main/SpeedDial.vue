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
            <v-btn fab dark small color="yellow darken-1">
               <router-link to="/ContentsCreate"><v-icon>mdi-pencil</v-icon></router-link>
            </v-btn>
            <v-btn fab dark small color="red">
               <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo" @click="scrollTop">
               <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
         </v-speed-dial>
      </v-card>

      <v-row justify="center">
         <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="write" color="primary" fab dark v-bind="attrs" v-on="on">
                  <v-icon> mdi-pencil </v-icon>
               </v-btn>
            </template>

            <v-card>
               <v-toolbar dark color="success">
                  <!-- 닫기 버튼 -->
                  <v-btn icon dark @click="dialog = false">
                     <v-icon>mdi-close</v-icon>
                  </v-btn>

                  <v-toolbar-title>새 글 작성</v-toolbar-title>
               </v-toolbar>
               <article-form @createArticle="createArticle" />
            </v-card>
         </v-dialog>
      </v-row>
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
         }, 20);
      },
      scrollListener: function() {
         this.visible = window.scrollY > 150;
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
</style>
