<template>
   <div class="container">
     {{ this.NoriList }}
    <div v-if="loading">
      <loading></loading>
    </div>
    <div v-if="!loading">
      <!-- <div class="nori-wrapper" v-for="(nori, idx) in NoriList" :key="idx">
        <nori-content :sendNori="nori" v-on:tagEvent="getNoriListByTag">
        </nori-content>
        <br />
      </div> -->
      <div class="nori-wrapper">
          <NoriContent v-for="(nori, idx) in NoriList" :key="idx" :sendNori="nori"/>
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
import { findContentsByTag, findContentsByKeyword } from "@/api/contents.js";
import infiniteLoading from "vue-infinite-loading";

export default {
   name: 'SearchResult',
   data: function () {
       return {
           noriList: [],
           abilities: ["언어지능", "논리수학지능", "음악지능", "신체운동지능", "공간지능", "자연지능", "대인지능", "개인내지능"],
           infLoading: false,
           page: 1,
           loading: true,
           tagSearch: "",
        }
   },
   components: {
      NoriContent,
      SpeedDial,
      infiniteLoading,
      Loading,
   },
   methods: {
       getAbility: function() {
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
       },
       success: function() {
           (res) => {
            this.NoriList = res.data;
            this.getAbility()
            this.page += 1;
            this.loading = false;
            }
       },
       error: function() {
           (error) => {
            console.log(error);
            }
       },
    //   태그 검색 noriList 요청
      getNoriListByTag() {
        this.page = 1;
        console.log("태그 검색");
        findContentsByTag(
            this.$route.params.searchValue,
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
            this.error()
        );
      },
      getNoriListByKeyword() {
        this.page = 1;
        console.log("키워드 검색");
        findContentsByKeyword(
            this.$route.params.searchValue,
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
            this.error()
        );
      },
      // 무한 스크롤 (다음 페이지에 있는 요청결과 가져와서 원래 video list 와 합치기)
    infiniteHandler($state) {
        if(this.$route.params.type === "tag") {
          findContentsByTag(
          this.$route.params.searchValue,
          this.page,
          (res) => {
            setTimeout(() => {
              if (res.data.length) {
                var noriList = res.data;
                this.getAbility()
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
        this.error()
        );
        }
        else {
          findContentsByKeyword(
          this.$route.params.searchValue,
          this.page,
          (res) => {
            setTimeout(() => {
              if (res.data.length) {
                var noriList = res.data;
                this.getAbility()
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
        this.error()
        );
        }
      }
   },
   created: function() {
    if(this.$route.params.type === "tag") {
      this.getNoriListByTag()
    }
    else {
      this.getNoriListByKeyword()
    }
   }
};
</script>

<style></style>
