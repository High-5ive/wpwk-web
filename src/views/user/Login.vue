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
               <div class="error-text" v-if="error.email">{{ error.email }}</div>
            </div>
            <br />
            <hr />
            <br />
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
               <div class="error-text" v-if="error.password">{{ error.password }}</div>
            </div>
         </div>
         <div class="feature-wrapper">
            <p>비밀번호를 잊었나요?</p>
            <v-btn color="success" @click="doLogin({ email, password })">로그인</v-btn>
            <br />
            아직 회원이 아닌가요? <router-link to="Join">5초 회원가입</router-link> <br />
         </div>
         <hr />
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
            this.error.password = '조건(영문, 숫자 혼합 6-20)을 다시 확인하세요.';
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

.input-wrapper input {
   border: 1px solid grey;
}

input:focus {
   outline: none;
}

.input-wrapper .error {
   background-color: white !important;
}

.wrapper {
   background-color: whitesmoke;
}
</style>
