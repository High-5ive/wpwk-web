<template>
   <div>
      <v-row justify="center" class="last-dialog">
         <span class="right-button" @click="onNextClicked">
            다음
         </span>
         <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card tile class="card">
               <v-card-text>
                  <div class="dialog-top-wrapper">
                     <div class="top-left">
                        <v-icon>
                           mdi-alarm
                        </v-icon>
                     </div>
                     <div class="top-right">
                        <v-select class="select-input" :items="hours" label="시간" color="#f4b740" v-model="time.hour"></v-select>
                        <v-select class="select-input" :items="minutes" label="분" color="#f4b740" v-model="time.minute"></v-select>
                     </div>
                  </div>
                  <div class="dialog-middle-wrapper">
                     <div v-for="(category, idx) in categories" :key="idx" class="categories">
                        <category-item @on-cate-select="onCategorySelect" :category="category" />
                     </div>
                  </div>
                  <div class="dialog-bottom-wrapper">
                     <div class="bottom-top">
                        <div class="upper">
                           <v-icon>mdi-pound</v-icon>
                           <div class="hashtag-search" @keyup.down="selectValue('down')" @keyup.up="selectValue('up')">
                              <v-text-field
                                 id="hashtagInput"
                                 label="해시태그 추가(선택)"
                                 outlined
                                 class="hashtagInput"
                                 color="#f4b740"
                                 maxlength="10"
                                 v-on:input="filterList"
                                 v-model.trim="hashtag"
                                 @keypress.enter="addHashtag"
                                 style="padding: 0; margin: 0;"
                              ></v-text-field>
                              <ul
                                 v-if="hashtagResult.length"
                                 class="hashtag-list" 
                                 tabindex="0"
                                 @mouseover="removeValue"
                              >
      
                                 <li 
                                    v-for="tag in hashtagResult" 
                                    :key="tag.id"
                                    @click="changeValue(tag.name)"
                                    @keyup.enter="selectValue('enter', tag.name)" 
                                    tabindex="-1"
                                 >
                                    <span>{{ tag.name }}</span>
                                 </li>
                              </ul>
                           </div>

                           <v-icon @click="addHashtag">mdi-plus-circle</v-icon>
                        </div>
                     </div>
                     <div class="bottom-bt">
                        <span v-for="(tag, idx) in hashtags" :key="idx" class="hashtag">
                           #{{ tag }}
                           <v-icon @click="deleteTag(idx)">mdi-close</v-icon>
                        </span>
                     </div>
                  </div>

                  <div class="dialog-footer d-flex justify-space-between">
                     <div class="dialog-footer-button d-flex justify-center">
                        <div class="dialog-footer-left" @click="dialog = false">뒤로</div>
                        <div class="dialog-footer-right" @click="dialog = false">완료</div>
                     </div>
                  </div>
               </v-card-text>
            </v-card>
         </v-dialog>
      </v-row>
   </div>
</template>
<script>
import CategoryItem from './CategoryItem.vue';
import { createContents } from '@/api/contents.js';
import { createTags } from '@/api/contents.js';
import { recommendTags } from '@/api/tags.js';

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
         selectedCategories: [0, 0, 0, 0, 0, 0, 0, 0],
         hashtagResult: [],

         hashtag: '',
         isActive: false,
         allHashtags: [
            {
               id: 3,
               name: '아이',
               count: 7,
            },
            {
               id: 4,
               name: '아이랑 놀아주기',
               count: 5,
            },
            {
               id: 1,
               name: '아이와 함께',
               count: 2,
            },
            {
               id: 14,
               name: '아이교육',
               count: 1,
            },
         ],
         hashtags: [],
         // 임시 데이터(나중에는 vuex사용하기..?)
         hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
         minutes: [0, 10, 20, 30, 40, 50],
         categories: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
      };
   },
   methods: {
      onNextClicked: function() {
         if (this.itemList.length > 0 && this.title.length > 0) {
            this.dialog = true;
         } else {
            alert('내용을 작성해 주세요.');
         }
      },
      // 해시태그 특수문자에는 반응하지 않도록 필터링후 서버에 요청
      filterList: function() {
         const isValid = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|\s]/.test(this.hashtag);
         if (isValid === false && this.hashtag) {
            this.isActive = true;
            this.searchTag(this.hashtag)
            // return this.hashtagResult
            // this.hashtagResult = this.allHashtags.filter((tag) => {
            //    return tag.name.match(this.hashtag);
            // });
         } else {
            this.isActive = false;
         }
      },
      // 목록에서 해시태그를 선택했을 때
      changeValue: function (tag) {
         this.isActive = false;
         this.hashtag = tag;
         this.addHashtag()
         this.hashtagResult = []
         document.querySelector('#hashtagInput').focus()
         
      },
      removeValue: function () {
         if (document.querySelector('.hashtag-list').classList.contains('key')) {
            document.querySelector('.hashtag-list').classList.remove('key');
            document.querySelector('.hashtag-list li.sel').classList.remove('sel');
         }
      }, 
      // 해시태그 목록에서 위아래버튼 및 엔터버튼 눌렸을때 (해시태그 선택할 때)
      selectValue: function (keycode, tag) {
         if (this.isActive === true) {
            const hasClass = document.querySelector('.hashtag-list').classList.contains('key');
            if (keycode === 'down') {
               if (!hasClass) {
               const thisEl = document.querySelectorAll('.hashtag-list li')[0];
               document.querySelector('.hashtag-list').classList.add('key');
               thisEl.classList.add('sel');
               thisEl.focus();
               } else {
               const lastEl = document.querySelector('.hashtag-list li:last-child');
               const thisEl = document.querySelector('.hashtag-list li.sel');
               const nextEl = thisEl.nextElementSibling;
               if (!lastEl.classList.contains('sel')) {
                  thisEl.classList.remove('sel');
                  nextEl.classList.add('sel');
                  nextEl.focus();
               }
               }
            }
            if (keycode === 'up' && hasClass) {
               const firstEl = document.querySelectorAll('.hashtag-list li')[0];
               const thisEl = document.querySelector('.hashtag-list li.sel');
               const prevEl = thisEl.previousElementSibling;
               if (!firstEl.classList.contains('sel')) {
               thisEl.classList.remove('sel');
               prevEl.classList.add('sel');
               prevEl.focus();
               } else {
               document.querySelector('.v-input__control').focus();
               }
            }
            if (keycode === 'enter' && hasClass) {
               this.changeValue(tag)
            }
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
            if (this.hashtags.length < 12) {
               this.hashtags.push(newTag);
               this.hashtag = '';
            } else {
               alert('해시태그는 최대 10개까지 적을 수 있습니다.');
               this.hashtag = '';
            }
         }
      },
      /**
       * 해시태그 검색 요청 구현
       */
      searchTag(tag) {
         recommendTags(
            tag,
            (res) => {
               this.hashtagResult = res.data;
            },
            (error) => {
               console.log(error);
            }
         );
      },
      onCategorySelect: function(category) {
         const targetIndex = this.categories.indexOf(category);

         if (this.selectedCategories[targetIndex] == 0) {
            this.selectedCategories[targetIndex] = 1;
         } else {
            this.selectedCategories[targetIndex] = 0;
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
         var abilitiesStr = '';
         for (let i = 0; i < this.selectedCategories.length; i++) {
            abilitiesStr = abilitiesStr.concat(this.selectedCategories[i]);
         }
         console.log(this.selectedCategories);
         console.log(abilitiesStr);
         const content = {
            title: this.title,
            contentsItemList: this.itemList,
            spendTime: this.time.hour + ':' + this.time.minute + ':00',
            ability: abilitiesStr,
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
.v-dialog {
   margin-top: 55px;
   border: 0;
   box-shadow: none;
   .card {
      .v-card__text {
         width: 100%;
         padding: 0;
         .dialog-top-wrapper {
            padding-left: 10px;
            padding-right: 10px;
            margin-top: 30px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .top-left {
               width: 10%;
               text-align: center;
               margin-bottom: 10px;
               i {
                  font-size: 25pt;
                  color: #a2d646;
               }
            }
            .top-right {
               width: 90%;
               display: flex;
               justify-content: space-between;

               .select-input {
                  margin-left: 10px;
                  margin-right: 10px;
               }
            }
         }
         .dialog-middle-wrapper {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .categories {
               .item-wrapper {
                  width: 110px;
                  margin: 10px;
                  padding: 5px;
                  border: lightgray 5px solid;
                  border-radius: 20px;
                  text-align: center;
                  font-size: 12pt;
                  font-weight: 900;
                  color: rgb(159, 158, 158);
                  // box-shadow: 0 4px 4px lightgray;
               }
               .selected {
                  color: #a2d646;
                  border: #a2d646 5px solid;
               }
            }
         }
         .dialog-bottom-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            .bottom-top {
               width: 100%;
               display: flex;
               flex-direction: column;
               align-items: center;
               .upper {
                  width: 70%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .v-icon {
                     margin: 0 5px;
                  }
               }
               .hashtag-search {
                  width: 200px; // 반응형 수정 필요

                  .v-input__control {
                     position: relative;
                     padding-top: 25px;
                     // margin-left: 10px;
                     // margin-right: 10px;
                  }
                  .hashtag-list {
                     // display: none;
                     list-style: none;
                     padding-left: 0px;
                     z-index: 10;
                     // margin-left: -1px;
                     margin-top: -40px;
                     position: absolute;
                     // margin-left: 10px;
                     border-left: #f4b740 solid 2px;
                     border-bottom: #f4b740 solid 2px;
                     border-right: #f4b740 solid 2px;
                     border-radius: 0 0 8px 8px;
                     background-color: #FFFFFF;
                     width: 200px; // 반응형 수정 필요
                     li {
                        font-size: 12pt;
                        padding: 8px 12px;
                        
                        &:hover, &.sel {
                           background-color: #f4b8407f;
                           color: black;
                        }
                        &.sel:focus {
                           outline: none;
                        }
                     }
                  }
               }
            }
            .bottom-bt {
               border-radius: 10px;
               width: 100%;
               padding: 0 20px;
               display: flex;
               justify-content: center;
               flex-wrap: wrap;
               .hashtag {
                  width: initial;
                  border: #f4b740 solid 3px;
                  margin: 5px;
                  text-align: center;
                  padding: 3px;
                  border-radius: 25px;
                  .v-icon {
                     font-size: 12pt;
                     margin-bottom: 2px;
                  }
               }
            }
         }
         .dialog-footer {
            width: 100%;
            z-index: 100;
            position: fixed;
            bottom: 0;
            height: 50px;
            .dialog-footer-button {
               width: 100%;
               .dialog-footer-left {
                  background-color: #f4b740;
                  padding-top: 12px;
                  width: 50%;
                  font-size: 13pt;
                  text-align: center;
               }
               .dialog-footer-right {
                  background-color: #a2d646;
                  padding-top: 12px;
                  width: 50%;
                  font-size: 13pt;
                  text-align: center;
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
