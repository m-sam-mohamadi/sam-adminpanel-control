<template>
  <v-col cols="12" lg="8" sm="8" class="ma-auto">
    <h2 class="mb-4">ویرایش گروه منطقه برق میهن</h2>
    <v-card elevation="6" rounded="lg" class="mb-4 blur">
      <!-- <v-card elevation="6" rounded="lg"> -->
      <v-data-table
        :headers="addGroupHeader"
        :items="addGroup"
        hide-default-footer
        :page.sync="page"
        style="background: transparent !important"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
        class="elevation-0"
      >
        <template v-slot:item.tools="{ item }">
          <!-- <v-btn @click="deleteMenu = true" icon color="primary"
            ><v-icon>mdi mdi-eye</v-icon></v-btn
          > -->
          <v-btn @click="deleteMenu = true" icon color="red"
            ><v-icon small>fad fa-trash-can</v-icon></v-btn
          >
        </template>
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
      <!-- </v-card> -->
      <v-card-actions class="px-4">
        <v-text-field class="pl-4" label="نام گروه" value=" منطقه برق میهن">
        </v-text-field>
        <v-btn color="error" elevation="0" class="rounded-lg">ذخیره</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="deleteMenu"
      width="600"
    >
      <v-card>
        <v-toolbar elevation="0" color="error" dark>
          <v-icon class="ml-4">fad fa-skull-crossbones fa-fade</v-icon>
          <h2>اخطار</h2></v-toolbar
        >
        <h3 class="pa-6">آیا از حذف این ایستگاه اطمینان دارید؟</h3>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            class="rounded-lg"
            elevation="0"
            @click="deleteMenu = false"
            >بله</v-btn
          >
          <v-btn
            color="error"
            outlined
            class="rounded-lg"
            elevation="0"
            @click="deleteMenu = false"
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
      deleteMenu: false,
      addGroupHeader: [
        {
          text: "ردیف",
          value: "id",
        },
        { text: "نام دستگاه ها", value: "name" },
        { text: "امکانات", value: "tools", sortable: false },
      ],
      addGroup: [
        {
          id: "0",
          name: "ایستگاه شهید بهشتی",
          tools: "",
        },
        {
          id: "1",
          name: "ایستگاه شهید بهشتی",
          tools: "",
        },
        {
          id: "2",
          name: "ایستگاه شهید بهشتی",
          tools: "",
        },
        {
          id: "3",
          name: "ایستگاه شهید بهشتی",
          tools: "",
        },
        {
          id: "4",
          name: "ایستگاه شهید بهشتی",
          tools: "",
        },
        {
          id: "5",
          name: "ایستگاه شهید بهشتی",
          tools: "",
        },
        {
          id: "6",
          name: "ایستگاه شهید بهشتی",
          tools: "",
        },
        {
          id: "7",
          name: "ایستگاه شهید بهشتی",
          tools: "",
        },
      ],
    };
  },
};
</script>

<style></style>
