  
<template>
<div v-if="loading">
  인증 중입니다...
</div>
</template>
<script>
import axios from "axios"
import router from "../../router/router"
export default {
    data() {
      return {
        loading: true,
      }
    },
    created() {
      this.checkEmailAuth()
    },
    methods: {
        // 이메일 인증
        checkEmailAuth() {          
          axios.get("http://localhost:9004/users/confirm?uid=" + this.$route.query.uid
          + "&verificationKey=" + this.$route.query.verificationKey)
          .then(res => {
            this.loading = true            
            if(res.status === 200) {
              alert("회원가입이 완료되었습니다.")
            }
            if(res.status === 208) {
              alert("이미 인증이 완료된 이메일입니다.")
            }            
            router.push({ name: "Login" })
          })
          .catch(() => {
            this.loading = true
            alert("인증코드가 일치하지 않습니다.")
            router.push({ name: "Login" })
          })
        },
    }
}
</script>
<style>
</style>