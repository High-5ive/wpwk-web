<template>
  <div class="container">
    <div
      class="nori-wrapper"
      v-for="(nori, idx) in NoriList"
      @click="contentsClick"
      :key="idx"
    >
      <nori-content :sendNori="nori"></nori-content>
      <infinite-loading
        v-if="infLoading"
        spinner="spiral"
        @infinite="infiniteHandler"
      ></infinite-loading>
      <br />
    </div>
    <speed-dial></speed-dial>
  </div>
</template>

<script>
import NoriContent from "@/components/main/NoriContent.vue";
import SpeedDial from "@/components/main/SpeedDial.vue";
import InfiniteLoading from "vue-infinite-loading";
import { findAllContents } from "@/api/contents.js";

export default {
  components: {
    NoriContent,
    SpeedDial,
    InfiniteLoading,
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
    };
  },
  created() {
    this.getAllNoriList();
  },
  methods: {
    getAllNoriList() {
      findAllContents(
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
        },
        (error) => {
          console.log(error);
        }
      );
    },
    goCreate: function() {
      this.$router.push({ name: "ContentsCreate" });
    },
    contentsClick: function(event) {
      console.log("contents Click!", event.NoriContent);
    },
  },
};
</script>

<style lang="scss"></style>
