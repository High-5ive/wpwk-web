<template>
   <div class="container">
      <div class="wrapper">
         <div class="title">
            <img src="@/assets/wpwk_logo.png" style="width:200px" />
         </div>
         <div class="input-wrapper">
            <div class="input-email">
               <label for="email">이메일 </label>
               <input type="text" v-bind:class="{ error: error.email, complete: !error.email && email.length !== 0 }" v-model="email" id="email" placeholder="이메일을 입력하세요." />
               <div class="error-text" v-if="error.email">
                  <v-icon>
                     mdi-alert-decagram
                  </v-icon>
                  {{ error.email }}
               </div>
            </div>
            <div class="input-password">
               <label for="password">비밀번호 </label>
               <input
                  type="password"
                  v-bind:class="{ error: error.password, complete: !error.password && password.length !== 0 }"
                  v-model="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요."
                  @keyup.enter="doLogin({ email, password })"
               />
               <div class="error-text" v-if="error.password"><v-icon> mdi-alert-decagram </v-icon> {{ error.password }}</div>
            </div>
         </div>
         <div class="feature-wrapper">
            <p>비밀번호를 잊었나요?</p>
            <v-btn color="success" @click="doLogin({ email, password })">로그인</v-btn>
            <p>아직 회원이 아닌가요? <router-link to="Join">5초 회원가입</router-link></p>
         </div>
         <div class="social-wrapper">
            <p>SNS 간편 로그인</p>
         </div>
      </div>
   </div>
</template>
<script>
// import PV from 'password-validator';
import * as EmailValidator from 'email-validator';
import { mapActions } from 'vuex';

export default {
   data() {
      return {
         email: '',
         password: '',
         error: {
            email: false,
            password: false,
         },
         isSubmit: false,
      };
   },
   methods: {
      ...mapActions(['doLogin']),

      checkForm() {
         if (this.email.length > 0 && !EmailValidator.validate(this.email)) {
            this.error.email = '이메일 형식이 아닙니다.';
         } else this.error.email = false; //조건 충족시, 화면 다시 없애도록

         if (this.password.length > 0 && !this.checkPW(this.password)) {
            this.error.password = '영문, 숫자 혼합 6-20을 다시 확인.';
         } else this.error.password = false; //조건 충족시, 화면 다시 없애도록
      },

      checkPW(str) {
         // 영문, 숫자 혼합 6글자 이내
         var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
         // test()
         if (reg_pwd.test(str) === true) {
            return true;
         } else return false;
      },
   },

   watch: {
      email: function() {
         this.checkForm();
      },
      password: function() {
         this.checkForm();
      },
   },
};
</script>
<style scoped>
.container {
   background-color: white;

   /* 전체화면 가리기 */
   width: 100%;
   max-width: 100%;
   height: 100%;
   padding: 0px;
   margin: 0px;

   /* 창 덮기 */
   position: fixed;
   top: 0;
   left: 0;
   z-index: 10;
}

.input-wrapper label {
   display: block;
   margin-bottom: 10px;
}

.input-wrapper .error {
   background-color: transparent !important;
   border: 1px solid rgb(227, 35, 21) !important;
}

.wrapper {
   background-color: white;
   min-width: 360px;
   min-height: 500px;
   width: 50%;
   height: 80%;
   margin: 0 auto;
   margin-top: 50px;
   padding: 60px 0px;

   display: flex;
   flex-direction: column;
   align-items: center;

   box-shadow: 0px 9px 20px 0px #56565629;
}

.input-wrapper input {
   width: 250px;
   height: 50px;
   border-radius: 25px;
   background-color: #a2d646;

   padding-left: 20px;
   /* border-bottom: 2px solid rgb(8, 89, 40); */
}
.input-wrapper input:nth-child(2n + 1) {
   background-color: #f4b740;
   /* border-bottom: 2px solid rgb(8, 89, 40); */
}

.input-wrapper label {
   text-align: center;
   font-size: 12px;
   font-weight: 600;
}

input:focus {
   outline: none;
}

input::placeholder {
   color: white;
   font-style: italic;
   font-size: 10pt;
}

.input-password,
.input-email {
   margin-top: 30px;
}

.error-text {
   position: absolute;
   margin-top: 4px;
   color: rgb(255, 81, 81);
   font-size: 13px;
}

.error-text i {
   color: rgb(255, 81, 81);
   font-size: 17px;
}

.feature-wrapper {
   margin-top: 50px;
}
</style>
