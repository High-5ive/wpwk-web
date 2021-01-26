<template>
  <div>
    <v-row
      justify="center"
    >
      <v-btn
        color="#F47E9B"
        class="ma-2"
        dark
        @click="onNextClicked"
      >
        다음 단계
      </v-btn>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-top-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar
            flat
            dark
            color="#F47E9B"
            max-height="4rem"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>마지막 단계</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="dialog = false"
              >
                완료
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>이 노리는 총 몇 시간 걸리나요?</v-list-item-title>
                  <v-row align="center">
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="hours"
                        label="시간"
                        v-model="time.hour"
                      ></v-select>
                    </v-col>
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="minutes"
                        label="분"
                        v-model="time.minute"
                      ></v-select>                    
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>이 노리를 분류하자면?</v-list-item-title>
                  <v-select
                    v-model="selectedCategories"
                    :items="categories"
                    chips
                    label="중복 선택 가능"
                    multiple
                    outlined
                  ></v-select>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>해시태그도 추가해보세요! (선택)</v-list-item-title>
                  <v-row align="center" justify="center">
                    <v-col
                      aling="center"
                      class="d-flex"
                      cols="12"
                      sm="6"
                    > 
                      <div class="d-flex align-center">
                        <v-icon>mdi-pound</v-icon>
                        <v-text-field
                          label="해시태그"
                          hint="ex) #아이교육 #시간때우기"
                          outlined
                          v-model.trim="hashtag"
                          @keypress.enter="addHashtag"
                        ></v-text-field>
                        
                        <v-icon tag="dpgppg" @click="addHashtag">mdi-plus-circle</v-icon>                                          
                        
                      </div>                
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="3"
                    >
                      <span
                        v-for="(tag, idx) in hashtags"
                        :key="idx"
                        class="hashtag"  
                      >
                        #{{ tag }}
                        <v-icon
                          @click="deleteTag(idx)"
                        >mdi-close</v-icon>
                      </span>                 

                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            

          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
// import axios from 'axios'

export default {
  name: 'CategoryAndTimeInfo',
  props: {
    title: String,
    itemList: Array
  },
  data: function () {
    return {
      dialog: false,
      time: {
        hour: 0,
        minute: 0
      },
      selectedCategories: [],
      hashtag: '',
      hashtags: [],
      // 임시 데이터(나중에는 vuex사용하기..?)
      hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      minutes: [0, 10, 20, 30, 40, 50],
      categories: [
        '언어지능',
        '논리수학지능',
        '음악지능',
        '신체운동지능',
        '공간지능',
        '자연지능',
        '대인지능',
        '개인내지능'
      ]
    }
  },
  methods: {
    onNextClicked: function () {
      if (this.itemList.length > 0 & this.title.length > 0) {
        this.dialog = true
      } else {
        alert("내용을 작성해 주세요.")
      }
    },
    addHashtag: function () {
      const newTag = this.hashtag.replaceAll(" ", "_")
      if (this.hashtags.indexOf(newTag) >= 0) {
        alert("이미 추가된 해시태그입니다")
        this.hashtag = ''
      } else if (this.hashtag.length == 0) {
        alert("내용을 적어주세요")
      } else {
        this.hashtags.push(newTag)
        this.hashtag = ''
      }
      
    },
    deleteTag: function (index) {
      this.hashtags.splice(index, 1)
    },
    setToken: function () {
      const token = localStorage.getItem('jwt')

      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    createContent: function () {
      // const config = this.setToken()

      // const content = {
      //   title: this.title,
      //   itemList: this.itemList,
      //   timeInfo: this.time,
      //   categories: this.selectedCategories,
      //   hashtags: this.hashtags
      // }

      // axios.post(api, content, config)
      // .then((res) => {
      //   console.log(res)
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
    }
  }
}
</script>
<style scoped>
.hashtag {
  /* display: inline !important; */
  width: 300px;
  margin-right: 10px;
  font-weight: 700;
}
</style>