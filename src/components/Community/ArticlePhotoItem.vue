<template>
   <div>
      <img :src="item.photo.preview" />
   </div>
</template>

<script>
export default {
   name: 'ContentsPhotoItem',
   props: {
     item: Object,
     idx: Number,
  },
};
</script>
<style scoped>
img {
   width: 30%;
   height: 30%;
}
</style>