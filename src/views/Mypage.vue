<template>
  <div
    style="overflow: hidden;"
    class="mp-container d-flex flex-column align-center"
  >
    <div class="top-wrapper">
      <div class="user-info-wrapper">
        <img src="@/assets/img/characters/eval_bubble.png" alt="" />
        <div class="in-bubble">
          <!-- 나중에는 페이지 들어오기전에 유저정보(id, 별명, 작성글 목록 등) 요청 후 응담 내용으로 보여주기-->
          <span class="username">{{ userNickname }}님</span>

          <!-- 팔로우 버튼 (타유저프로필일때) -->
          <!-- 언팔로우 버튼 (타유저 구독한 상태일때) -->
        </div>
        <div class="mp-top-right">
          <div class="user-info">
            <div class="user-info-item">
              <span class="f-number">{{ followers }}</span>
              <span class="f-text">팔로워</span>
            </div>
            <div class="user-info-item">
              <span class="f-number">{{ followings }}</span>
              <span class="f-text">팔로잉</span>
            </div>
          </div>
          <div
            v-if="$route.params.userId !== userInfo.userId"
            class="follow-buttons"
          >
            <button
              @click="followSomeone"
              v-if="isfollowed"
              class="infos-button unfollow-button"
            >
              <v-icon>
                mdi-account-check
              </v-icon>
              <span>
                구독 취소
              </span>
            </button>
            <button
              @click="followSomeone"
              v-if="!isfollowed"
              class="infos-button follow-button"
            >
              <v-icon>
                mdi-account-plus
              </v-icon>
              구독
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="middle d-flex justify-space-around">
      <div
        class="asset-navi"
        :class="{ 'selected-navi': showValue === 1 }"
        @click="switchValue(1)"
      >
        <span class="as-top">작성 글</span>
        <span v-if="showValue == 1" class="as-bottom">{{
          personsAssets.length
        }}</span>
      </div>
      <div class="divider"></div>
      <div
        class="asset-navi"
        :class="{ 'selected-navi': showValue === 2 }"
        @click="switchValue(2)"
      >
        <span class="as-top">댓글단 글</span>
        <span v-if="showValue == 2" class="as-bottom">{{
          personsAssets.length
        }}</span>
      </div>
      <div class="divider"></div>
      <div
        class="asset-navi"
        :class="{ 'selected-navi': showValue === 3 }"
        @click="switchValue(3)"
      >
        <span class="as-top">작성 노리</span>
        <span v-if="showValue == 3" class="as-bottom">{{
          personsAssetsWithPhoto.length
        }}</span>
      </div>
      <div class="divider"></div>
      <div
        class="asset-navi"
        :class="{ 'selected-navi': showValue === 4 }"
        @click="switchValue(4)"
      >
        <span class="as-top">관심 노리</span>
        <span v-if="showValue == 4" class="as-bottom">{{
          personsAssetsWithPhoto.length
        }}</span>
      </div>
      <div
        v-if="$route.params.userId === userInfo.userId"
        class="asset-navi"
        :class="{ 'selected-navi': showValue === 5 }"
        @click="showValue = 5"
      >
        <span class="as-top">시청 분석</span>
        <!-- <v-icon class="as-bottom">mdi-television-classic</v-icon> -->
      </div>
    </div>
    <div :class="{ bottom: showValue }">
      <persons-assets
        v-if="showValue === 1 || showValue === 2"
        :showValue="showValue"
        :personsAssets="personsAssets"
      />
      <persons-assets-with-photo
        v-if="showValue === 3 || showValue === 4"
        :showValue="showValue"
        :personsAssetsWithPhoto="personsAssetsWithPhoto"
      />
      <chart v-if="showValue == 5" />
    </div>
    <div v-if="$route.params.userId === userInfo.userId" class="footer-wrapper">
      <a class="user-action" href="#" @click="dialog = true">비밀번호 변경</a>
      <a class="user-action" href="#" @click="dialog2 = true">회원탈퇴</a>
    </div>
    <div class="divider"></div>
    <!-- 회원탈퇴 모달 -->
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog2" persistent max-width="330px">
          <v-card id="seccesion-modal" class="seccesion-modal">
            <v-card-title class="nf">
              정말로 탈퇴하시겠습니까? 😭
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog2 = false">
                취소
              </v-btn>
              <v-btn color="error" text @click="secession"> 탈퇴하기 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>
<script>
import { deleteUser } from '@/api/user.js';
import { changePwd } from '@/api/user.js';
import { getUserInfo } from '@/api/user.js';
import { follow } from '@/api/user.js';
import { findMyContents } from '@/api/myPage.js';
import { findMyBoard } from '@/api/myPage.js';
import { findContentsByFavorite } from '@/api/myPage.js';
import { findBoardsByComments } from '@/api/myPage.js';
import { findUserAbility } from '@/api/user.js';
import { mapState } from 'vuex';
import Chart from '@/components/mypage/Chart.vue';
import personsAssets from '@/components/mypage/personsAssets.vue';
import personsAssetsWithPhoto from '@/components/mypage/personsAssetsWithPhoto.vue';

var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
export default {
  name: 'Mypage',
  components: {
    Chart,
    personsAssets,
    personsAssetsWithPhoto,
  },
  data: function() {
    return {
      //modal control(비밀번호 변경)
      userId: 0,
      dialog: false,
      dialog2: false,
      show1: false,
      show2: false,
      show3: false,
      followers: 0,
      followings: 0,
      userNickname: '',
      isfollowed: '',
      curPwd: '',
      newPwd1: '',
      newPwd2: '',
      error: {
        newPwd1: false,
        newPwd2: false,
      },
      rules: {
        required: (value) => !!value || '필수 값입니다.',
        vali: (v) =>
          reg_pwd.test(v) || '영문과 숫자를 포함해 6-20자 여야 합니다',
        min: (v) => v.length >= 6 || '비밀번호가 너무 짧습니다.',
        correspond: (v) =>
          v === this.newPwd1 || '비밀번호가 일치하지 않습니다.',
      },
      // showValue(1 작성한글, 2 댓글단 글, 3 작성 노리, 4 관심 노리, 5 시청분석)
      showValue: 0,
      personsAssets: [], // 글(사진 없는)
      personsAssetsWithPhoto: [], //노리(사진 있는)
      // abilities 데이터는 src/assets/js/chart.js에서 axios요청하기
      personsAbilities: [],
    };
  },
  created() {
    this.findUserAbility();
    this.getUserInfo();
  },
  methods: {
    getUserInfo: function() {
      const targetUser = {
        targetId: this.$route.params.userId,
      };
      console.log('targetUYesr', targetUser);
      getUserInfo(
        targetUser,
        (success) => {
          console.log(success);
          this.isfollowed = success.data.isFollowed;
          this.userNickname = success.data.findUser.nickname;
          this.followers = success.data.findUser.followed;
          this.followings = success.data.findUser.following;
          this.userId = success.data.findUser.id;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //팔로우 요청
    followSomeone: function() {
      const targetUser = {
        targetId: this.$route.params.userId,
      };
      follow(
        targetUser,
        (success) => {
          console.log(success, '팔로우 완료');
          this.isfollowed = !this.isfollowed;
          if (this.isfollowed == false) {
            this.followers--;
          } else {
            this.followers++;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //비밀번호 변경 validation
    checkPW(str) {
      // 영문, 숫자 혼합 6글자 이내
      var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      // test()
      if (reg_pwd.test(str) === true && str.length < 6) {
        return true;
      } else return false;
    },
    // 비밀번호 변경요청
    changePassword: function() {
      if (
        this.curPwd.length > 0 &&
        !this.checkPW(this.newPwd1) &&
        this.newPwd1 === this.newPwd2
      ) {
        const passwords = {
          curPassword: this.curPwd,
          newPassword: this.newPwd1,
        };
        changePwd(
          passwords,
          (success) => {
            console.log(success);
            alert('비밀번호 변경이 완료되었습니다.');
            this.curPwd = '';
            this.newPwd1 = '';
            this.newPwd2 = '';
            this.dialog = false;
          },
          (error) => {
            console.log(error);
            alert('비밀번호 변경에 실패했습니다.');

            this.dialog = false;
          }
        );
      }
    },
    // showValue값에 따라 보여주는 값 달라짐
    switchValue: function(num) {
      var page = 1;
      if (num == 1) {
        findMyBoard(
          this.userId,
          page,
          (success) => {
            console.log(success);
            this.personsAssets = success.data;
            console.log(personsAssets);
            this.showValue = 1;
          },
          (fail) => {
            console.log(fail);
          }
        );
      } else if (num == 2) {
        findBoardsByComments(
          this.userId,
          page,
          (success) => {
            console.log(success);
            this.personsAssets = success.data;
            this.showValue = 2;
          },
          (fail) => {
            console.log(fail);
          }
        );
      } else if (num == 3) {
        findMyContents(
          this.userId,
          page,
          (success) => {
            this.personsAssetsWithPhoto = success.data;
            this.showValue = 3;
            console.log(success);
          },
          (fail) => {
            console.log(fail);
          }
        );
      } else {
        findContentsByFavorite(
          this.userId,
          page,
          (success) => {
            console.log(success);
            this.personsAssetsWithPhoto = success.data;
            this.showValue = 4;
          },
          (fail) => {
            console.log(fail);
          }
        );
      }
    },
    //회원 탈퇴 요청
    secession: function() {
      deleteUser(
        (response) => {
          console.log('탈퇴', response);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    findUserAbility: function() {
      findUserAbility(
        (success) => {
          console.log(success);
          this.personsAbilities = success.data;
        },
        (fail) => {
          console.log(fail);
        }
      );
    },
  },
  computed: {
    ...mapState(['userInfo']),
  },
};
</script>
<style lang="scss">
@import '@/css/compo/modal.scss';
@import 'src/css/common.scss';

.mp-container {
  // max-width: 500px;
  @include desktop {
    height: 100%;
    max-width: 500px;
    margin-left: -250px;
    left: 50%;
  }
  @include tablet {
    max-width: 500px;
    left: 50%;
    margin-left: -250px;
  }
  position: relative;
  height: 100%;
  // border: red dashed 1px;
  width: 100%;
  .top-wrapper {
    height: 20%;
    position: relative;
    height: 150px;
    .user-info-wrapper {
      img {
        position: absolute;
        left: -180px;
        top: 25px;
        width: 180px;
        transform: rotateY(180deg);
        // height: 150px;
      }
      .in-bubble {
        white-space: nowrap;
        position: absolute;
        left: -135px;
        top: 38px;
        .username {
          display: inlnine;
          font-size: 18pt;
          font-weight: 600;
        }
      }
      .mp-top-right {
        background-color: #f2f1f2;
        border-radius: 20px;
        padding: 10px;
        position: absolute;
        left: 10px;
        width: 170px;
        top: 15px;
        display: flex;
        flex-direction: column;
        height: 120px;
        align-items: center;
        justify-content: space-around;
        .user-info {
          width: 100%;
          display: flex;
          justify-content: space-around;
          .user-info-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            .f-number {
              font-size: 18pt;
            }
            .f-text {
              font-size: 10pt;
            }
          }
        }
        .follow-buttons {
          .follow-button {
            background-color: #a2d646;
          }
          .unfollow-button {
            background-color: rgb(184, 184, 184);
          }
          .infos-button {
            font-size: 10pt;
            // margin-left: 10px;
            border-radius: 10px;
            padding: 5px 10px;
            width: 100px;
            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
  .middle {
    // background-color: lightgray;
    margin-top: -5px;
    height: 80px;
    width: 90%;
    display: flex;
    align-items: center;
    padding: 10px 5px;
    box-shadow: 0 4px 4px lightgray;
    border-radius: 10px;
    .divider {
      width: 0px;
      border-left: lightgray 1px solid;
      height: 35px;
    }

    .asset-navi {
      .as-top {
        font-size: 11pt;
      }
      .as-bottom {
        font-size: 11pt;
        background-color: #f4b740;
        color: white;
        border-radius: 20px;
        padding: 0 10px;
      }
      width: 20%;
      height: 60px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 5px;
    }
    .selected-navi {
      border-bottom: #f4b740 5px solid;
      padding-bottom: 0;
    }
  }
  .bottom {
    position: relative;
    max-height: 55%;
    overflow: scroll;
    border-radius: 10px;
    border: lightgray 1px solid;
    margin-top: 20px;
    width: 90%;
    &::-webkit-scrollbar {
      display: none;
    }
    .article-wrapper {
      width: 100%;
      .for-stripe {
        background-color: #f2f1f2;
      }
      .as-item-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        .as-left {
          display: flex;
          flex-direction: column;
          width: 80%;
          .as-info {
            color: gray;
          }
        }
        .as-right {
          width: 40px;
          border: lightgray 1px solid;
          // line-height와 height를 일치시키면, 텍스트 한줄 중앙 정렬
          height: 40px;
          line-height: 40px;
          border-radius: 25px;
          text-align: center;
        }
      }
    }
    .nori-wrapper {
      width: 100%;
      .for-stripe {
        background-color: #f2f1f2;
      }
      .item-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        .asp-left {
          width: 30%;
          img {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
          }
        }
        .asp-middle {
          width: 45%;
          .asp-info {
            color: gray;
          }
        }
        .asp-right {
          width: 40px;
          border: lightgray 1px solid;
          // line-height와 height를 일치시키면, 텍스트 한줄 중앙 정렬
          height: 40px;
          line-height: 40px;
          border-radius: 25px;
          text-align: center;
        }
      }
    }
    .as-chart {
      padding: 0 10px;
    }
  }

  .footer-wrapper {
    // background-color: red;
    position: absolute;
    bottom: 30px;
    right: 10px;
    .user-action {
      color: gray;
      margin: 0 5px;
    }
  }
}
</style>
