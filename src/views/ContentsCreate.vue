<template>
  <!-- 노리 제작 헤더 -->
  <div class="container">
    <guideline class="guide" style="margin-right: 10px" />
    <v-text-field
      id="input-title"
      v-model="title"
      label="제목"
      hint="ex) [11세]집에서 할 수 있는 축구게임"
    ></v-text-field>
    <v-divider></v-divider>
    <!-- 노리의 항목들 -->
    <draggable
      :list="itemList"
      :options="{ animation: 300 }"
    >
      <div
        v-for="(item, idx) in itemList"
        :key="idx"
        class="div-wrapper d-flex align-center justify-space-between"
      >
        <!-- 노리의 유튜브 항목 -->
        <div class="circle">{{ idx + 1 }}</div>
        <div class="item-wrapper d-flex align-center justify-space-between">
          <span class="left-wrapper handle">
            <v-icon>
              mdi-menu
            </v-icon>
          </span>
          <div class="middle-wrapper">
            <contents-youtube-item
              v-if="item.type == 'youtube'"
              :item="item"
              :idx="idx"
              @delete-item="deleteItem"
              @item-change="onItemChange"
            />
            <!-- 노리의 사진항목 -->
            <contents-photo-item
              v-else-if="item.type == 'photo'"
              :item="item"
              :idx="idx"
              @delete-item="deleteItem"
              @item-change="onItemChange"
            />
            <!-- 노리의 텍스트 항목 -->
            <contents-text-item
              v-else
              :item="item"
              :idx="idx"
              @delete-item="deleteItem"
              @item-change="onItemChange"
            />
          </div>
          <div class="right-wrapper">
            <button @click="deleteItem(idx)">
              <v-icon>mdi-trash-can</v-icon>
            </button>
          </div>
        </div>
      </div>
    </draggable>
    <!-- 항목 추가 위한 버튼들 -->
    <div class="footer d-flex flex-column">
      <div class="footer-buttons d-flex justify-center align-center">
        <div class="btn-wrapper">
          <YoutubeCreate
            :isAdded="youtubeAdded"
            @select-video="onSelectVideo"
            class="footerButtons"
          />
        </div>
        <div class="btn-wrapper">
          <v-icon @click="axiosFileSelect" class="footerButtons">
            mdi-image-multiple
          </v-icon>
        </div>
        <div class="btn-wrapper">
          <v-icon @click="createTextItem" class="footerButtons"
            >mdi-note-text-outline</v-icon
          >
          <input
            type="file"
            id="fileUpload"
            ref="files"
            style="display:none"
            @change="axiosFileChange"
            multiple
          />
        </div>
      </div>
      <div class="footer-navi d-flex justify-space-between">
        <div @click="cancleCreate" class="left-button">
          취소
        </div>
        <div class="right-button">
          <category-and-time-info :title="title" :itemList="itemList" />
        </div>
      </div>
    </div>
    <div class="background-text">
      <p>아래 버튼을 눌러 <br> 컨텐츠를 추가해주세요!</p>
      <v-icon>mdi-arrow-down</v-icon>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import YoutubeCreate from "../components/contents-create/YoutubeCreate.vue";
import ContentsYoutubeItem from "@/components/contents-create/ContentsYoutubeItem.vue";
import ContentsTextItem from "@/components/contents-create/ContentsTextItem.vue";
import ContentsPhotoItem from "@/components/contents-create/ContentsPhotoItem.vue";
import Guideline from "../components/contents-create/Guideline.vue";
import CategoryAndTimeInfo from "../components/contents-create/CategoryAndTimeInfo.vue";

export default {
  name: "ContentsCreate",
  components: {
    draggable,
    YoutubeCreate,
    ContentsYoutubeItem,
    ContentsTextItem,
    ContentsPhotoItem,
    Guideline,
    CategoryAndTimeInfo,
  },
  data: function() {
    return {
      title: "",
      itemList: [],
      youtubeAdded: false,
      uploadPercentage: 0,
    };
  },
  methods: {
    axiosFileSelect: function() {
      var elem = document.getElementById("fileUpload");
      elem.click();
    },

    axiosFileChange: function() {
      this.axiosFileUpload();
    },

    // 파일 업로드 기능 + 업로드 되자마자 item 만들기
    axiosFileUpload: function() {
      //  console.log('axiosFileUpload : ', this.$refs.files.files);

      // this.files = [...this.files, this.$refs.files.files];
      //하나의 배열로 넣기
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        // console.log(i + '번 째 -> ' + this.$refs.files.files[i].name);
        const photoFile = {
          //실제 파일
          file: this.$refs.files.files[i],
          //이미지 프리뷰
          preview: URL.createObjectURL(this.$refs.files.files[i]),
        };
        // num = i;
        this.uploadPercentage = parseInt(
          Math.round((ProgressEvent.loded / ProgressEvent.total) * 100)
        );
        this.createItemPhoto(photoFile);
      }
    },

    // 사진 업로드 시 itemList에 넣기
    createItemPhoto: function(p) {
      console.log(p);
      const newItem = {
        type: "photo",
        youtube: {},
        photo: p,
        video: "",
        description: "",
      };
      if (this.itemList.length <= 9) {
        this.itemList.push(newItem);
      } else {
        alert("항목은 최대 10개 까지 넣을 수 있습니다.");
      }
    },
    // 항목 삭제
    deleteItem: function(index) {
      if (this.itemList[index].type == "youtube") {
        this.youtubeAdded = false;
        this.itemList.splice(index, 1);
      }
      this.itemList.splice(index, 1);
    },
    // 유튜브 추가
    onSelectVideo: function(video) {
      // 새 아이템 생성
      const newItem = {
        type: "youtube",
        youtube: video,
        photo: {},
        video: "",
        description: "",
      };
      if (this.itemList.length <= 9) {
        this.itemList.push(newItem);
        this.youtubeAdded = true;
      } else {
        alert("항목은 최대 10개 까지 넣을 수 있습니다.");
      }
    },
    // 텍스트 추가
    createTextItem: function() {
      const newItem = {
        type: "text",
        youtube: {},
        photo: {},
        video: "",
        description: "",
      };
      if (this.itemList.length <= 9) {
        this.itemList.push(newItem);
      } else {
        alert("항목은 최대 10개 까지 넣을 수 있습니다.");
      }
    },
    // 유튜브나 사진 설명 및 텍스트 내용 바뀌면 적용
    onItemChange: function(itemInfo) {
      this.itemList[itemInfo[1]].description = itemInfo[0];
    },
    cancleCreate: function() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
// 트렐로 배경색 : rgb(235,236,240)
.guide {
  position: fixed;
  top: 70px;
  right: 10px;
}

#input-title {
  margin-top: 0px !important;
}

.div-wrapper {
  .circle {
    width: 30px;

    // line-height와 height를 일치시키면, 텍스트 한줄 중앙 정렬
    height: 30px;
    line-height: 30px;

    background-color: #f4b740;
    border-radius: 25px;
    text-align: center;
    color: white;
    margin-right: 10px;

    padding-right: 0px !important;
  }
  .item-wrapper {
    // border: 1px solid gray;
    z-index: 50;
    width: 95%;
    height: 150px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;

    background-color: rgb(247, 247, 247);
    box-shadow: 0 4px 4px lightgray;

    .left-wrapper {
      width: 10%;
    }

    .middle-wrapper {
      // background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
      height: 100%;

      .text-item-wrapper {
        width: 80%;
        height: 80%;
        // background-color: yellow;
        .text {
          max-height: 100%;
          width: 100%;
          text-align: center;
          overflow: scroll;
          font-size: 12px;
        }
        .text::-webkit-scrollbar {
          display: none;
        }
        textarea {
          width: 100%;
          height: 100%;
          padding: 8px;
          box-shadow: 0 4px 4px lightgray;
          resize: none;
          font-size: 11px;
        }

        textarea::placeholder {
          color: rgb(171, 171, 171);
          font-style: italic;
          font-size: 12pt;
          text-align: center;
        }
      }
      .photo-item-wrapper {
        height: 100%;
        // background-color: red;
        .image-wrapper {
          width: 50%;
          height: 90%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .desc-wrapper {
          width: 40%;
          height: 70%;
          textarea {
            width: 100%;
            height: 100%;
            padding: 8px;
            box-shadow: 0 4px 4px lightgray;
            resize: none;
            font-size: 12px;
          }
          .text {
            text-align: center;
            width: 100%;
            max-height: 100%;
            overflow: scroll;
            font-size: 12px;
          }
          .text::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }

    .right-wrapper {
      width: 10%;
      text-align: center;
      // background-color: yellow;
    }
  }
}
.sortable-chosen {
  opacity: 0.7;
  background-color: #dcdcdc;
}

.sortable-ghost {
  background-color: #dcdcdc;
}

.footer {
  width: 100%;
  position: fixed;
  z-index: 100;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  margin-bottom: 10px;

  display: flex;
  direction: column;
  justify-content: center;

  align-items: center;
  .footer-buttons {
    height: 50px;
    margin: 0 auto;
    width: 200px;
    padding-left: 20px;
    background-color: #ffffff;
    border-radius: 30px;
    border: #a2d646 5px solid;

    // border: 1px solid gray;
    // box-shadow: 0 4px 4px lightgray;

    .row.footerButtons {
      // background-color: red !important;
      width: 30px;
      height: 30px;
      margin-right: 22px !important;
      margin-left: 4px !important;

      .mdi-youtube {
        font-size: 25pt;
        color: #a2d646;
      }
    }

    .footerButtons {
      font-size: 25pt;
      // margin-left: 20px;
      margin-right: 18px;
      color: #a2d646;
    }
  }
  .footer-navi {
    width: 100%;
    margin-top: 20px;
    .left-button {
      height: 50px;
      background-color: #f4b740;
      width: 50%;
      padding-top: 12px;
      text-align: center;
    }
    .right-button {
      background-color: #a2d646;
      padding-top: 12px;
      width: 50%;
      text-align: center;
    }
  }
}
.background-text {
  // background-color: red;
  width: 100% !important;
  margin-left: -10px !important;
  position: fixed;
  bottom: 130px;
  text-align: center;
    width: 80%;
  /* left, right는 해당 요소의 위치 시작점을 결정한다. 그런데, 이때, margin의 양 값을 auto로 줌으로써 마진을 주어 해당 요소의 양 끝 위치를 각각 0으로 만들어준다. */
  margin: 0 auto;
  p{
    font-size: 20pt;
    color: rgb(179, 179, 179);
  }
  
  i.v-icon {
    color: rgb(179, 179, 179);
    font-size: 40pt;
  }
  // z-index: -1;
}
</style>
