<template>
  <v-col cols="12">
    <v-row>
      <v-col md="6">
        <h2 class="mb-4">لیست گروه ها</h2>
        <v-card elevation="6" rounded="lg" class="mb-4 blur">
          <v-data-table
            :headers="groupHeader"
            :items="group"
            hide-default-footer
            :page.sync="page"
            :items-per-page="itemsPerPage"
            style="background: transparent !important"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.tools="{ item }">
              <v-btn to="/manageGroups/edit" icon color="orange"
                ><v-icon>fad fa-pen-to-square</v-icon></v-btn
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
        </v-card>
      </v-col>
      <v-col md="6">
        <h2 class="mb-4">ایستگاه های گروه بندی نشده</h2>

        <v-card elevation="6" rounded="lg" class="mb-4 blur">
          <v-data-table
            v-model="selectedGroup"
            :headers="addGroupHeader"
            :items="addGroup"
            show-select
            hide-default-footer
            :page.sync="page"
            style="background: transparent !important"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
          >
            <!-- TODO: set show station in here -->
            <!-- <template v-slot:item.tools="{ item }">
              <v-btn icon color="primary"><v-icon>fad fa-eye</v-icon></v-btn>
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
        <v-btn
          @click="groupName = true"
          color="primary"
          class="mt-4 rounded-lg"
          elevation="0"
          :disabled="selectedGroup.length == 0"
          >افزودن گروه</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="groupName"
      width="600"
    >
      <v-card class="pa-4 blur" rounded="lg">
        <v-card-title> نام گروه را وارد کنید</v-card-title>
        <v-text-field
          class="rounded-lg"
          outlined
          label="نام گروه"
        ></v-text-field>
        <v-card-actions class="pa-0">
          <v-spacer />
          <v-btn
            color="error"
            elevation="0"
            class="mt-4 rounded-lg"
            @click="groupName = false"
            >ایجاد</v-btn
          >
          <v-btn
            color="error"
            outlined
            elevation="0"
            class="mt-4 rounded-lg"
            @click="groupName = false"
            >انصراف</v-btn
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
      groupName: null,
      groupHeader: [
        {
          text: "ردیف",
          value: "id",
        },
        { text: "نام گروه", value: "name" },
        { text: "تعداد ایستگاه", value: "count" },
        { text: "امکانات", value: "tools", sortable: false },
      ],
      group: [
        {
          id: "0",
          name: "گروه شهید بهشتی",
          count: "14",
          tools: "",
        },
        {
          id: "1",
          name: "گروه شهید بهشتی",
          count: "14",
          tools: "",
        },
        {
          id: "2",
          name: "گروه شهید بهشتی",
          count: "14",
          tools: "",
        },
        {
          id: "3",
          name: "گروه شهید بهشتی",
          count: "14",
          tools: "",
        },
        {
          id: "4",
          name: "گروه شهید بهشتی",
          count: "14",
          tools: "",
        },
        {
          id: "5",
          name: "گروه شهید بهشتی",
          count: "14",
          tools: "",
        },
        {
          id: "6",
          name: "گروه شهید بهشتی",
          count: "14",
          tools: "",
        },
        {
          id: "7",
          name: "گروه شهید بهشتی",
          count: "14",
          tools: "",
        },
      ],
      select: "",
      selectedGroup: [],
      addGroupHeader: [
        {
          text: "ردیف",
          value: "id",
        },
        { text: "نام ایستگاه", value: "name" },
        // { text: "امکانات", value: "tools", sortable: false },
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
