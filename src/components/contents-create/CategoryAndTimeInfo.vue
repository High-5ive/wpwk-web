<template>
  <div>
    <v-row justify="center" class="last-dialog">
      <v-btn color="#89BA17" class="ma-2" small dark @click="onNextClicked">
        다음
      </v-btn>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile class="card">
          <v-toolbar flat dark class="toolbar" color="white" max-height="4rem">
            <v-btn icon dark color="black" @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="toolbar-title"
              >(수정예정)마지막 단계</v-toolbar-title
            >

            <v-toolbar-items>
              <button class="complete-button" @click="createContent">
                완료
              </button>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >이 노리는 총 몇 시간 걸리나요?</v-list-item-title
                  >
                  <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :items="hours"
                        label="시간"
                        v-model="time.hour"
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
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
                  <div
                    v-for="(category, idx) in categories"
                    :key="idx"
                    class="categories"
                  >
                    <category-item
                      @on-cate-select="onCategorySelect"
                      :category="category"
                    />
                  </div>
                  <!-- <v-select
                    v-model="selectedCategories"
                    :items="categories"
                    chips
                    label="중복 선택 가능"
                    multiple
                    outlined
                  ></v-select> -->
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >해시태그도 추가해보세요! (선택)</v-list-item-title
                  >
                  <v-row align="center" justify="center">
                    <v-col aling="center" class="d-flex" cols="12" sm="6">
                      <div class="d-flex align-center">
                        <v-icon>mdi-pound</v-icon>
                        <v-text-field
                          label="해시태그"
                          hint="ex) #아이교육 #시간때우기"
                          outlined
                          v-model.trim="hashtag"
                          @keypress.enter="addHashtag"
                        ></v-text-field>

                        <v-icon @click="addHashtag">mdi-plus-circle</v-icon>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex" cols="12" sm="3">
                      <span
                        v-for="(tag, idx) in hashtags"
                        :key="idx"
                        class="hashtag"
                      >
                        #{{ tag }}
                        <v-icon @click="deleteTag(idx)">mdi-close</v-icon>
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
import CategoryItem from './CategoryItem.vue';
import { createContents } from '@/api/contents.js';
import { createTags } from '@/api/contents.js';

export default {
  name: 'CategoryAndTimeInfo',
  components: {
    CategoryItem,
  },
  props: {
    title: String,
    itemList: Array,
  },
  data: function() {
    return {
      contentsId: '',
      dialog: false,
      time: {
        hour: 0,
        minute: 0,
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
        '개인내지능',
      ],
    };
  },
  methods: {
    onNextClicked: function() {
      if ((this.itemList.length > 0) & (this.title.length > 0)) {
        this.dialog = true;
      } else {
        alert('내용을 작성해 주세요.');
      }
    },
    addHashtag: function() {
      const newTag = this.hashtag.replaceAll(' ', '_');
      if (this.hashtags.indexOf(newTag) >= 0) {
        alert('이미 추가된 해시태그입니다');
        this.hashtag = '';
      } else if (this.hashtag.length == 0) {
        alert('내용을 적어주세요');
      } else {
        this.hashtags.push(newTag);
        this.hashtag = '';
      }
    },
    onCategorySelect: function(category) {
      console.log('선택');
      const targetIndex = this.selectedCategories.indexOf(category);
      if (targetIndex >= 0) {
        this.selectedCategories.splice(targetIndex, 1);
      } else {
        this.selectedCategories.push(category);
      }
    },
    deleteTag: function(index) {
      this.hashtags.splice(index, 1);
    },
    createContent: function() {
      let len = this.itemList.length;
      let cnt = 1;
      for (let i = 0; i < len; i++) {
        this.itemList[i].pageNo = cnt++;
      }
      this.dialog = false;
      const content = {
        title: this.title,
        contentsItemList: this.itemList,
        spendTime: this.time.hour + ':' + this.time.minute + ':00',
        abilities: this.selectedCategories,
      };
      console.log(content);

      //contents.js 안의 정의 되어있는 axios 호출
      const tags = {
        tagList: this.hashtags,
      };

      createContents(
        content,
        (success) => {
          this.contentsId = success.data;
          console.log('create contents suc msg ', success);
          // console.log(contentsId);
          alert('컨텐츠 제작에 성공 했습니다.');
          //컨텐츠 제작후 태그 제작 요청
          console.log(this.contentsId);
          createTags(
            this.contentsId,
            tags,
            (suc) => {
              console.log('suc tag msg ', suc);
              this.$router.push('/');
            },
            (error) => {
              console.log('error tag msg ', error);
            }
          );
        },
        (error) => {
          console.log('create contents err msg', error);
          alert('컨텐츠 제작에 실패 했습니다.');
          // contentsCreate에서 itemList가 새롭게 추가되는 버그 있음
        }
      );
    },
  },
};
</script>
<style lang="scss">
.last-dialog {
  .v-btn {
    width: 50px;
    .v-btn__content {
      font-size: 11pt;
    }
  }
}
.v-dialog {
  margin-top: 55px;
  border: 0;
  box-shadow: none;
  .card {
    .toolbar {
      .toolbar-title {
        color: black;
        padding-right: 50px;
      }
      .v-toolbar__content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .v-toolbar__items {
          display: flex;
          align-items: center;
          .complete-button {
            height: 30px;
            width: 50px;
            box-shadow: 0 3px 3px lightgray;
            border-radius: 5px;
            background-color: #89ba17;
            color: white;
          }
        }
      }
    }
    .v-card__text {
      .v-list {
        .v-list-item {
          .v-list-item__content {
            width: 100%;
            .categories {
              .item-wrapper {
                background-color: aquamarine;
                width: 80px;
              }
              .selected {
                background-color: lightgray;
                width: 80px;
              }
            }
          }
        }
      }
    }
  }
}
.hashtag {
  /* display: inline !important; */
  width: 300px;
  margin-right: 10px;
  font-weight: 700;
}
</style>
