<template>
  <v-col cols="12" lg="10" sm="8" class="ma-auto">
    <v-card class="pa-6 blur" rounded="lg" elevation="6">
      <h2 class="mb-4">انتخاب بازه زمانی</h2>
      <v-row class="pa-0 mt-6">
        <v-col md="6" cols="12" class="pa-0">
          <v-text-field
            outlined
            label="بازه تاریخی"
            v-model="date"
            class="rangeDate"
          ></v-text-field>
          <datepicker
            v-model="date"
            custom-input=".rangeDate"
            range
            type="datetime"
            compact-time
          />
          <v-select
            :items="refreshSelect"
            outlined
            label="بروزرسانی گزارش"
          ></v-select>
        </v-col>
        <v-col md="6" cols="12" class="pa-0">
          <v-radio-group class="pa-0 ma-0" v-model="radioGroup">
            <v-row class="pa-0 ma-0">
              <v-radio class="mb-8" label="" value="1"></v-radio>
              <v-autocomplete
                :disabled="radioGroup == 2"
                v-model="autoComp"
                :items="autoCompItems"
                outlined
                label="انتخاب از گروه"
              ></v-autocomplete>
            </v-row>

            <v-row class="pa-0 ma-0">
              <v-radio class="mb-8" label="" value="2"></v-radio>
              <v-autocomplete
                :disabled="radioGroup == 1"
                v-model="autoComp"
                :items="autoCompItems"
                outlined
                label="انتخاب از گروه"
              ></v-autocomplete>
            </v-row>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="primary" elevation="0" class="rounded-lg mt-4 mx-1"
          >اعمال فیلتر</v-btn
        >
        <v-btn color="green accent-4" elevation="0" class="rounded-lg mt-4 mx-1"
          >دریافت خروجی اکسل</v-btn
        >
      </v-row>
      <Chart class="mt-8" ref="highchart" :options="chartOptions" />
    </v-card>
  </v-col>
</template>

<script>
import datepicker from "vue-persian-datetime-picker";

import { Chart } from "highcharts-vue";
export default {
  transition: "fade",
  components: {
    Chart,
    datepicker,
  },
  data() {
    return {
      date: [],
      autoComp: "",
      radioGroup: 1,
      refreshSelect: ["5 دقیقه", "2 دقیقه", "10 دقیقه"],
      autoCompItems: [
        { text: "شهر", value: "شهر" },
        { text: "استان", value: "استان" },
        { text: "کشور", value: "کشور" },
      ],
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
          text: "مانیتورینگ",
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
        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
            pointStart: 2000,
          },
          area: {
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
    };
  },
};
</script>

<style></style>
