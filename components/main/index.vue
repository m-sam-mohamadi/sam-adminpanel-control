<template>
  <v-col md="10" class="ma-auto">
    <v-col cols="12" class="mb-4 mt-6 pa-0">
      <v-row>
        <v-col sm="4" cols="12">
          <v-card
            rounded="lg"
            class="d-flex overflow-hidden blur"
            height="70px"
          >
            <v-card
              width="60px"
              max-height="100%"
              elevation="0"
              rounded="0"
              color="rgba(255, 54, 54,0.2)"
              class="d-flex justify-center align-center blur"
              ><v-icon color="rgba(255, 54, 54,1 )"
                >fad fa-charging-station</v-icon
              ></v-card
            >
            <span class="mr-4 my-2">
              <h4>تعداد ایستگاه ها</h4>
              <h2>77</h2>
            </span>
          </v-card>
        </v-col>
        <v-col sm="4" cols="12">
          <v-card
            rounded="lg"
            class="d-flex overflow-hidden blur"
            height="70px"
          >
            <v-card
              width="60px"
              max-height="100%"
              elevation="0"
              rounded="0"
              color="rgba(9, 186, 65,0.2)"
              class="d-flex justify-center align-center blur"
              ><v-icon color="rgba(9, 186, 65,1)"
                >fad fa-layer-group</v-icon
              ></v-card
            >
            <span class="mr-4 my-2">
              <h4>تعداد گروه ها</h4>
              <h2>77</h2>
            </span>
          </v-card>
        </v-col>
        <v-col sm="4" cols="12">
          <v-card
            rounded="lg"
            class="d-flex overflow-hidden blur"
            height="70px"
          >
            <v-card
              width="60px"
              max-height="100%"
              elevation="0"
              rounded="0"
              color="rgba(74, 95, 255,0.2)"
              class="d-flex justify-center align-center blur"
              ><v-icon color="rgba(74, 95, 255,1)">fad fa-users</v-icon></v-card
            >
            <span class="mr-4 my-2">
              <h4>تعداد کاربر ها</h4>
              <h2>77</h2>
            </span>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-row>
      <v-col md="4" cols="12">
        <h2 class="mb-4">لیست گروه ها</h2>
        <v-card rounded="lg" elevation="4" class="blur">
          <v-list color="transparent" nav dense>
            <v-list-item
              color="primary"
              @click="showListDetails = true"
              v-for="(data, i) in items"
              :key="i"
            >
              <v-list-item-title>{{ data.title }}</v-list-item-title>
              <v-list-item-title class="text-left mb-2">
                <v-list-item-subtitle
                  >{{ data.count }} دستگاه</v-list-item-subtitle
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="8" cols="12">
        <h2 class="mb-4">لیست ایستگاه ها</h2>
        <v-card elevation="6" rounded="lg" class="mb-4 blur">
          <v-data-table
            :headers="stationHead"
            :items="stations"
            style="background: transparent !important"
            :single-select="singleSelect"
            show-select
            v-model="selected"
            hide-default-footer
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.status="{ item }">
              <div :class="`statuser${item.status}`"></div>
            </template>
            <template v-slot:item.tools="{ item }">
              <v-btn
                class="ml-n2"
                icon
                color="primary"
                @click="showStation = true"
                ><v-icon>fad fa-eye</v-icon></v-btn
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

        <v-btn
          @click="onStation = true"
          color="primary"
          class="mt-4 rounded-lg"
          elevation="0"
          :disabled="selected.length == 0"
          >وصل ایستگاه ها</v-btn
        >
        <v-btn
          @click="offStation = true"
          class="mt-4 rounded-lg"
          elevation="0"
          outlined
          color="primary"
          :disabled="selected.length == 0"
          >قطع ایستگاه ها</v-btn
        >

        <v-alert
          color="red "
          border="left"
          class="my-3 rounded-lg"
          icon="fad fa-brake-warning fa-fade"
          elevation="0"
        >
          برای روشن یا خاموش کردن ایستگاه ها تیک آنها را بزنید</v-alert
        >
      </v-col>
    </v-row>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="onStation"
      width="500"
    >
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" color="error " dark>
          <v-icon class="ml-4">fad fa-skull-crossbones fa-fade</v-icon>
          <h2>اخطار</h2></v-toolbar
        >
        <v-card-text>
          <h2 class="pa-12">آیا از روشن کردن ایستگاه اطمینان دارید؟</h2>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="error"
            class="rounded-lg"
            @click="onStation = false"
            elevation="0"
            >بله</v-btn
          >
          <v-btn
            color="error"
            outlined
            @click="onStation = false"
            elevation="0"
            class="rounded-lg"
            >خیر</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="offStation"
      width="500"
    >
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" color="error " dark>
          <v-icon class="ml-4">fad fa-skull-crossbones fa-fade</v-icon>
          <h2>اخطار</h2></v-toolbar
        >
        <v-card-text>
          <h2 class="pa-12">آیا از خاموش کردن ایستگاه اطمینان دارید؟</h2>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="error"
            class="rounded-lg"
            @click="offStation = false"
            elevation="0"
            >بله</v-btn
          >
          <v-btn
            color="error"
            outlined
            class="rounded-lg"
            @click="offStation = false"
            elevation="0"
            >خیر</v-btn
          >
        </v-card-actions>
      </v-card></v-dialog
    >

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="showStation"
      fullscreen
    >
      <v-card elevation="0" rounded="0">
        <v-toolbar elevation="0" color="error" dark>
          <div class="statuser3 mx-3"></div>
          <v-toolbar-title> ایستگاه شهرداری منطقه 2</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="showStation = false">
            <v-icon>fad fa-xmark</v-icon>
          </v-btn>
        </v-toolbar>
        <v-col md="10" class="ma-auto">
          <v-row justify="space-between" align="center" class="px-2">
            <div class="d-flex align-center">
              <v-switch inset v-model="statIsOn"></v-switch>
              <h5>{{ statIsOn ? "ایستگاه روشن است" : "ایستگاه خاموش است" }}</h5>
            </div>
            <div class="d-flex align-center">
              <v-btn
                @click="smsMenu = true"
                rounded
                color="orange"
                elevation="0"
                ><v-icon>fad fa-envelope</v-icon>ارسال پیامک</v-btn
              >

              <h5></h5>
            </div>
          </v-row>
          <Chart ref="highchart" :options="chartOptions" />

          <v-row justify="space-around" align="center" class="mt-12">
            <v-col md="2" cols="6">
              <v-card
                rounded="lg"
                height="80px"
                class="d-flex overflow-hidden ma-2"
              >
                <v-card
                  width="60px"
                  max-height="100%"
                  elevation="0"
                  rounded="0"
                  color="red"
                  class="d-flex justify-center align-center"
                  ><v-icon color="white" large
                    >fad fa-car-battery</v-icon
                  ></v-card
                >
                <span class="mr-4 my-4 px-4">
                  <h4>توان</h4>
                  <h2>2.78</h2>
                </span>
              </v-card></v-col
            >
            <v-col md="2" cols="6">
              <v-card
                height="80px"
                rounded="lg"
                class="d-flex overflow-hidden ma-2"
              >
                <v-card
                  width="60px"
                  max-height="100%"
                  elevation="0"
                  rounded="0"
                  color="orange"
                  class="d-flex justify-center align-center"
                  ><v-icon color="white" large
                    >fad fa-wave-square</v-icon
                  ></v-card
                >
                <span class="mr-4 my-4 px-4">
                  <h4>جریان</h4>
                  <h2>12.9</h2>
                </span>
              </v-card>
            </v-col>
            <v-col md="2" cols="6">
              <v-card
                height="80px"
                rounded="lg"
                class="d-flex overflow-hidden ma-2"
              >
                <v-card
                  width="60px"
                  max-height="100%"
                  elevation="0"
                  rounded="0"
                  color="purple accent-4"
                  class="d-flex justify-center align-center"
                  ><v-icon color="white" large>fad fa-bolt</v-icon></v-card
                >
                <span class="mr-4 my-4 px-4">
                  <h4>ولتاژ</h4>
                  <h2>223</h2>
                </span>
              </v-card>
            </v-col>
            <v-col md="2" cols="6">
              <v-card
                height="80px"
                rounded="lg"
                class="d-flex overflow-hidden ma-2"
              >
                <v-card
                  width="60px"
                  max-height="100%"
                  elevation="0"
                  rounded="0"
                  color="blue accent-4"
                  class="d-flex justify-center align-center white--text"
                  ><h2><b>PF</b></h2></v-card
                >
                <span class="mr-4 my-4 px-4">
                  <h4>PF</h4>
                  <h2>0.99</h2>
                </span>
              </v-card>
            </v-col>
          </v-row>
          <v-btn color="primary" elevation="0" class="mt-4 rounded-lg"
            >بروزرسانی</v-btn
          >
          <v-row class="mt-8">
            <v-col md="4">
              <h3>میزان آخرین همکاری</h3>
              <v-text-field
                class="mt-4 rounded-lg"
                filled
                disabled
              ></v-text-field>
              <v-btn block color="primary" elevation="0" class="rounded-lg"
                >دریافت اکسل میزان همکاری</v-btn
              >
            </v-col>
            <v-col md="8">
              <h3>برنامه زمانبندی</h3>
              <v-row class="mt-4">
                <v-text-field
                  v-model="timeReserve"
                  label="تاریخ و ساعت"
                  outlined
                  class="timeReserve rounded-lg mx-2"
                ></v-text-field>
                <datePicker
                  v-model="timeReserve"
                  custom-input=".timeReserve"
                  type="datetime"
                  compact-time
                />
                <v-combobox
                  v-model="comboSelect"
                  :items="statItems"
                  label="وضعیت دستگاه"
                  outlined
                  class="rounded-lg mx-2"
                ></v-combobox>
              </v-row>
              <v-row class="px-2">
                <v-btn color="primary" elevation="0" class="rounded-lg"
                  >افزودن تایمر</v-btn
                >
                <v-btn
                  outlined
                  color="primary"
                  elevation="0"
                  class="rounded-lg mx-2"
                  >ذخیره تایمر</v-btn
                >
              </v-row>
            </v-col>
          </v-row>
          <h2 class="mt-8">جدول دیماند</h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">نام ایستگاه</th>
                  <th class="text-left">00:00</th>
                  <th class="text-left">00:05</th>
                  <th class="text-left">00:10</th>
                  <th class="text-left">00:15</th>
                  <th class="text-left">00:20</th>
                  <th class="text-left">00:25</th>
                  <th class="text-left">00:30</th>
                  <th class="text-left">00:35</th>
                  <th class="text-left">00:40</th>
                  <th class="text-left">00:45</th>
                  <th class="text-left">00:50</th>
                  <th class="text-left">00:55</th>
                  <th class="text-left">01:00</th>
                  <th class="text-left">01:05</th>
                  <th class="text-left">01:10</th>
                  <th class="text-left">01:15</th>
                  <th class="text-left">01:20</th>
                  <th class="text-left">01:25</th>
                  <th class="text-left">01:30</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ایستگاه شهرداری 2</td>
                  <td v-for="time in times" :key="time.name">{{ time }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn color="primary" elevation="0" class="rounded-lg mt-4"
            >دریافت اکسل جدول دیماند</v-btn
          >

          <v-col cols="12" class="mt-8">
            <h2>نقشه</h2>
            <v-card elevation="6" rounded="lg">
              <div id="map-wrap" style="height: 60vh">
                <client-only>
                  <l-map :zoom="13" :center="[36.4877877, 52.9533184]">
                    <l-tile-layer
                      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    ></l-tile-layer>
                    <l-marker :lat-lng="[36.4877877, 52.9533184]"></l-marker>
                    <l-marker :lat-lng="[36.5760004, 53.0505453]"></l-marker>
                  </l-map>
                </client-only></div
            ></v-card>
          </v-col>
        </v-col>
      </v-card>
    </v-dialog>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="smsMenu"
      width="600"
    >
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" dark color="error"
          ><v-toolbar-title>ارسال پیامک</v-toolbar-title></v-toolbar
        >
        <div class="pa-6">
          <v-radio-group v-model="radioGroup">
            <v-radio
              v-for="n in radioLabel"
              :key="n.length"
              :label="n"
              :value="n"
            ></v-radio>
          </v-radio-group>
          <v-textarea filled placeholder="بنویس ..."></v-textarea>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="smsMenu = false"
            color="error"
            elevation="0"
            class="rounded-lg mt-2"
            >ارسال</v-btn
          >

          <v-btn
            @click="smsMenu = false"
            color="error"
            outlined
            elevation="0"
            class="rounded-lg mt-2"
            >لغو</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="showListDetails"
      fullscreen
    >
      <v-card elevation="0" rounded="0">
        <v-toolbar elevation="0" dark color="error">
          <v-toolbar-title>جزئیات گروه شهرداری</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="showListDetails = false"
            ><v-icon>fad fa-xmark</v-icon></v-btn
          >
        </v-toolbar>
        <v-col lg="10" cols="12" class="ma-auto">
          <v-row justify="space-between" align="center" class="px-2">
            <div class="d-flex align-center">
              <v-switch inset v-model="statIsOn"></v-switch>
              <h5>{{ statIsOn ? "ایستگاه روشن است" : "ایستگاه خاموش است" }}</h5>
            </div>
            <div class="d-flex align-center">
              <v-btn
                @click="smsMenu = true"
                rounded
                color="orange"
                elevation="0"
                ><v-icon>fad fa-envelope</v-icon>ارسال پیامک</v-btn
              >
            </div>
          </v-row>
          <Chart ref="highchart" :options="chartOptions" class="mt-8" />
          <v-row class="mt-8">
            <v-col md="6">
              <h2 class="mb-3">مشاهده دستگاه ها</h2>
              <v-card elevation="6" rounded="lg" class="mb-4">
                <v-data-table
                  :headers="headers"
                  :items="users"
                  :single-select="singleSelect"
                  show-select
                  v-model="selected"
                  hide-default-footer
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  @page-count="pageCount = $event"
                  class="elevation-0"
                >
                  <template v-slot:item.status="{ item }">
                    <div :class="`statuser${item.status} mx-2`"></div>
                  </template>
                  <template v-slot:item.tools="{ item }">
                    <v-btn icon color="primary" @click="showStation = true"
                      ><v-icon>fad fa-eye</v-icon></v-btn
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
              <h2 class="mb-3">جدول همکاری</h2>
              <v-card elevation="6" rounded="lg" class="mb-4">
                <v-data-table
                  :headers="helpHead"
                  :items="helps"
                  class="elevation-0 rounded-lg"
                  hide-default-footer
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  @page-count="pageCount = $event"
                >
                  <template v-slot:item.status="{ item }">
                    <div :class="`statuser${item.status}`"></div>
                  </template>
                  <template v-slot:item.tools="{ item }">
                    <v-btn icon color="primary" @click="showStation = true"
                      ><v-icon>fad fa-eye</v-icon></v-btn
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
              <v-text-field
                outlined
                label="جمع جدول حمکاری"
                readonly
                value="1.98KW"
                class="mt-10 rounded-lg"
              ></v-text-field>
            </v-col>
          </v-row>

          <h2 class="mt-8">برنامه زمانبندی</h2>
          <v-row class="mt-4">
            <v-text-field
              v-model="timeReserve"
              label="تاریخ و ساعت"
              outlined
              class="timeReserve rounded-lg mx-2"
            ></v-text-field>
            <datePicker
              v-model="timeReserve"
              custom-input=".timeReserve"
              type="datetime"
              compact-time
            />
            <v-combobox
              v-model="comboSelect"
              :items="statItems"
              label="وضعیت دستگاه"
              outlined
              class="rounded-lg mx-2"
            ></v-combobox>
          </v-row>
          <v-row class="px-2">
            <v-btn color="primary" elevation="0" class="rounded-lg"
              >افزودن تایمر</v-btn
            >
            <v-btn
              outlined
              color="primary"
              elevation="0"
              class="rounded-lg mx-2"
              >ذخیره تایمر</v-btn
            >
          </v-row>
          <v-col cols="12" class="mt-8">
            <h2 class="mb-3">جدول دیماند</h2>
            <v-card elevation="6" rounded="lg" class="mb-4">
              <v-data-table
                :headers="dimondHead"
                :items="dimonds"
                class="elevation-0 rounded-lg"
                hide-default-footer
                :page.sync="page"
                :items-per-page="itemsPerPage"
                @page-count="pageCount = $event"
              >
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
          <h2 class="mt-8">نقشه</h2>

          <div id="map-wrap" style="height: 60vh">
            <client-only>
              <l-map :zoom="13" :center="[36.4877877, 52.9533184]">
                <l-tile-layer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                ></l-tile-layer>
                <l-marker :lat-lng="[36.4877877, 52.9533184]"></l-marker>
                <l-marker :lat-lng="[36.5760004, 53.0505453]"></l-marker>
              </l-map>
            </client-only>
          </div>
        </v-col>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import datePicker from "vue-persian-datetime-picker";

import { Chart } from "highcharts-vue";
export default {
  components: {
    Chart,
    datePicker,
    transition: "fade",
  },
  transition: "fade",
  data() {
    return {
      timeReserve: null,
      smsMenu: false,
      smsText: "",
      statIsOn: false,
      showStation: false,
      onStation: false,
      offStation: false,
      value: 50,
      selected: [],
      singleSelect: false,
      radioGroup: "",
      showListDetails: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      helps: [
        {
          id: 0,
          name: "ایستگاه اول",
          serial: "123456789",
          status: 1,
        },
        {
          id: 1,
          name: "ایستگاه اول",
          serial: "123456789",
          status: 1,
        },
        {
          id: 2,
          name: "ایستگاه دوم",
          serial: "123456789",
          status: 1,
        },
        {
          id: 3,
          name: "ایستگاه سوم",
          serial: "123456789",
          status: 1,
        },
        {
          id: 4,
          name: "ایستگاه چهارم",
          serial: "123456789",
          status: 1,
        },
      ],
      helpHead: [
        { text: "ردیف", value: "id", align: "center" },
        { text: "نام", value: "name" },
        { text: "وضعیت", value: "status", align: "center" },
        { text: "امکانات", value: "tools" },
      ],
      dimondHead: [
        {
          text: "نام",
          value: "name",
        },
        {
          text: "00:00",
          value: "time0000",
        },
        {
          text: "00:05",
          value: "time0005",
        },
        {
          text: "00:10",
          value: "time0010",
        },
        {
          text: "00:15",
          value: "time0015",
        },
        {
          text: "00:20",
          value: "time0020",
        },
        {
          text: "00:25",
          value: "time0025",
        },
        {
          text: "00:30",
          value: "time0030",
        },
        {
          text: "00:35",
          value: "time0035",
        },
        {
          text: "00:40",
          value: "time0040",
        },
        {
          text: "00:45",
          value: "time0045",
        },
        {
          text: "00:50",
          value: "time0050",
        },
        {
          text: "00:55",
          value: "time0055",
        },
        {
          text: "01:00",
          value: "time0100",
        },
        {
          text: "01:05",
          value: "time0105",
        },
        {
          text: "01:10",
          value: "time0110",
        },
        {
          text: "01:15",
          value: "time0115",
        },
        {
          text: "01:20",
          value: "time0120",
        },
        {
          text: "01:25",
          value: "time0125",
        },
        {
          text: "01:30",
          value: "time0130",
        },
        {
          text: "01:35",
          value: "time0135",
        },
        {
          text: "01:40",
          value: "time0140",
        },
        {
          text: "01:45",
          value: "time0145",
        },
        {
          text: "01:50",
          value: "time0150",
        },
        {
          text: "01:55",
          value: "time0155",
        },
      ],
      dimonds: [
        {
          name: "شهرداری ساری",
          time0000: "داده یافت نشد",
          time0005: "داده یافت نشد",
          time0010: "داده یافت نشد",
          time0015: "داده یافت نشد",
          time0020: "داده یافت نشد",
          time0025: "داده یافت نشد",
          time0030: "داده یافت نشد",
          time0035: "داده یافت نشد",
          time0040: "داده یافت نشد",
          time0045: "داده یافت نشد",
          time0050: "داده یافت نشد",
          time0055: "داده یافت نشد",
          time0100: "داده یافت نشد",
          time0105: "داده یافت نشد",
          time0110: "داده یافت نشد",
          time0115: "داده یافت نشد",
          time0120: "داده یافت نشد",
          time0125: "داده یافت نشد",
          time0130: "داده یافت نشد",
          time0135: "داده یافت نشد",
          time0140: "داده یافت نشد",
          time0145: "داده یافت نشد",
          time0150: "داده یافت نشد",
          time0155: "داده یافت نشد",
        },
        {
          name: "شهرداری ساری",
          time0000: "داده یافت نشد",
          time0005: "داده یافت نشد",
          time0010: "داده یافت نشد",
          time0015: "داده یافت نشد",
          time0020: "داده یافت نشد",
          time0025: "داده یافت نشد",
          time0030: "داده یافت نشد",
          time0035: "داده یافت نشد",
          time0040: "داده یافت نشد",
          time0045: "داده یافت نشد",
          time0050: "داده یافت نشد",
          time0055: "داده یافت نشد",
          time0100: "داده یافت نشد",
          time0105: "داده یافت نشد",
          time0110: "داده یافت نشد",
          time0115: "داده یافت نشد",
          time0120: "داده یافت نشد",
          time0125: "داده یافت نشد",
          time0130: "داده یافت نشد",
          time0135: "داده یافت نشد",
          time0140: "داده یافت نشد",
          time0145: "داده یافت نشد",
          time0150: "داده یافت نشد",
          time0155: "داده یافت نشد",
        },
        {
          name: "شهرداری ساری",
          time0000: "داده یافت نشد",
          time0005: "داده یافت نشد",
          time0010: "داده یافت نشد",
          time0015: "داده یافت نشد",
          time0020: "داده یافت نشد",
          time0025: "داده یافت نشد",
          time0030: "داده یافت نشد",
          time0035: "داده یافت نشد",
          time0040: "داده یافت نشد",
          time0045: "داده یافت نشد",
          time0050: "داده یافت نشد",
          time0055: "داده یافت نشد",
          time0100: "داده یافت نشد",
          time0105: "داده یافت نشد",
          time0110: "داده یافت نشد",
          time0115: "داده یافت نشد",
          time0120: "داده یافت نشد",
          time0125: "داده یافت نشد",
          time0130: "داده یافت نشد",
          time0135: "داده یافت نشد",
          time0140: "داده یافت نشد",
          time0145: "داده یافت نشد",
          time0150: "داده یافت نشد",
          time0155: "داده یافت نشد",
        },
        {
          name: "شهرداری ساری",
          time0000: "داده یافت نشد",
          time0005: "داده یافت نشد",
          time0010: "داده یافت نشد",
          time0015: "داده یافت نشد",
          time0020: "داده یافت نشد",
          time0025: "داده یافت نشد",
          time0030: "داده یافت نشد",
          time0035: "داده یافت نشد",
          time0040: "داده یافت نشد",
          time0045: "داده یافت نشد",
          time0050: "داده یافت نشد",
          time0055: "داده یافت نشد",
          time0100: "داده یافت نشد",
          time0105: "داده یافت نشد",
          time0110: "داده یافت نشد",
          time0115: "داده یافت نشد",
          time0120: "داده یافت نشد",
          time0125: "داده یافت نشد",
          time0130: "داده یافت نشد",
          time0135: "داده یافت نشد",
          time0140: "داده یافت نشد",
          time0145: "داده یافت نشد",
          time0150: "داده یافت نشد",
          time0155: "داده یافت نشد",
        },
        {
          name: "شهرداری ساری",
          time0000: "داده یافت نشد",
          time0005: "داده یافت نشد",
          time0010: "داده یافت نشد",
          time0015: "داده یافت نشد",
          time0020: "داده یافت نشد",
          time0025: "داده یافت نشد",
          time0030: "داده یافت نشد",
          time0035: "داده یافت نشد",
          time0040: "داده یافت نشد",
          time0045: "داده یافت نشد",
          time0050: "داده یافت نشد",
          time0055: "داده یافت نشد",
          time0100: "داده یافت نشد",
          time0105: "داده یافت نشد",
          time0110: "داده یافت نشد",
          time0115: "داده یافت نشد",
          time0120: "داده یافت نشد",
          time0125: "داده یافت نشد",
          time0130: "داده یافت نشد",
          time0135: "داده یافت نشد",
          time0140: "داده یافت نشد",
          time0145: "داده یافت نشد",
          time0150: "داده یافت نشد",
          time0155: "داده یافت نشد",
        },
      ],
      radioLabel: [
        "فرمان قطع ایستگاه صادر شده است",
        "فرمان وصل ایستگاه صادر شده است",
        "متن دلخواه",
      ],
      times: [
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
        "برق منطقه 2",
      ],
      statItems: [
        { text: "روشن", value: "روشن" },
        { text: "خاموش", value: "خاموش" },
      ],
      comboSelect: "",
      chartOptions: {
        chart: {
          type: "area",
          zoomType: "x",
        },
        data: {
          csvURL: "https://demo-live-data.highcharts.com/vs-load.csv",
          seriesMapping: [
            {
              x: 0,
              y: 1,
            },
          ],
        },
        title: {
          text: "نمودار بار مصرفی ایستگاه",
        },
        subtitle: {
          text: "تحلیل داده های بار مصرفی",
        },
        yAxis: {
          title: {
            text: "مجموع بار مصرفی",
          },
        },
        xAxis: {
          zoomEnabled: true,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        exporting: { allowHtml: true },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
          },
          area: {
            animation: {
              defer: 0,
              duration: 500,
            },
            pointStart: 0,
            pointInterval: 1,
            fillColor: {
              linearGradient: { x1: 1, x2: 1, y1: 1, y2: 0 },
              stops: [
                [0, "transparent"],
                [1, "#3272fc"],
              ],
            },
            marker: {
              radius: 3,
            },
            lineWidth: 1,
            threshold: null,
          },
        },

        // color: {
        //   linearGradient: { x1: 0, x2: 0, y1: 1, y2: 1 },
        //   stops: [
        //     [0, "#fff"],
        //     [1, "#000"],
        //   ],
        // },
        series: [
          {
            name: "بار مصرفی",
            data: [
              43934, 52503, -57177, 69658, 97031, 15931, 137133, 154175, 43934,
              3503, 57177, 69658, 97031, 29931, 137133, 154175, 43934, 52503,
              57177, 69658, 27031, -119931, 137133, 154175, 43934, 52503,
              157177,
            ],
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              // Make the labels less space demanding on mobile
              chartOptions: {
                legend: {
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal",
                },
                yAxis: {
                  title: {
                    text: "",
                  },
                },
              },
            },
          ],
        },
      },
      stationHead: [
        {
          text: "ردیف",
          value: "id",
          align: "center",
        },
        { text: "نام ایستگاه", value: "name", align: "center" },
        { text: "سریال", value: "serial", align: "center" },
        { text: "وضعیت", value: "status", align: "start" },
        { text: "امکانات", value: "tools", sortable: false, align: "center" },
      ],
      stations: [
        {
          id: 0,
          name: "ایستگاه اول",
          serial: "123456789",
          status: 3,
        },
        {
          id: 1,
          name: "ایستگاه اول",
          serial: "123456789",
          status: 1,
        },
        {
          id: 2,
          name: "ایستگاه دوم",
          serial: "123456789",
          status: 3,
        },
        {
          id: 3,
          name: "ایستگاه سوم",
          serial: "123456789",
          status: 2,
        },
        {
          id: 4,
          name: "ایستگاه چهارم",
          serial: "123456789",
          status: 1,
        },
        {
          id: 5,
          name: "ایستگاه پنجم",
          serial: "123456789",
          status: 2,
        },
      ],
      comboItems: [
        { text: "سوپر مدیر", value: "1" },
        { text: "مدیر", value: "2" },
        { text: "کاربر", value: "3" },
      ],
      items: [
        { title: "کاخ سعد آباد", count: 14 },
        { title: "کاخ سعد آباد", count: 14 },
        { title: "کاخ سعد آباد", count: 14 },
        { title: "کاخ سعد آباد", count: 14 },
      ],
      headers: [
        {
          text: "ردیف",
          value: "id",
          align: "center",
        },
        { text: "نام ایستگاه", value: "name" },
        { text: "وضعیت", value: "status" },
        { text: "امکانات", value: "tools" },
      ],
      users: [
        {
          id: "0",
          name: "شهرداری منطقه 2",
          status: "1",
        },
        {
          id: "1",
          name: "شهرداری منطقه 2",
          status: "3",
        },
        {
          id: "2",
          name: "شهرداری منطقه 2",
          status: "2",
        },
        {
          id: "3",
          name: "شهرداری منطقه 2",
          status: "1",
        },
        {
          id: "4",
          name: "شهرداری منطقه 2",
          status: "3",
        },
        {
          id: "5",
          name: "شهرداری منطقه 2",
          status: "1",
        },
        {
          id: "6",
          name: "شهرداری منطقه 2",
          status: "2",
        },
        {
          id: "7",
          name: "شهرداری منطقه 2",
          status: "3",
        },
      ],
    };
  },
  computed: {
    dimondMobileHead() {
      let i;
      if (this.$vuetify.breakpoint.md) {
        i = 5;
      } else {
        i = 1;
      }
      return i;
    },
  },
  mounted() {
    // console.log(this.dimondMobileHead);
  },
};
</script>

<style></style>
