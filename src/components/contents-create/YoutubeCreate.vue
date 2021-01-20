
<template>
  <v-row justify="start">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <!-- 영상 추가하기 버튼 -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          유튜브 영상 추가하기
        </v-btn>
      </template>
      <v-card>
        <v-card-title fixed-header>
          <span class="headline">
            유튜브 영상 추가하기
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- 검색창 -->
              <div class="d-flex align-center justify-space-around">
                <v-text-field
                  label="검색어를 입력하세요"
                  v-model="query"
                  @keypress.enter="onSearchInput"
                ></v-text-field> 
                <v-btn @click="onSearchInput">검색</v-btn>
              </div>
              <!-- 검색 결과 하위 컴포넌트로 보내줌 -->
              <YoutubeItem 
                v-for="(video, idx) in videos"
                :key="idx"
                :video="video"
                @select-video="onSelectVideo"
              />
            <infinite-loading v-if="infLoading" @infinite="infiniteHandler"></infinite-loading>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="onCancel" 
          >
            취소
          </v-btn>
        </v-card-actions>
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
  data: function () {
    return {
      dialog: false,
      videos: [],
      query: '',
      nextPageToken: '',
      infLoading: false,
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
      this.dialog = false
      this.query = ''
      this.videos = []
      
    },
    onCancel: function () {
      this.dialog = false
      this.query = ''
      this.videos = []
      this.infLoading = false
    },

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
  }
}
</script>
<style>
  
</style>