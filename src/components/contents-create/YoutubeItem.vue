<template>
  <div class="youtube-search-item-wrapper d-flex align-center justify-space-between" style="width: 100%" >
    <div class="image-wrapper">
      <img :src="thumbnailSrc" alt="video thumbnail">
    </div>
    <div class="middle-wrapper">
      <div :title="video.snippet.title | unescape">{{ video.snippet.title | unescape }}</div>
    </div>
    <div class="right-wrapper d-flex justify-center">
      <button
      @click="onSelectVideo"
      >선택</button>
    </div>
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
      return `https://img.youtube.com/vi/${this.video.id.videoId}/hqdefault.jpg`
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
      console.log(video)
    }
  }

}
</script>
<style>
  
</style>