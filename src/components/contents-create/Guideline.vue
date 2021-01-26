<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon 
          v-bind="attrs"
          v-on="on"
        >mdi-help-circle-outline</v-icon>  
      </template>

      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-text>
          <!-- 가이드라인 안의 슬라이드 -->
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
            >
              <v-sheet
                :color="colors[i]"
                height="100%"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3">
                    {{ slide }} Slide
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'Guideline',
  data: function () {
    return {
      dialog: false,
      //임시 슬라이드 위한 데이터(나중에 지울것)
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  }
}
</script>
<style>
  
</style>