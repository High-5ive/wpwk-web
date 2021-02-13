<template>
  <div class="container">
    <div v-if="loading">
      <loading></loading>
    </div>
    <div v-if="!loading">
      <div class="nori-wrapper" v-for="(nori, idx) in NoriList" :key="idx">
        <!-- <nori-content :sendNori="nori" v-on:tagEvent="getNoriListByTag"> -->
        <nori-content :sendNori="nori">
        </nori-content>
        <br />
      </div>
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteHandler"
      ></infinite-loading>
    </div>
    <speed-dial></speed-dial>
  </div>
</template>

<script>
import NoriContent from "@/components/main/NoriContent.vue";
import SpeedDial from "@/components/main/SpeedDial.vue";
import Loading from "@/components/main/Loading.vue";
import { findContentsByPage, findContentsByTag } from "@/api/contents.js";
import infiniteLoading from "vue-infinite-loading";

export default {
  components: {
    NoriContent,
    SpeedDial,
    infiniteLoading,
    Loading,
  },
  data() {
    return {
      NoriList: [],
      abilities: [
        "언어지능",
        "논리수학지능",
        "음악지능",
        "신체운동지능",
        "공간지능",
        "자연지능",
        "대인지능",
        "개인내지능",
      ],
      infLoading: false,
      page: 1,
      loading: true,
      tagSearch: "",
    };
  },
  created() {
    console.log("hi")
    if (this.$route.query.tag != null) {
      this.getNoriListByTag();
    } else {
      this.getNoriList();
    }
  },
  methods: {
    getNoriList() {
      console.log("일반 검색");
      findContentsByPage(
        this.page,
        (res) => {
          this.NoriList = res.data;
          for (var i = 0; i < this.NoriList.length; i++) {
            if (this.NoriList[i].ability != null) {
              let abilityList = [];
              for (var j = 0; j < this.NoriList[i].ability.length; j++) {
                if (this.NoriList[i].ability.charAt(j) == "1") {
                  abilityList.push(this.abilities[j]);
                }
              }

              // 각 컨텐츠마다 지능
              this.NoriList[i].abilities = abilityList;
            }
          }
          this.page += 1;
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getNoriListByTag() {
      this.page = 1;
      console.log("태그 검색");
      findContentsByTag(
        this.$route.query.tag,
        this.page,
        (res) => {
          this.NoriList = res.data;
          for (var i = 0; i < this.NoriList.length; i++) {
            if (this.NoriList[i].ability != null) {
              let abilityList = [];
              for (var j = 0; j < this.NoriList[i].ability.length; j++) {
                if (this.NoriList[i].ability.charAt(j) == "1") {
                  abilityList.push(this.abilities[j]);
                }
              }

              // 각 컨텐츠마다 지능
              this.NoriList[i].abilities = abilityList;
            }
          }
          this.page += 1;
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    // 무한 스크롤 (다음 페이지에 있는 요청결과 가져와서 원래 video list 와 합치기)
    infiniteHandler($state) {
      if (this.$route.query.tag == undefined) {
        // 쿼리 검색이 아닌 경우
        findContentsByPage(
          this.page,
          (res) => {
            setTimeout(() => {
              if (res.data.length) {
                var noriList = res.data;

                for (var i = 0; i < noriList.length; i++) {
                  if (noriList[i].ability != null) {
                    let abilityList = [];
                    for (var j = 0; j < noriList[i].ability.length; j++) {
                      if (noriList[i].ability.charAt(j) == "1") {
                        abilityList.push(this.abilities[j]);
                      }
                    }

                    // 각 컨텐츠마다 지능
                    noriList[i].abilities = abilityList;
                  }
                }

                this.NoriList = this.NoriList.concat(noriList);
                $state.loaded();
                this.page += 1;
                if (this.NoriList.length / 10 == 0) {
                  $state.complete();
                }
              } else {
                $state.complete();
              }
            }, 1000);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        findContentsByTag(
          this.$route.query.tag,
          this.page,
          (res) => {
            setTimeout(() => {
              if (res.data.length) {
                var noriList = res.data;

                for (var i = 0; i < noriList.length; i++) {
                  if (noriList[i].ability != null) {
                    let abilityList = [];
                    for (var j = 0; j < noriList[i].ability.length; j++) {
                      if (noriList[i].ability.charAt(j) == "1") {
                        abilityList.push(this.abilities[j]);
                      }
                    }

                    // 각 컨텐츠마다 지능
                    noriList[i].abilities = abilityList;
                  }
                }

                this.NoriList = this.NoriList.concat(noriList);
                $state.loaded();
                this.page += 1;
                if (this.NoriList.length / 10 == 0) {
                  $state.complete();
                }
              } else {
                $state.complete();
              }
            }, 1000);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    goCreate: function() {
      this.$router.push({ name: "ContentsCreate" });
    },
  },
};
</script>

<style lang="scss"></style>
