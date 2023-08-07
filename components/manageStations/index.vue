<template>
  <v-col md="12">
    <v-row>
      <v-col lg="10" sm="10" cols="12" class="ma-auto">
        <h2 class="mb-4">مدیریت ایستگاه ها</h2>
        <v-card elevation="6" rounded="lg" class="mb-4 blur">
          <v-data-table
            :headers="headers"
            :items="station"
            hide-default-footer
            style="background-color: transparent !important"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.tools="{ item }">
              <v-btn icon color="primary" @click="showStation = true"
                ><v-icon>fad fa-eye </v-icon></v-btn
              >
              <v-btn icon color="orange" @click="editStation = true"
                ><v-icon>fad fa-pen-to-square </v-icon></v-btn
              >
              <v-btn icon color="red" @click="removeStation = true"
                ><v-icon>fad fa-trash-can </v-icon></v-btn
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
          <v-btn
            color="primary"
            elevation="0"
            @click="addStationMenu = true"
            class="rounded-lg mr-4 mb-4"
            >افزودن ایستگاه</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
    <!-- add user menu -->
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="addStationMenu"
      fullscreen
    >
      <v-card elevation="0" rounded="0" class="pa-6">
        <v-toolbar elevation="0" color="error" dark rounded="0">
          <v-toolbar-title>افزودن ایستگاه جدید</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addStationMenu = false"
            ><v-icon>fad fa-xmark</v-icon></v-btn
          >
        </v-toolbar>
        <v-col md="10" class="ma-auto mt-6">
          <v-card-title>مشخصات دستگاه</v-card-title>
          <v-row>
            <v-text-field
              outlined
              label="سریال دستگاه"
              class="rounded-lg mx-2"
              append-icon="fad fa-barcode-read"
            ></v-text-field>
            <v-text-field
              outlined
              label="نام فارسی"
              append-icon="fad fa-earth-asia"
              class="rounded-lg mx-2"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              outlined
              label="نام لاتین"
              append-icon="fad fa-earth-americas"
              class="rounded-lg mx-2"
            ></v-text-field>
            <v-text-field
              outlined
              label="عرض جغرافیایی"
              append-icon="fad fa-ruler-horizontal"
              class="rounded-lg mx-2"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="dater"
              label="تاریخ"
              outlined
              readonly
              append-icon="fad fa-calendars"
              class="datePickerTime rounded-lg mx-2"
            ></v-text-field>
            <v-text-field
              outlined
              label="طول جغرافیایی"
              append-icon="fad fa-ruler-vertical"
              class="rounded-lg mx-2"
            ></v-text-field>
            <datePicker
              v-model="dater"
              custom-input=".datePickerTime"
              type="datetime"
              compact-time
            />
          </v-row>

          <v-card-title>افزودن رله برد جدید</v-card-title>
          <v-row>
            <v-col md="6" cols="12" class="ma-0 px-3 py-0">
              <v-text-field
                outlined
                label="عنوان"
                class="rounded-lg mx-2"
              ></v-text-field>
              <v-text-field
                outlined
                label="شماره برد"
                class="rounded-lg mx-2"
              ></v-text-field>
              <v-combobox
                outlined
                label="نوع کنترل برد"
                v-model="boardModel"
                :items="boardSelector"
                class="rounded-lg mx-2"
              ></v-combobox>
              <v-btn color="primary" elevation="0" class="rounded-lg">
                ثبت
              </v-btn>
            </v-col>

            <v-col md="6" cols="12" class="ma-0 px-3 py-0">
              <v-card elevation="6" rounded="lg" class="mb-4">
                <v-data-table
                  :headers="boardListHead"
                  :items="boardList"
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
          </v-row>
          <v-card-title class="mt-6">کاربر پیامکی</v-card-title>
          <v-row>
            <v-col cols="12" md="6" class="ma-0 px-3 py-0">
              <v-text-field
                outlined
                label="نام کاربری"
                class="rounded-lg mx-2"
              ></v-text-field>
              <v-text-field
                outlined
                label="شماره تلفن"
                class="rounded-lg mx-2"
              ></v-text-field>
              <v-btn color="primary" elevation="0" class="rounded-lg">
                ثبت
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" class="ma-0 px-3 py-0">
              <v-card elevation="6" rounded="lg" class="mb-4">
                <v-data-table
                  :headers="userListHead"
                  :items="userSmsList"
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
          </v-row>
          <v-card-title class="mt-6">نقشه</v-card-title>

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

          <v-card-actions>
            <v-spacer />
            <v-btn
              elevation="0"
              @click="addStationMenu = false"
              color="error"
              class="rounded-lg"
              >ثبت</v-btn
            >
            <v-btn
              elevation="0"
              color="error"
              outlined
              @click="addStationMenu = false"
              class="rounded-lg"
              >انصراف</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="editStation"
      width="600"
    >
      <v-toolbar elevation="0" dark class="rounded-0" color="error">
        <v-toolbar-title
          >ویرایش <b>ایستگاه شهرداری منطقه 2</b>
        </v-toolbar-title>
      </v-toolbar>
      <v-card class="rounded-0 pa-6 blur">
        <v-row class="pa-0">
          <v-text-field
            outlined
            label="سریال دستگاه"
            class="rounded-lg mx-2"
          ></v-text-field>
          <v-text-field
            outlined
            label="نام فارسی"
            class="rounded-lg mx-2"
          ></v-text-field>
        </v-row>
        <v-row class="pa-0">
          <v-text-field
            outlined
            label="نام لاتین"
            class="rounded-lg mx-2"
          ></v-text-field>
          <v-text-field
            outlined
            label="عرض جغرافیایی"
            class="rounded-lg mx-2"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            outlined
            label="طول جغرافیایی"
            class="rounded-lg mx-2"
          ></v-text-field>

          <v-text-field
            v-model="dater"
            outlined
            label="تاریخ"
            prepend-icon="fad fa-calendars"
            readonly
            class="datePickerTime rounded-lg mx-2"
          ></v-text-field>
        </v-row>
        <datePicker
          v-model="dater"
          custom-input=".datePickerTime"
          type="datetime"
          compact-time
        />
        <v-card-actions class="pa-0">
          <v-btn
            elevation="0"
            @click="editStation = false"
            color="error"
            class="rounded-lg"
            >ثبت</v-btn
          >
          <v-btn
            elevation="0"
            color="error"
            outlined
            @click="editStation = false"
            class="rounded-lg"
            >انصراف</v-btn
          >
          <v-spacer />
          <v-btn
            color="error"
            @click="editStation = false"
            outlined
            elevation="0"
            class="rounded-lg"
            >حذف ایستگاه</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="removeStation"
      width="600"
    >
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" color="error " dark>
          <v-icon class="ml-4">fad fa-skull-crossbones fa-fade</v-icon>
          <h2>اخطار</h2></v-toolbar
        >
        <h3 class="pa-4">آیا از حذف ایستگاه شهرداری منطقه 2 اطمینان دارید؟</h3>
        <v-card-actions>
          <v-spacer />

          <v-btn
            @click="removeStation = false"
            elevation="0"
            color="error"
            class="rounded-lg"
            >بله</v-btn
          >
          <v-btn
            color="error"
            outlined
            elevation="0"
            @click="removeStation = false"
            class="rounded-lg"
            >خیر</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="showStation"
      fullscreen
    >
      <v-toolbar elevation="0" dark color="error" rounded="0">
        <div class="statuser3 mx-3"></div>
        <v-toolbar-title> ایستگاه شهرداری منطقه 2</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="showStation = false">
          <v-icon>fad fa-xmark</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card elevation="0" rounded="0">
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

          <h2 class="mb-3">جدول دیماند</h2>
          <v-card elevation="6" rounded="lg" class="mb-4">
            <v-data-table
              :headers="dimondHead"
              :items="dimonds"
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
          <v-btn color="primary" elevation="0" class="rounded-lg mt-4"
            >دریافت اکسل جدول دیماند</v-btn
          >

          <v-col cols="12" class="mt-8">
            <h2>نقشه</h2>
            <v-card elevation="6" rounded="lg">
              <div id="map-wrap" style="height: 60vh">
                <client-only>
                  <l-map :zoom="13" :center="[55.9464418, 8.1277591]">
                    <l-tile-layer
                      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    ></l-tile-layer>
                    <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
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
      max-width="600"
    >
      <v-card rounded="lg">
        <v-toolbar elevation="0" color="error" dark
          ><v-toolbar-title>ارسال پیامک</v-toolbar-title></v-toolbar
        >
        <div class="pa-6">
          <v-radio-group v-model="radioGroup">
            <v-radio
              class="text-right"
              v-for="n in radioLabel"
              :key="n.length"
              :label="n"
              :value="n"
            ></v-radio>
          </v-radio-group>
          <v-textarea filled placeholder="بنویس ..."></v-textarea>
        </div>
        <v-card-actions>
          <v-btn
            @click="smsMenu = false"
            color="primary"
            elevation="0"
            class="rounded-lg mt-2"
            >ارسال</v-btn
          >

          <v-btn
            @click="smsMenu = false"
            color="primary"
            outlined
            elevation="0"
            class="rounded-lg mt-2"
            >لغو</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

import { gmapApi } from "vue2-google-maps";
import { Chart } from "highcharts-vue";
export default {
  transition: "fade",
  components: {
    Chart: Chart,
    datePicker: VuePersianDatetimePicker,
    gmapApi: gmapApi,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dater: null,
      timeReserve: null,
      smsMenu: false,
      smsText: "",
      statIsOn: false,
      showStation: false,
      removeStation: false,
      addStationMenu: false,
      comboSelect: "",
      menu: false,
      datePicker: null,
      editStation: null,
      radioGroup: "",
      boardModel: "",
      boardSelector: ["کنترل مدار فرمان", "هشدار دهنده"],
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
      boardListHead: [
        {
          text: "ردیف",
          align: "start",
          value: "id",
        },
        { text: "نام برد", value: "name" },
        { text: "سریال", value: "serial" },
      ],
      boardList: [
        {
          id: 1,
          name: "برد 1",
          serial: "0912345678",
        },
        {
          id: 2,
          name: "برد 2",
          serial: "0912345678",
        },
        {
          id: 3,
          name: "برد 3",
          serial: "0912345678",
        },
      ],
      userListHead: [
        {
          text: "ردیف",
          align: "start",
          value: "id",
        },
        { text: "نام و نام خانوادگی", value: "name" },
        { text: "تلفن", value: "tel" },
      ],
      userSmsList: [
        {
          id: 1,
          name: "محمدی",
          tel: "0912345678",
        },
        {
          id: 2,
          name: "محمدی",
          tel: "0912345678",
        },
        {
          id: 3,
          name: "محمدی",
          tel: "0912345678",
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
      headers: [
        {
          text: "ردیف",
          value: "id",
        },
        { text: "نام ایستگاه", value: "name" },
        { text: "سریال", value: "serial" },
        { text: "امکانات", value: "tools", sortable: false, align: "center" },
      ],
      station: [
        {
          id: 0,
          name: "ایستگاه اول",
          serial: "123456789",
        },
        {
          id: 1,
          name: "ایستگاه اول",
          serial: "123456789",
        },
        {
          id: 2,
          name: "ایستگاه دوم",
          serial: "123456789",
        },
        {
          id: 3,
          name: "ایستگاه سوم",
          serial: "123456789",
        },
        {
          id: 4,
          name: "ایستگاه چهارم",
          serial: "123456789",
        },
        {
          id: 5,
          name: "ایستگاه پنجم",
          serial: "123456789",
        },
      ],
      comboItems: [
        { text: "سوپر مدیر", value: "1" },
        { text: "مدیر", value: "2" },
        { text: "کاربر", value: "3" },
      ],
    };
  },
  methods: {
    getLatLng() {
      // return new google.maps.LatLng(1.38, 103.8);
    },
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
    // console.log(new google.maps.LatLng(1.38, 103.8));
  },
};
</script>

<style></style>
