<template>
  <v-col lg="10" sm="8" class="ma-auto">
    <h2>بخش کنترل دسترسی</h2>
    <v-card rounded="lg" elevation="6" class="pa-6 mt-8 blur">
      <h3 class="mb-4">کنترل دسترسی مدیر</h3>
      <v-row>
        <v-checkbox
          class="mx-3"
          v-model="manager"
          label="ایستگاه ها"
          value="1"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="manager"
          label="گزارش گیری"
          value="2"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="manager"
          label="مدیریت گروه ها"
          value="3"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="manager"
          label="مدیریت ایستگاه ها"
          value="4"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="manager"
          label="لاگ ها"
          value="5"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="manager"
          label="گزارش نویسی"
          value="6"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="manager"
          label="مدیریت کاربران"
          value="7"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="manager"
          label="مانیتورینگ"
          value="8"
        ></v-checkbox>
      </v-row>
    </v-card>
    <v-card rounded="lg" elevation="6" class="pa-6 mt-6 blur">
      <h3 class="mb-4">کنترل دسترسی کاربر</h3>
      <v-row>
        <v-checkbox
          color="orange"
          class="mx-3"
          v-model="user"
          label="ایستگاه ها"
          value="1"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          color="orange"
          v-model="user"
          label="گزارش گیری"
          value="2"
        ></v-checkbox>
        <v-checkbox
          color="orange"
          class="mx-3"
          v-model="user"
          label="مدیریت گروه ها"
          value="3"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          color="orange"
          v-model="user"
          label="مدیریت ایستگاه ها"
          value="4"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          color="orange"
          v-model="user"
          label="لاگ ها"
          value="5"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="user"
          color="orange"
          label="گزارش نویسی"
          value="6"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="user"
          color="orange"
          label="مدیریت کاربران"
          value="7"
        ></v-checkbox>
        <v-checkbox
          class="mx-3"
          v-model="user"
          color="orange"
          label="مانیتورینگ"
          value="8"
        ></v-checkbox>
      </v-row>
    </v-card>
    <h2 class="mt-8">تعیین دسترسی هر کاربر</h2>
    <v-card elevation="6" rounded="lg" class="mt-4 blur">
      <v-data-table
        :headers="editUserAccessHead"
        :items="editUserAccess"
        hide-default-footer
        :page.sync="page"
        style="background: transparent !important"
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
          <v-btn @click="editUserDialog = true" icon color="orange"
            ><v-icon small>fad fa-pen-to-square</v-icon></v-btn
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
    </v-card>
    <v-dialog class="rounded-lg" v-model="editUserDialog" width="600">
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" dark color="error">
          <v-toolbar-title>ویرایش دسترسی کاربر محمدی</v-toolbar-title>
          <v-spacer />
          <v-btn @click="editUserDialog = false" icon
            ><v-icon>fad fa-xmark</v-icon></v-btn
          >
        </v-toolbar>
        <div class="pa-6">
          <v-row>
            <v-checkbox
              color="orange"
              class="mx-3"
              v-model="user"
              label="ایستگاه ها"
              value="1"
            ></v-checkbox>
            <v-checkbox
              class="mx-3"
              color="orange"
              v-model="user"
              label="گزارش گیری"
              value="2"
            ></v-checkbox>
            <v-checkbox
              color="orange"
              class="mx-3"
              v-model="user"
              label="مدیریت گروه ها"
              value="3"
            ></v-checkbox>
            <v-checkbox
              class="mx-3"
              color="orange"
              v-model="user"
              label="مدیریت ایستگاه ها"
              value="4"
            ></v-checkbox>
            <v-checkbox
              class="mx-3"
              color="orange"
              v-model="user"
              label="لاگ ها"
              value="5"
            ></v-checkbox>
            <v-checkbox
              class="mx-3"
              v-model="user"
              color="orange"
              label="گزارش نویسی"
              value="6"
            ></v-checkbox>
            <v-checkbox
              class="mx-3"
              v-model="user"
              color="orange"
              label="مدیریت کاربران"
              value="7"
            ></v-checkbox>
            <v-checkbox
              class="mx-3"
              v-model="user"
              color="orange"
              label="مانیتورینگ"
              value="8"
            ></v-checkbox>
          </v-row>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            class="rounded-lg"
            elevation="0"
            @click="editUserDialog = false"
            >ذخیره</v-btn
          >
          <v-btn
            color="error"
            class="rounded-lg"
            outlined
            @click="editUserDialog = false"
            >لغو</v-btn
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
      manager: ["1", "2", "4", "6", "7", "8"],
      user: ["1", "3", "6"],
      editUserDialog: false,
      editUserAccessHead: [
        {
          text: "ردیف",
          value: "id",
        },
        {
          text: "آواتار",
          value: "avatar",
          sortable: false,
        },
        { text: "نام کاربر", value: "title" },
        { text: "مقام", value: "status" },
        { text: "امکانات", value: "tools", sortable: false, align: "center" },
      ],
      editUserAccess: [
        {
          id: 1,
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          id: 2,
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          id: 3,
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          id: 4,
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          id: 5,
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          id: 6,
          title: "محمدی",
          status: "مدیرکل",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
      ],
    };
  },
};
</script>

<style></style>
