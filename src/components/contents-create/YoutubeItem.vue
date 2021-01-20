<template>
  <div class="d-flex align-center justify-space-around">
    <img :src="thumbnailSrc" alt="video thumbnail">
    <span style="margin-left: 5px;">{{ video.snippet.title | unescape }}</span>
    <v-btn @click="onSelectVideo">선택</v-btn>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'YoutubeItem',
  props: {
    video: Object
  },
  computed: {
    thumbnailSrc: function () {
      return this.video.snippet.thumbnails.default.url
    }
  },
  filters: {
    unescape: function (text) {
      return _.unescape(text)
    }
  },
  methods: {
    onSelectVideo: function () {
      const video = {
        thumbnailSrc: this.video.snippet.thumbnails.default.url,
        title: _.unescape(this.video.snippet.title),
        videoId: this.video.id.videoId,
        videoCaption: this.video.snippet.description
      }
      this.$emit('select-video', video)
    }
  }

}
</script>
<style>
  
</style>