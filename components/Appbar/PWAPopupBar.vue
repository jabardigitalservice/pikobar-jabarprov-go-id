<template>
  <div v-show="showPopupNotification" class="bg-brand-yellow-darkest">
    <div class="container mx-auto ">
      <div class="flex flex-wrap px-6 py-4">
        <div class="text-sm w-full">
          Izinkan notifikasi mengirim pesan
          <button class="button-allow-notif" type="button" @click="allowNotification">
            Allow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, messaging, FieldValue } from '~/lib/firebase'
export default {
  data () {
    return {
      showPopupNotification: false
    }
  },
  mounted () {
    this.checkPermission()
  },
  methods: {
    async checkPermission () {
      if (!messaging) {
        return
      }

      const permission = Notification.permission

      if (permission === 'default') {
        console.log('notification permission default')
        this.showPopupNotification = true
      }

      if (permission === 'granted') {
        const token = await messaging.getToken()
        console.log('notification permission granted')
        this.saveToken(token)
      }
      if (permission === 'denied') {
        console.log('notification permission denied')
      }
    },
    allowNotification () {
      if (!messaging) {
        return
      }
      Notification.requestPermission(async (permission) => {
        console.log({ allowedPermission: permission })
        if (permission === 'granted') {
          const token = await messaging.getToken()
          this.saveToken(token)
        }
        messaging.onTokenRefresh(async () => {
          const token = await messaging.getToken()

          this.saveToken(token)
        })
        this.showPopupNotification = false
      })
    },
    async saveToken (token) {
      const tokenRef = await db.collection('tokens').doc(token)
      const record = await tokenRef.get()

      if (record.exists === false) {
        tokenRef.set({
          token,
          createdAt: FieldValue.serverTimestamp()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button-allow-notif {
  @apply ml-2 bg-brand-blue text-white font-bold py-1 px-4 rounded;

  &:focus {
    @apply outline-none shadow-outline;
  }
}
</style>
