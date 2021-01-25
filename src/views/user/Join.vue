<template lang="">
   <div class="container">
      <div class="wrapper">
         <h3>우리 서비스에 함께 해주세요</h3>
         <br />
         <label for="email">이메일 </label>
         <input type="text" v-model="email" id="email" placeholder="이메일을 입력하세요." />
         <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-2"
            label="Not visible"
            hint="At least 8 characters"
            value=""
            class="input-group--focused"
            @click:append="show1 = !show1"
         ></v-text-field>
         <v-text-field
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Error"
            hint="At least 8 characters"
            value=""
            error
            @click:append="show2 = !show2"
         ></v-text-field>

         <router-link to="login">뒤로가기</router-link>
      </div>
   </div>
</template>
<script>
export default {
   data() {
      return {
         email: '',
         show1: false,
         show2: false,
         password: 'Password',
         rules: {
            required: (value) => !!value || 'Required.',
            min: (v) => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => `The email and password you entered don't match`,
         },
      };
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

.wrapper {
   background-color: rgba(241, 249, 255, 0.555);
   border-radius: 45px;

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

   /* box-shadow: 0px 9px 20px 0px #56565629; */
}
</style>
