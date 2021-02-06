<template lang="">
   <div class="container"></div>
</template>

<script>
export default {
   name: 'Search',
};
</script>

<style lang="scss" scoped>
.container {
   // animation: 1s ease-in 0s 1 slideInFromTop;

   // @keyframes slideInFromTop {
   //    0% {
   //       transform: translateY(-100px);
   //       // opacity: 0;
   //    }

   //    100% {
   //       transform: translateY(0);
   //       // opacity: 1;
   //    }
   // }

   position: fixed;
   top: 55px;
   left: 0;
   background-color: rgb(245, 245, 245);
   width: 100%;
   height: 300px;
   z-index: 10;
   border-radius: 0 0 50px 50px;

   box-shadow: 0px 20px 20px 0px #56565652;
}
</style>
