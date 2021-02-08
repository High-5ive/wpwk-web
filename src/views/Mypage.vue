<template>
   <div class="container d-flex flex-column align-center">
      <div class="top">
         <div class="userInfo-wrapper">
            <span>{{ userInfo.nickname }}님</span>
            <a href="#">비밀번호 변경</a>
         </div>
         <div class="follow-wrapper">
            <button class="follow-button">
               <v-icon>
                  mdi-account-plus
               </v-icon>
               <span>
                  구독
               </span>
            </button>
            <button class="unfollow-button">
               <v-icon>
                  mdi-account-check
               </v-icon>
               <span>
                  구독 취소
               </span>
            </button>
         </div>
         
      </div>
      <div class="middle d-flex justify-space-around">
         <div class="left" @click="switchValue(1)">
            <span>작성 글<br>{{ personsArticles.length }}</span>
         </div>
         <div class="center1" @click="switchValue(2)">
            <span>댓글단 글<br>{{ personsCommentArticles.length }}</span>
         </div>
         <div class="center2" @click="switchValue(3)">
            <span>작성 노리<br>{{ personsContents.length }}</span>
         </div>
         <div class="right" @click="switchValue(4)">
            <span>관심 노리<br>{{ personsLikeContents.length }}</span>
         </div>
         <div class="right" @click="showValue = 5">
            <span>시청 분석</span>
         </div>
      </div>
      <div class="bottom">
         <chart v-if="showValue == 5"/>
         <persons-assets v-if="showValue===1 || showValue===2" :personsAssets="personsAssets"/>
         <persons-assets-with-photo v-if="showValue===3 ||showValue===4" :personsAssetsWithPhoto="personsAssetsWithPhoto" />
         <a href="#">회원탈퇴</a>
      </div>
   </div>
</template>
<script>
import { mapState } from 'vuex'
import Chart from '@/components/mypage/Chart.vue'
import personsAssets from '@/components/mypage/personsAssets.vue'
import personsAssetsWithPhoto from '@/components/mypage/personsAssetsWithPhoto.vue'

export default {
   name: "Mypage",
   components: {
      Chart,
      personsAssets,
      personsAssetsWithPhoto
   },
   data: function () {
      return {
         showValue: 5,
         personsAssets: [],
         personsAssetsWithPhoto: [],
         // 임시데이터 작성한글, 댓글단글(커뮤니티), 작성 노리, 관심노리 필수 항목 >> 제목(커뮤니티는 contents), 작성일자, 조회수, likeusers, 댓글, Article_id(Content_id)
         personsArticles: [
            {
               user: '한솔맘',
               subject: "동네맛집",
               itemList: [],
               views: 843,
               content: "아이들과 가기 좋은 연남동 맛집 추천해주세요~*^^*",
               created_at: "2021-02-01 11:15:23",
               likeList: ['주상맘','태성맘'],
               comments: [{user: "태성맘", content:"해피치즈스마일이라고 떡볶이 안맵고 맛있더라구요~", created_at: "2021-02-05 11:00:32"}]
            },
            {
               user: '주상맘',
               subject: "아이교육/학원",
               itemList: [],
               views: 200,
               content: "아이 예절 교육은 어떻게 시키시나요? 아이가 계속 유튜브만 보려고 하네요...",
               created_at: "2021-02-01 11:15:23",
               likeList: [{user: "태성맘", content:"해피치즈스마일이라고 떡볶이 안맵고 맛있더라구요~", created_at: "2021-02-05 11:00:32"}],
               comments: []
            },
         ],
         personsCommentArticles: [
            {
               user: '한솔맘1',
               subject: "동네맛집",
               itemList: [],
               views: 843,
               content: "댓글단글1",
               created_at: "2021-02-01 11:15:23",
               likeList: ['주상맘','태성맘'],
               comments: [{user: "태성맘", content:"해피치즈스마일이라고 떡볶이 안맵고 맛있더라구요~", created_at: "2021-02-05 11:00:32"}]
            },
            {
               user: '주상맘1',
               subject: "아이교육/학원",
               views: 200,
               itemList: [],
               content: "댓글단글2",
               created_at: "2021-02-01 11:15:23",
               likeList: ['주상맘','태성맘'],
               comments: []
            },
         ],
         personsContents: [
            {
               title: '노리1',
               thumbnailSrc: '@/assets/img/test1/jpg',
               likeList: [],
               views: 154,
               createdAt: '2021.02.08'
            }
         ],
         personsLikeContents: [
            {
               title: '노리2',
               thumbnailSrc: '@/assets/img/test2/jpg',
               views: 151,
               likeList: [],
               createdAt: '2021.02.08'
            }
         ],
         personsAbilities: []

      }
   },
   methods: {
      switchValue: function (num) {
      if (num == 1) {
            this.personsAssets = this.personsArticles
            this.showValue = 1
         } else if (num == 2) {
            this.personsAssets = this.personsCommentArticles
            this.showValue = 2
         } else if (num == 3) {
            this.personsAssetsWithPhoto = this.personsContents
            this.showValue = 3
         } else {
            this.personsAssetsWithPhoto = this.personsLikeContents
            this.showValue = 4
         }
      }
   },
   computed: {
      ...mapState(['userInfo']),
   },
  
}
</script>
<style lang="scss" scoped>
.container {
   width: 100%;
   .middle {
      width: 100%;
   }
   .bottom {
      width: 100%;
      .article-wrapper {
         width: 100%;
         .item-wrapper {
            span {
               max-width: 50%;
            }
         }
      }
   }
}
</style>