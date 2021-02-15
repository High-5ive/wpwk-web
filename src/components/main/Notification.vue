<template>
   <div class="notification-container">
       <div class="notification-wrapper">
           <div class="notification" :class="{'for-stripe':!isEven(idx)}" v-for="(notification, idx) in notifications" :key="idx"> {{ notification.message }} </div>
       </div>
   </div>
</template>

<script>
import { getNotification } from '@/api/user.js'

export default {
   name: 'Notification',
   data: function () {
      return {
          notifications: []
      }
   },
   methods: {
       isEven: function (idx) {
        if (idx % 2) {
            return false
        } else {
            return true
        }
      },
      getNotifications() {
          getNotification(
              (res) => {
                  this.notifications = res.data
              },
              (err) => {
                  console.log(err)
              }
          )
      }
   },
   created: function() {
       this.getNotifications()
   }
};
</script>

<style lang="scss">
@import 'src/css/notification.scss';
</style>