<template>
   <div>
      <v-img class="white--text align-end" height="200px" :src="item.photo.preview" />
      <br>
   </div>
</template>

<script>
export default {
   name: 'ArticlePhotoItem',
   props: {
     item: Object,
     idx: Number,
  },
};
</script>
<style scoped>
</style>