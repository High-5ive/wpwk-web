<template>
  <div class="d-flex align-center justify-space-between" style="width: 100%" >
    <div class="d-flex align-center">
      <img :src="thumbnailSrc" alt="video thumbnail">
      <span style="margin-left: 30px; width: 50%;">{{ video.snippet.title | unescape }}</span>
    </div>
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
        thumbnailSrc: `https://img.youtube.com/vi/${this.video.id.videoId}/hqdefault.jpg`,
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