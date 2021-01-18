<template>
   <div class="contanier">
      <div class="link-wrapper">
         <router-link to="/">Nori</router-link>
         <router-link to="/cmmu">Community</router-link>
         <router-link to="/mypage">My Page</router-link>
      </div>
   </div>
</template>
<script>
export default {};
</script>
<style scoped>
.link-wrapper {
   display: flex;
   flex-direction: column;
   height: 100%;
}

.link-wrapper a {
   color: black;
   text-decoration: none;
   font-size: 1.2em;

   text-align: center;
   margin-top: 20px;
}
</style>
