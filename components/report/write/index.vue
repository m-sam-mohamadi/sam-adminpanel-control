<template>
  <v-col cols="12" lg="8" sm="10" class="ma-auto">
    <h2 class="mb-4">ارسال گزارش</h2>
    <v-card elevation="6" rounded="lg" class="pa-6 blur">
      <v-text-field
        class="rounded-lg"
        outlined
        label="عنوان"
        v-model="title"
        prepend-inner-icon="fad fa-text"
      ></v-text-field>
      <v-text-field
        v-model="date"
        outlined
        label="تاریخ و ساعت"
        class="writeReport rounded-lg"
        prepend-inner-icon="fad fa-timer"
      ></v-text-field>
      <datepicker
        v-model="date"
        custom-input=".writeReport"
        type="datetime"
        compact-time
      />
      <!-- <v-btn>bold</v-btn>
      <v-btn>italic</v-btn>
      <v-btn>underline</v-btn> -->
      <v-row class="mb-2">
        <v-btn-toggle class="rounded-lg ma-auto blur" multiple>
          <v-btn @click="applyStyle('bold')" class="blur">
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn @click="applyStyle('italic')" class="blur">
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn @click="applyStyle('underline')" class="blur">
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>

          <v-btn @click="applyStyle('fontSize', (count += 1))">
            <v-icon>mdi-format-font-size-increase</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle class="rounded-lg ma-auto">
          <v-btn @click="applyStyle('justifyCenter')">
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>

          <v-btn @click="applyStyle('justifyLeft')">
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>

          <v-btn @click="applyStyle('justifyRight')">
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>

          <v-btn @click="applyStyle('insertHorizontalRule')">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn @click="applyStyle('insertUnorderedList')">
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-btn>
          <!-- <v-btn @click="details = ' '">
          <v-icon>mdi-delete</v-icon>
        </v-btn> -->
        </v-btn-toggle>
      </v-row>
      <div
        class="textareaEditor"
        contenteditable="true"
        @input="updateValue($event.target.innerHTML)"
        dir="ltr"
      ></div>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" class="rounded-lg" elevation="0">ذخیره</v-btn>
        <v-btn
          color="error"
          outlined
          class="rounded-lg"
          elevation="0"
          @click="removeText = true"
          :disabled="details == ''"
        >
          حذف همه
        </v-btn>
      </v-card-actions>
    </v-card>

    <h2 class="mt-8">لیست گزارشات</h2>
    <v-card elevation="6" rounded="lg" class="blur">
      <v-list color="transparent">
        <v-list-item-group>
          <v-list-item
            @click="showReport = true"
            v-for="(report, index) in reports"
            :key="index"
          >
            <v-list-item-avatar>
              <v-img :src="report.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ report.name }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ report.time }} - {{ report.date }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>{{ report.text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="removeText"
      width="500"
    >
      <v-card rounded="lg" class="blur">
        <v-toolbar elevation="0" color="error " dark>
          <v-icon class="ml-4">fad fa-skull-crossbones fa-fade</v-icon>
          <h2>اخطار</h2></v-toolbar
        >
        <h3 class="pa-4">آیا از خالی کردن تمام مقدار ها اطمینان دارید؟</h3>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="deleteAll()"
            elevation="0"
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
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="showReport"
      width="600"
    >
      <v-card elevation="6" rounded="lg" class="pa-6 blur">
        <h2>گزارش مربوط به محمدی</h2>
        <v-row class="mt-8 px-2">
          <v-text-field
            outlined
            class="mx-2 rounded-lg"
            v-model="title"
            label="عنوان"
            readonly
          ></v-text-field>
          <v-text-field
            outlined
            readonly
            class="mx-2 rounded-lg"
            v-model="date"
            label="تاریخ و ساعت"
          ></v-text-field>
        </v-row>
        <h4>توضیحات</h4>
        <div
          v-html="details"
          outlined
          readonly
          class="mx-2 rounded-lg textareaEditor"
          label="توضیحات"
        ></div>
        <v-card-actions>
          <v-btn color="primary" elevation="0" class="rounded-lg"
            >دیده شد</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import datepicker from "vue-persian-datetime-picker";
export default {
  components: {
    datepicker,
  },
  methods: {
    applyStyle(command, tag) {
      document.execCommand(command, false, tag);
      this.count == 8 ? (this.count = 1) : this.count;
      this.count == 0 ? (this.count = 7) : this.count;
    },
    updateValue(value) {
      // this.$emit("input", value);
      this.details = value;
      console.log(this.details);
    },
    deleteAll() {
      this.removeText = false;
      document.querySelector(".textareaEditor").innerHTML = "";
      this.date = "";
      this.title = "";
    },
  },
  transition: "fade",
  data() {
    return {
      date: "",
      count: 1,
      details: "",
      removeText: false,
      title: "",
      showReport: false,
      reports: [
        {
          name: "محمدی",
          title: "محمدی",
          text: `
          لورملورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          `,
          date: "1398/12/12",
          time: "12:12",
          id: 1,
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          name: "محمدی",
          text: "محتوای گفتگوی با محمدی",
          date: "1398/12/12",
          time: "12:12",
          id: 1,
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          name: "محمدی",
          text: `
          لورملورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          `,
          date: "1398/12/12",
          time: "12:12",
          id: 1,
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
        {
          name: "محمدی",
          text: `
          لورملورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          `,
          date: "1398/12/12",
          time: "12:12",
          id: 1,
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.textareaEditor {
  height: calc(50vh - 50px);
  border: 1px solid #888;
  border-radius: 12px;
  padding: 12px;
  outline-color: #1976d2;
  overflow: auto;
  ul,
  ol {
    margin-right: 12px;
  }
}
</style>
