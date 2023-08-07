<template>
  <v-col cols="12">
    <v-col md="10" class="ma-auto">
      <h2 class="mb-4">لاگ ها و تاریخچه ها</h2>
      <v-card elevation="6" rounded="lg" class="mb-4 blur">
        <v-data-table
          :headers="headers"
          :items="station"
          :items-per-page="itemsPerPage"
          hide-default-footer
          :page.sync="page"
          style="background: transparent !important"
          @page-count="pageCount = $event"
        >
          <!-- <template v-slot:item.tools="{ item }">
          <v-btn icon color="primary"><v-icon>mdi mdi-eye</v-icon></v-btn>
          <v-btn icon color="orange"><v-icon>mdi mdi-pencil</v-icon></v-btn>
          <v-btn icon color="red"><v-icon>mdi mdi-delete</v-icon></v-btn>
        </template> -->
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
    </v-col>
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
      headers: [
        {
          text: "ردیف",
          value: "id",
        },
        { text: "کاربر", value: "user" },
        { text: "زمان و تاریخ", value: "time" },
        { text: "نوع لاگ", value: "log" },
        { text: "مکان", value: "place" },
        { text: "توضیحات", value: "details" },
      ],
      station: [
        {
          id: 1,
          user: " سرور",
          time: "1400/11/11 20:08:23",
          log: "قطع اتصال دستگاه",
          place: "SERVER/DEVM",
          details: "Disconnected from server 0",
        },

        {
          id: 2,
          user: " سرور",
          time: "1400/11/11 20:08:23",
          log: "قطع اتصال دستگاه",
          place: "SERVER/DEVM",
          details: "Disconnected from server 0",
        },

        {
          id: 3,
          user: " سرور",
          time: "1400/11/11 20:08:23",
          log: "قطع اتصال دستگاه",
          place: "SERVER/DEVM",
          details: "Disconnected from server 0",
        },
        {
          id: 4,
          user: " سرور",
          time: "1400/11/11 20:08:23",
          log: "قطع اتصال دستگاه",
          place: "SERVER/DEVM",
          details: "Disconnected from server 0",
        },

        {
          id: 5,
          user: " سرور",
          time: "1400/11/11 20:08:23",
          log: "قطع اتصال دستگاه",
          place: "SERVER/DEVM",
          details: "Disconnected from server 0",
        },

        {
          id: 6,
          user: " سرور",
          time: "1400/11/11 20:08:23",
          log: "قطع اتصال دستگاه",
          place: "SERVER/DEVM",
          details: "Disconnected from server 0",
        },
      ],
    };
  },
};
</script>

<style></style>
