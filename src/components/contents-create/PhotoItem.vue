<template lang="">
   <div class="photo-wrapper">
      {{ sendPhoto }}
      <img :src="sendPhoto.photo.preview" />
   </div>
</template>
<script>
export default {
   name: 'PhotoItem',
   props: ['sendPhoto'],
   data: () => {
      return {};
   },
};
</script>
<style scoped>
img {
   position: relative;
   /* width: 190px; */
   height: 150px;
   z-index: 10;
}
</style>
