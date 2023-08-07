<template>
  <v-col md="12" class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0" md="8" cols="12">
        <h2 class="mb-4">ارسال پیام</h2>
        <section dir="ltr" class="msger">
          <header class="msger-header">
            <div class="msger-header-title">
              <i class="fas fa-comment-alt"></i> بخش تیکت
            </div>
            <div class="msger-header-options">
              <span><i class="fas fa-cog"></i></span>
            </div>
          </header>

          <main class="msger-chat">
            <div
              v-for="data in messages"
              :key="data.length"
              :class="`msg ${data.sender ? 'right' : 'left'}-msg`"
            >
              <v-avatar size="38" class="mx-2">
                <v-img :src="data.avatar"></v-img
              ></v-avatar>
              <div class="msg-bubble">
                <div class="msg-info">
                  <div class="msg-info-name">{{ data.name }}</div>
                  <div class="msg-info-time">{{ data.time }}</div>
                </div>

                <div class="msg-text">
                  {{ data.text }}
                </div>
              </div>
            </div>
          </main>

          <form dir="rtl" class="msger-inputarea">
            <v-text-field
              class="elevation-0"
              placeholder="پیغام"
              prepend-icon="fad fa-paper-plane-top"
              v-model="message"
              @click:prepend="sendMessage()"
            ></v-text-field>
          </form>
        </section>
      </v-col>
      <v-col class="ma-0 px-md-4 px-0 mt-8 mt-md-0 py-0" md="4" cols="12">
        <h2 class="mb-4">لیست پیام ها</h2>
        <v-list
          style="height: calc(80vh - 50px); overflow-y: auto"
          rounded
          class="px-2 rounded-lg py-4"
          elevation="6"
          width="100%"
        >
          <v-list-item
            v-for="(user, index) in messages"
            :key="index"
            :class="{ active: user.active }"
            @click="setActiveUser(2)"
          >
            <v-list-item-avatar>
              <v-img :src="user.avatar" class="rounded-lg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          sender: false,
          text: "سلام این یک متن تست برای بیننده است",
          time: "12:45",
          name: "ربات",
          active: true,
          avatar:
            "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png",
        },
        {
          sender: true,
          text: "این یک تست از ظرف فرستنده است",
          time: "12:46",
          name: "محمدی",
          active: true,
          avatar: "http://amintl.com.pk/wp-content/uploads/2019/11/avatar3.png",
        },
        {
          sender: false,
          text: "سلام این یک متن تست برای بیننده است",
          time: "12:45",
          active: true,
          name: "ربات",
          avatar:
            "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png",
        },
        {
          sender: true,
          text: "این یک تست از ظرف فرستنده است",
          time: "12:46",
          active: true,
          name: "محمدی",
          avatar: "http://amintl.com.pk/wp-content/uploads/2019/11/avatar3.png",
        },
        {
          sender: false,
          text: "سلام این یک متن تست برای بیننده است",
          time: "12:45",
          name: "ربات",
          active: true,
          avatar:
            "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png",
        },
        {
          sender: true,
          text: "این یک تست از ظرف فرستنده است",
          time: "12:46",
          active: true,
          name: "محمدی",
          avatar: "http://amintl.com.pk/wp-content/uploads/2019/11/avatar3.png",
        },
        {
          sender: false,
          text: "سلام این یک متن تست برای بیننده است",
          time: "12:45",
          active: true,
          name: "ربات",
          avatar:
            "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png",
        },
        {
          sender: true,
          text: "این یک تست از ظرف فرستنده است",
          time: "12:46",
          name: "محمدی",
          active: true,
          avatar: "http://amintl.com.pk/wp-content/uploads/2019/11/avatar3.png",
        },
      ],
      message: "",
    };
  },
  methods: {
    sendMessage() {},
    setActiveUser(i) {
      this.messages.forEach((user) => {
        user.active = false;
      });
      this.messages[i].active = true;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/components/chat";
</style>
