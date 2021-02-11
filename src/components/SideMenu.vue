<template>
   <div class="sm-container">
      <div class="user-wrapper">
         <p>
            <span>{{ userInfo.nickname }}</span
            >님 환영합니다
         </p>
         <span class="mypage" @click="$router.push('mypage').catch(() => {})">내 정보 보기</span>
         <span class="logout" @click="$store.dispatch('doLogout')">로그아웃</span>
      </div>
      <div class="link-wrapper">
         <div class="img-btn" @click="$router.push('/')"><img src="@/assets/img/characters/banner-cmmu.png" alt="" /> <span class="nf">노리</span></div>
         <div class="img-btn" @click="$router.push('cmmu')"><img src="@/assets/img/characters/banner-nori.png" alt="" /> <span class="nf">커뮤니티</span></div>
      </div>
      <div class="ad-wrapper">
         <!-- <div class="ad">AD Banner</div> -->
         <!-- <div class="ad">AD Banner</div> -->
         <!-- <div class="ad">AD Banner</div> -->
         <div class="copyright">
            본 사이트의 저작권은 SSAFY 4기 High5ive팀에게 있습니다.
            <br />Copyright © High5ive All Rights Reserved.
            <br />
            <p style="margin-top:6px; font-weight:600">김한솔 김수연 김수진 민태성 이주상</p>
         </div>
      </div>
   </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
   computed: {
      ...mapState(['userInfo']),
   },
};
</script>
<style lang="scss" scoped>
@import 'src/css/vars';

.sm-container {
   position: relative;
   height: 100%;
   background-color: transparent !important;

   .user-wrapper {
      // display: flex;
      // flex-direction: column;
      text-align: center;
      margin-bottom: 50px;
      padding-top: 56px;

      p {
         font-size: 20px;
         color: $pink;
         margin-bottom: 0px;

         span {
            font-weight: 600;
         }
      }

      .mypage {
         text-decoration: underline;
         font-size: 14px;
         margin-top: 0px;
         margin-right: 12px;
      }

      .logout {
         text-decoration: underline;
         font-size: 13px;
         color: grey;
      }
   }

   .link-wrapper {
      display: flex;
      flex-direction: column;
      text-align: center;

      .img-btn {
         width: 280px;
         height: 180px;
         // border: 1px solid rgb(208, 208, 208);
         text-align: center;
         margin: 10px auto;
         border-radius: 20px;
         border: 1px solid rgb(228, 228, 228);

         &:nth-child(1) {
            background-color: rgb(234, 246, 255);
            &:hover {
               background-color: rgb(207, 228, 244);
            }
         }
         &:nth-child(2) {
            background-color: rgb(255, 248, 216);
            &:hover {
               background-color: rgb(247, 237, 194);
            }
         }

         span {
            display: block;
            position: relative;
            top: -120px;

            color: rgb(53, 53, 53);
            font-size: 25pt !important;
            font-weight: 600;
         }

         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: -20px 0px;
            border-radius: 20px;
         }
      }
   }

   .ad-wrapper {
      position: absolute;
      bottom: 0;
      height: 100px;
      width: 100%;

      .ad {
         width: 70%;
         height: 70px;
         border: 1px solid rgb(208, 208, 208);
         margin: 10px auto;

         text-align: center;
         color: rgb(208, 208, 208);
      }

      .copyright {
         width: 70%;
         margin: 10px auto;
         font-size: 8pt !important;
         color: gray;
      }
   }
}
</style>
