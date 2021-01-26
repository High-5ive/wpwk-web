
<template>
  <v-row>
    <v-icon @click="onYoutubeClick">mdi-youtube</v-icon>
    
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      persistent
      max-width="600px"
      @click.stop="dialog = true"
    >
      <!-- 영상 추가하기 버튼 -->
      <v-card>
        <v-card-title fixed-header class="justify-space-between">
          <span class="headline">
            유튜브 영상 추가하기
          </span>
          <v-btn
            color="blue darken-1"
            text
            @click="onCancel" 
          >
            취소
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- 검색창 -->
              <div 
                class="d-flex align-center justify-space-around"
                style="width: 100%" 
              >
                <v-text-field
                  label="검색어를 입력하세요"
                  v-model="query"
                  @keypress.enter="onSearchInput"
                  style="margin-right: 30px;"
                ></v-text-field> 
                <v-btn @click="onSearchInput">검색</v-btn>
              </div>
              <!-- 검색 결과 하위 컴포넌트로 보내줌 -->
              <YoutubeItem 
                v-for="(video, idx) in videos"
                :key="idx"
                :video="video"
                @select-video="onSelectVideo"
                style="margin-bottom: 30px;"
              />
              <infinite-loading 
                v-if="infLoading" 
                @infinite="infiniteHandler"              
              ></infinite-loading>

            </v-row>
          </v-container>
        </v-card-text>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import infiniteLoading from 'vue-infinite-loading'
import YoutubeItem from './YoutubeItem.vue'

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY

export default {
  name: 'YoutubeCreate',
  components: {
    YoutubeItem,
    infiniteLoading
  },
  props: {
    isAdded: Boolean
  },
  data: function () {
    return {
      dialog: false,
      infLoading: false,
      videoAdded: false,
      videos: [],
      query: '',
      nextPageToken: '',
    }
  },
  methods: {
    onSearchInput: function () {
      axios.get(YOUTUBE_API_URL, {
        params: {
          key: YOUTUBE_API_KEY,
          part: 'snippet',
          type: 'video',
          maxResults: 5,
          q: this.query
        }
      })
      .then(res => {
        this.videos = res.data.items
        this.nextPageToken = res.data.nextPageToken
        this.infLoading = true
      })
      .catch(err => console.log(err))
    },

    onSelectVideo: function (video) {
      this.$emit('select-video', video)
      this.videoAdded = true
      this.dialog = false
      this.infLoading = false
      this.query = ''
      this.videos = []
    },

    onCancel: function () {
      this.dialog = false
      this.infLoading = false
      this.query = ''
      this.videos = []
    },

    onYoutubeClick: function () {
      if (this.videoAdded==true) {
        alert('유튜브 항목은 한 개만 넣을 수 있습니다')
        this.dialog = false
        this.infLoading = false
        this.query = ''
        this.videos = []
      } else {
        this.dialog = true
      }
    },
    
    // 무한 스크롤 (다음 페이지에 있는 요청결과 가져와서 원래 video list 와 합치기)
    infiniteHandler($state) {      
      axios.get(YOUTUBE_API_URL, {
        params: {
          key:YOUTUBE_API_KEY,
          part: 'snippet',
          type: 'video',
          maxResults: 5,
          q: this.query,
          pageToken: this.nextPageToken
        },  
      })
      .then(res => {
        setTimeout(() => {
          if (res.data.items.length) {
            this.nextPageToken = res.data.nextPageToken
            this.videos = this.videos.concat(res.data.items)
            $state.loaded()
          } if (this.videos.length == 20) {
            $state.complete()
          }
        }, 1000)
      })
    },
  },
  watch: {
    isAdded: function () {
      if (this.isAdded==false) {
        this.videoAdded = false
      }
    }
  }
}
</script>
<style scoped>
</style>