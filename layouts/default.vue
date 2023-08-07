<template>
  <v-app>
    <!-- === start drawer === -->
    <v-navigation-drawer
      class="blur"
      v-model="drawerModel"
      :mini-variant="mini"
      right
      app
    >
      <template v-slot:prepend>
        <v-list nav>
          <v-list-item v-if="!mini" class="px-2">
            <v-list-item-avatar color="#f2f2f2" size="64">
              <v-img :src="drawer.user.avatar"></v-img>
            </v-list-item-avatar>
            <v-btn @click="mini = !mini" class="mr-auto" icon
              ><v-icon>mdi mdi-chevron-left</v-icon></v-btn
            >
          </v-list-item>
          <v-list-item v-else>
            <v-btn @click="mini = !mini" class="mr-n1" icon
              ><v-icon>mdi mdi-chevron-right</v-icon></v-btn
            >
          </v-list-item>

          <v-list-item
            v-if="!mini"
            to="/profile"
            color="primary"
            link
            class="mb-4"
          >
            <v-list-item-content>
              <v-list-item-title
                style="line-height: 30px !important"
                class="text-h6"
              >
                {{ drawer.user.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                drawer.user.status
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <v-list nav dense>
        <v-list-item
          exact
          :to="{
            path: `${data.url}`,
          }"
          v-for="(data, index) in menuItems"
          :key="index"
          color="primary"
        >
          <v-list-item-icon>
            <v-icon :color="data.color">fa-duotone {{ data.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ data.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2" v-if="!mini">
          <v-btn
            href="https://vuetifyjs.com/en/getting-started/installation/"
            target="_blank"
            block
            text
            color="primary"
            class="pa-2 rounded-lg"
            >Vuetify Docs</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
    <!-- == end drawer == -->

    <!-- === start main body === -->
    <v-main>
      <!-- color="#2b375e" -->
      <!-- === start navbar === -->
      <v-toolbar elevation="0" class="mb-4 blur" permanent>
        <v-btn icon @click="drawerModel = !drawerModel"
          ><v-icon> fas fa-bars </v-icon></v-btn
        >
        <v-toolbar-title>پنل مدیریت</v-toolbar-title>
        <v-spacer />
        <v-btn
          color="blue"
          class="d-none d-md-block"
          to="/profile"
          text
          rounded
        >
          <v-avatar class="ml-3 mt-1" size="30" color="#f2f2f2"
            ><v-img :src="drawer.user.avatar"></v-img
          ></v-avatar>
          {{ drawer.user.name }}</v-btn
        >
        <v-btn
          icon
          @click="
            themeSwitch = !themeSwitch;
            changeTheme();
          "
          ><v-icon v-if="themeSwitch == true">mdi mdi-weather-sunny</v-icon>
          <v-icon v-else>mdi mdi-weather-night</v-icon></v-btn
        >
        <v-btn icon @click="logout = true"
          ><v-icon> fa-duotone fa-power-off </v-icon></v-btn
        >
      </v-toolbar>
      <!-- == end navbar == -->
      <!-- === start all view of site === -->
      <Nuxt />
      <!-- == end all view of site == -->
    </v-main>
    <!-- == end main body == -->
    <!-- ===start menus box ===-->
    <!-- <v-menu v-model="menu">
      <v-list>
        <v-list-item>
          
          <v-switch
            v-model="themeSwitch"
            inset
          ></v-switch>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <!-- ==end menus box== -->
    <div class="dateAndTime">{{ persianDate }}</div>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="logout"
      width="500"
    >
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" color="error" dark>
          <v-icon class="ml-4">fad fa-skull-crossbones fa-fade</v-icon>
          <h2>اخطار</h2></v-toolbar
        >
        <v-card-text>
          <h2 class="pa-md-12 pa-4">آیا میخواهید از حساب خود خارج شوید؟</h2>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="error"
            class="rounded-lg"
            @click="logout = false"
            elevation="0"
            >بله</v-btn
          >
          <v-btn
            color="error"
            class="rounded-lg"
            outlined
            @click="logout = false"
            elevation="0"
            >خیر</v-btn
          >
        </v-card-actions>
      </v-card></v-dialog
    >
  </v-app>
</template>

<script>
import { color } from "../assets/utils/colors.js";
export default {
  name: "App",
  transition: "fade",
  data: () => ({
    color: color,
    menu: false,
    mini: false,
    themeSwitch: false,
    themeIcon: "",
    drawerModel: true,
    persianDate: "",
    nowDate: new Date().getFullYear(),
    logout: false,
    drawer: {
      model: null,
      mini: false,
      user: {
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        name: "محمدی",
        status: "مدیر کل سایت",
      },
    },
    menuItems: [
      {
        title: "ایستگاه ها",
        icon: "fa-charging-station ",
        url: "/",
        color: "success accent-4",
      },
      {
        title: "مانیتورینگ",
        icon: "fa-chart-mixed",
        url: "/monitoring",
        color: "primary",
      },
      {
        title: "گزارشگیری",
        icon: "fa-file-chart-column",
        url: "/report/range",
        color: "orange",
      },
      {
        title: "لاگ ها",
        icon: " fa-file-lines",
        url: "/report/logs",
        color: "error",
      },
      // {
      //   title: "تیکت پشتیبانی",
      //   icon: "mdi-ticket-account",
      //   url: "/ticket",
      //   color: "red",
      // },
      {
        title: "گزارش نویسی",
        icon: "fa-feather",
        url: "/report/write",
        color: "purple",
      },
      {
        title: "مدیریت ایستگاه ها",
        icon: "fa-house-signal",
        url: "/manageStations",
        color: "blue",
      },
      {
        title: "مدیریت کاربران",
        icon: "fa-users",
        url: "/manageUsers",
        color: "red accent-2",
      },
      {
        title: "مدیریت گروه ها",
        icon: "fa-layer-group",
        url: "/manageGroups",
        color: "purple accent-2",
      },
      {
        title: "مدیریت دسترسی",
        icon: "fa-universal-access",
        url: "/manageAccess",
        color: "indigo accent-2",
      },
      {
        title: "پروفایل",
        icon: "fa-user",
        url: "/profile",
        color: "teal",
      },
    ],
    group: null,
  }),
  methods: {
    changeTheme() {
      if (process.client) {
        if (this.themeSwitch) {
          localStorage.setItem("theme", "true");
        } else {
          localStorage.setItem("theme", "false");
        }
        if (localStorage.getItem("theme") == "false") {
          this.$vuetify.theme.dark = false;
          this.themeIcon = "fa-duotone fa-sun";
        } else {
          this.$vuetify.theme.dark = true;
          this.themeIcon = "fa-duotone fa-moon";
        }
      }
    },
    mainDate() {
      var date = new Date();

      let hour = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
      let res =
        hour.toLocaleString("fa-IR") +
        ":" +
        min.toLocaleString("fa-IR") +
        ":" +
        sec.toLocaleString("fa-IR");
      this.persianDate = res + " - " + new Date().toLocaleDateString("fa-IR");
    },
  },
  mounted() {
    if (localStorage.getItem("theme") == "false") {
      this.$vuetify.theme.dark = false;
      this.themeSwitch = false;
      this.themeIcon = "fa-duotone fa-sun";
    } else {
      this.$vuetify.theme.dark = true;
      this.themeIcon = "fa-duotone fa-moon";
      this.themeSwitch = true;
    }
  },
  created() {
    setInterval(() => {
      this.mainDate();
    }, 1000);
  },
};
</script>

<style lang="css">
/* @import url("~@/assets/styles/fs/css/duotone.css"); ; */
</style>
