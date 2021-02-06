
<template>
  <v-row class="modal">
    <v-icon @click="onYoutubeClick">mdi-youtube</v-icon>
    
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      class="dialog"
      persistent
      max-width="600px"
      @click.stop="dialog = true"
    >
      <!-- 영상 추가하기 버튼 -->
      <v-card class="card"> 
        <v-card-title class="modal-header-wrapper justify-space-between">
          <span class="headline">
            유튜브 영상 추가하기
          </span>
          <v-btn
            color="#F47E9B"
            class="header-button"
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
                class="searchbar-wrapper d-flex align-center justify-space-around"
                style="width: 100%" 
              >
                <v-text-field
                  label="검색어를 입력하세요"
                  v-model="query"
                  @keypress.enter="onSearchInput"
                  style="margin-right: 30px;"
                ></v-text-field> 
                <v-btn color="#f4b740" @click="onSearchInput">검색</v-btn>
              </div>
              <!-- 검색 결과 하위 컴포넌트로 보내줌 -->
              <YoutubeItem 
                v-for="(video, idx) in videos"
                :key="idx"
                :video="video"
                @select-video="onSelectVideo"
                class="youtube-result-basic"
                v-bind:class="{ 'youtube-result' : isEven(idx) }"
              />
              <infinite-loading 
                v-if="infLoading"
                spinner="spiral"
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
    isEven: function (idx) {
      if (idx % 2) {
        return false
      } else {
        return true
      }
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
          }
          if (this.videos.length == 20) {
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
<style lang="scss">
.v-dialog {
  .card {
    .modal-header-wrapper {
      .header-button {
        font-size: 12pt;
      }
    }
    .v-card__text {
      .container {
        width: 90%;
        padding: 10px;
        .youtube-result-basic {
          padding: 12px;
        }
        .youtube-result {
          background-color: #F2F1F2;        
        }
        .row {
          .infinite-loading-container {
            margin-top: 10px;
            width: 100%;
          }
          .searchbar-wrapper {
            width: 100%;
            .v-btn {
              color:#F2F1F2;
            }
          }
          .youtube-search-item-wrapper {
            width: 100%;
            height: 100%;
            // border-bottom: 1px solid gray;
            .image-wrapper {
              width: 40%;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .middle-wrapper {
              width: 30%;
              div {
                height: 40%;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
            }
            .right-wrapper {
              width: 15%;
              button {
                background-color: #89BA17;
                white-space: nowrap;
                padding: 5px 10px 5px 10px;
                border-radius: 15px;
                box-shadow: 0 4px 4px lightgray;
                color: #F2F1F2;
              }
            }
          }
        }
      }
    }
  }
}
</style>