<template>
  <v-col md="10" cols="12" class="ma-auto">
    <v-col cols="12" class="ma-auto">
      <h2 class="mb-4">مانیتورینگ و تحلیل داده ها</h2>
      <v-row justify="center" justify-md="space-between" class="mt-2">
        <v-col lg="2" sm="4" cols="6" class="pa-0">
          <v-card rounded="lg" elevation="6" class="mx-2 my-2 blur">
            <p class="pa-3">کل دستگاه ها</p>
            <br class="d-none d-md-block" />
            <v-card-actions><h3 class="ma-auto">1000</h3></v-card-actions>
          </v-card>
        </v-col>
        <v-col lg="2" sm="4" cols="6" class="pa-0">
          <v-card rounded="lg" elevation="6" class="mx-2 my-2 blur">
            <p class="pa-3">میزان همکاری</p>
            <br class="d-none d-md-block" />
            <v-card-actions><h3 class="ma-auto">0.00%</h3></v-card-actions>
          </v-card></v-col
        >
        <v-col lg="2" sm="4" cols="6" class="pa-0">
          <v-card rounded="lg" elevation="6" class="mx-2 my-2 blur">
            <p class="pa-3">ایستگاه های درحال همکاری</p>
            <v-card-actions><h3 class="ma-auto">0</h3></v-card-actions>
          </v-card></v-col
        >
        <v-col lg="2" sm="4" cols="6" class="pa-0">
          <v-card rounded="lg" elevation="6" class="mx-2 my-2 blur">
            <p class="pa-3">مقدار توان کل ایستگاه ها</p>
            <v-card-actions><h3 class="ma-auto">0.06 KW</h3></v-card-actions>
          </v-card></v-col
        >
        <v-col lg="2" sm="4" cols="6" class="pa-0">
          <v-card rounded="lg" elevation="6" class="mx-2 my-2 blur">
            <p class="pa-3">مقدار توان درحال همکاری</p>
            <v-card-actions><h3 class="ma-auto">0.00 KW</h3></v-card-actions>
          </v-card></v-col
        >
      </v-row>
    </v-col>

    <v-col cols="12" class="ma-auto">
      <v-card elevation="6" rounded="lg" class="overflow-hidden blur">
        <Chart ref="highchart" :options="chartOptions" />
      </v-card>
    </v-col>
  </v-col>
</template>

<script>
import { Chart } from "highcharts-vue";
export default {
  transition: "fade",
  components: {
    Chart,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "area",
          zoomType: "x",
        },
        exporting: {
          enabled: true,
        },
        credits: {
          enabled: false,
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
  mounted() {
    // console.log(this.$highcharts.exporting);
  },
};
</script>
