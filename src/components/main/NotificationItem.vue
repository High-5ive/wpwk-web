<template>
  <div class="icon-message">
      <!-- <v-icon> {{ icon }} </v-icon> -->
      <v-icon v-if="type =='ADMIN_MESSAGE'" class='icon1'> mdi-comment-text-outline </v-icon>
      <v-icon v-else-if="type =='DELETE'" class='icon2'> mdi-delete-alert </v-icon>
      <v-icon v-else-if="type =='WARN'" class='icon3'> mdi-alert </v-icon>
      <v-icon v-else-if="type =='LIKE'" class='icon4'> mdi-account-heart </v-icon>
      <v-icon v-else-if="type =='COMMENT'" class='icon5'> mdi-comment-edit </v-icon>
      <v-icon v-else class='icon6'> mdi-account-arrow-left </v-icon>
      <span @click='goMypage'> {{ message }} </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'NotificationItem',
    data: function () {
        return {
            type: '',
            message: '',
            // icon: '',
        }
    },
    methods: {
        getNotification: function () {
            this.type = this.notification.messageType
            this.message = this.notification.message
        },
        goMypage: function () {
            this.$router.push({ name: 'mypage', params: { userId: this.userInfo.userId }})
        }
        // getIcon: function() {
        //     switch(this.type) {
        //         case 'ADMIN_MESSAGE':
        //             this.icon = 'mdi-comment-text-outline'
        //             break;
        //         case 'DELETE' :
        //             this.icon = 'mdi-delete-alert'
        //             break;
        //         case 'WARN' :
        //             this.icon = 'mdi-alert'
        //             break;
        //         case 'LIKE' :
        //             this.icon ='mdi-account-heart'
        //             break;
        //         case 'COMMENT' :
        //             this.icon = 'mdi-comment-edit'
        //             break;
        //         case 'FOLLOW' :
        //             this.icon = 'mdi-account-arrow-left'
        //             break;
        //     }
        // }
    },
    props: {
        notification: Object,
    },
    created: function() {
        this.getNotification()
        // this.getIcon()
    },
    computed: {
      ...mapState(['userInfo']),
   },
}
</script>

<style>

</style>