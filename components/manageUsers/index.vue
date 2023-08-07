<template>
  <v-col md="12">
    <v-row>
      <v-col sm="8" cols="12" class="ma-auto">
        <h2 class="mb-4">کنترل کاربران</h2>
        <v-card elevation="6" rounded="lg" class="mb-4 blur">
          <v-data-table
            :headers="headers"
            :items="station"
            hide-default-footer
            style="background: transparent !important"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.avatar="{ item }">
              <v-avatar size="36">
                <v-img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU"
                ></v-img>
              </v-avatar>
            </template>
            <template v-slot:item.tools="{ item }">
              <v-btn @click="editUserMenu = true" icon color="orange"
                ><v-icon small>fad fa-pen-to-square</v-icon></v-btn
              >
              <v-btn icon color="red" @click="removeUser = true"
                ><v-icon small>fad fa-trash-can</v-icon></v-btn
              >
            </template>
            <v-row class="px-4" justify="space-between">
              <v-col cols="12" md="9" class="d-flex justify-start">
                <v-pagination
                  color="error"
                  v-model="page"
                  :length="pageCount"
                ></v-pagination>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  :value="itemsPerPage"
                  label="آیتم در صفحه"
                  type="number"
                  min="1"
                  max="15"
                  @input="itemsPerPage = parseInt($event, 10)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-data-table>
          <v-btn
            color="primary"
            elevation="0"
            class="mr-4 mb-3 rounded-lg"
            @click="addUserMenu = true"
          >
            افزودن کاربر جدید
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <!-- add user menu -->
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="addUserMenu"
      width="600"
    >
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" color="error" dark>
          <h2 class="mb-4">افزودن کاربر جدید</h2>
        </v-toolbar>
        <div class="pa-6 mt-6">
          <v-row>
            <v-col md="6" cols="12" class="py-0 px-2">
              <v-text-field
                outlined
                label="نام و نام خانوادگی"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12" class="py-0 px-2">
              <v-text-field
                outlined
                label="شماره تلفن همراه"
                class="rounded-lg"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col md="6" cols="12" class="py-0 px-2">
              <v-text-field
                outlined
                label="نام کاربری"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12" class="py-0 px-2">
              <v-text-field
                outlined
                label="پست الکترونیک"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6" cols="12" class="py-0 px-2">
              <v-text-field
                outlined
                label="کلمه عبور"
                class="rounded-lg"
                :type="showPass ? 'text' : 'password'"
                :append-icon="showPass ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
                @click:append="showPass = !showPass"
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12" class="py-0 px-2">
              <v-combobox
                v-model="comboSelect"
                :items="comboItems"
                label="سطح دسترسی"
                outlined
                class="rounded-lg"
              ></v-combobox>
            </v-col>
          </v-row>
          <div v-if="comboSelect">
            <h3 class="mb-6 mt-6">تعیین دسترسی به صورت دستی</h3>
            <v-row>
              <v-checkbox
                color="orange"
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                label="ایستگاه ها"
                value="1"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                color="orange"
                v-model="userPermission"
                label="گزارش گیری"
                value="2"
              ></v-checkbox>
              <v-checkbox
                color="orange"
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                label="مدیریت گروه ها"
                value="3"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                color="orange"
                v-model="userPermission"
                label="مدیریت ایستگاه ها"
                value="4"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                color="orange"
                v-model="userPermission"
                label="لاگ ها"
                value="5"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                color="orange"
                label="گزارش نویسی"
                value="6"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                color="orange"
                label="مدیریت کاربران"
                value="7"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                color="orange"
                label="مانیتورینگ"
                value="8"
              ></v-checkbox>
            </v-row>
          </div>
          <v-card-actions class="pa-0">
            <v-spacer />
            <v-btn
              color="error"
              elevation="0"
              @click="addUserMenu = false"
              class="rounded-lg"
              >ثبت</v-btn
            >
            <v-btn
              color="error"
              outlined
              elevation="0"
              @click="addUserMenu = false"
              class="rounded-lg"
              >انصراف</v-btn
            >
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="editUserMenu"
      width="600"
      content-class="rounded-lg"
    >
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" color="error" dark class="mb-4">
          <v-toolbar-title>ویرایش پروفایل <b>محمدی</b></v-toolbar-title>
        </v-toolbar>
        <div class="pa-6">
          <v-row>
            <v-text-field
              outlined
              label="نام و نام خانوادگی"
              class="rounded-lg mx-2"
            ></v-text-field>
            <v-text-field
              outlined
              label="شماره تلفن همراه"
              class="rounded-lg mx-2"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field outlined label="نام کاربری" class="rounded-lg mx-2">
            </v-text-field>
            <v-text-field
              outlined
              label="پست الکترونیک"
              class="rounded-lg mx-2"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              outlined
              label="کلمه عبور"
              class="rounded-lg mx-2"
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
              @click:append="showPass = !showPass"
            ></v-text-field>
            <v-combobox
              v-model="comboSelect"
              :items="comboItems"
              label="سطح دسترسی"
              outlined
              class="rounded-lg mx-2"
            ></v-combobox>
          </v-row>

          <div v-if="comboSelect">
            <h3 class="mb-6 mt-6">تعیین دسترسی به صورت دستی</h3>
            <v-row>
              <v-checkbox
                color="orange"
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                label="ایستگاه ها"
                value="1"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                color="orange"
                v-model="userPermission"
                label="گزارش گیری"
                value="2"
              ></v-checkbox>
              <v-checkbox
                color="orange"
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                label="مدیریت گروه ها"
                value="3"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                color="orange"
                v-model="userPermission"
                label="مدیریت ایستگاه ها"
                value="4"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                color="orange"
                v-model="userPermission"
                label="لاگ ها"
                value="5"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                color="orange"
                label="گزارش نویسی"
                value="6"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                color="orange"
                label="مدیریت کاربران"
                value="7"
              ></v-checkbox>
              <v-checkbox
                class="mx-3 my-1 pa-0"
                v-model="userPermission"
                color="orange"
                label="مانیتورینگ"
                value="8"
              ></v-checkbox>
            </v-row>
          </div>
        </div>
        <v-card-actions>
          <v-btn
            elevation="0"
            @click="editUserMenu = false"
            color="error"
            class="rounded-lg"
            >ثبت</v-btn
          >
          <v-btn
            color="error"
            outlined
            elevation="0"
            @click="editUserMenu = false"
            class="rounded-lg"
            >انصراف</v-btn
          >
          <v-spacer />
          <v-btn
            elevation="0"
            @click="editUserMenu = false"
            outlined
            color="error"
            class="rounded-lg"
            >حذف کاربر</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="removeUser"
      width="500"
    >
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" color="error" dark>
          <v-icon class="ml-4">fad fa-skull-crossbones fa-fade</v-icon>
          <h2>اخطار</h2></v-toolbar
        >
        <h3 class="pa-4">آیا از حذف کاربر <b>محمدی</b> اطمینان دارید؟</h3>
        <v-card-actions>
          <v-spacer />
          <v-btn
            elevation="0"
            @click="removeUser = false"
            color="error"
            class="rounded-lg"
            >بله</v-btn
          >
          <v-btn
            color="error"
            outlined
            elevation="0"
            @click="removeUser = false"
            class="rounded-lg"
            >خیر</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  transition: "fade",
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      addUserMenu: false,
      editUserMenu: false,
      removeUser: false,
      comboSelect: "",
      userPermission: ["1", "3", "6"],
      showPass: false,
      comboItems: [
        { text: "مدیر", value: "0" },
        { text: "سوپر ادمین", value: "1" },
        { text: "ادمین", value: "2" },
        { text: "کاربر معمولی", value: "3" },
      ],
      items: [
        {
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
      ],

      headers: [
        {
          text: "ردیف",
          value: "id",
        },
        {
          text: "آواتار",
          value: "avatar",
          sortable: false,
        },
        { text: "نام کاربر", value: "name" },
        { text: "مقام", value: "rate" },
        { text: "امکانات", value: "tools", sortable: false, align: "center" },
      ],
      station: [
        {
          id: 0,
          name: "محمدی",
          rate: "مدیر کل",
        },
        {
          id: 1,
          name: "محمدی",
          rate: "مدیر کل",
        },
        {
          id: 2,
          name: "محمدی",
          rate: "مدیر کل",
        },
        {
          id: 3,
          name: "محمدی",
          rate: "مدیر کل",
        },
        {
          id: 4,
          name: "محمدی",
          rate: "مدیر کل",
        },
        {
          id: 5,
          name: "محمدی",
          rate: "مدیر کل",
        },
      ],
    };
  },
};
</script>

<style></style>
