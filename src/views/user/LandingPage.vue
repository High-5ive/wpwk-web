<template>
   <div class="container">
      <div class="wrapper">
         <div class="title">
            <p>저희 서비스를 <br />이용 해본 적 있으신가요?</p>
         </div>
         <div class="link">
            <p><router-link to="Login">물론이죠!</router-link></p>
            <p><router-link to="#">아뇨 처음입니다</router-link></p>
         </div>
      </div>
   </div>
</template>
<script>
export default {};
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

.container > .wrapper {
   margin: 0 auto;
   margin-top: 50px;
   width: 80%;
   /* background-color: blue; */
}

.wrapper .title > p {
   font-size: 2em;
   line-height: 1.4em;
}

.link {
   width: 200px;
   position: absolute;
   bottom: 0;

   left: 50%;
   transform: translateX(-50%);
   text-align: center;
   margin-bottom: 20%;
}

.link a {
   font-size: 1.2em;
   /* text-decoration: none; */
   color: black;
}
</style>
