<template>
  <v-col md="10" class="ma-auto">
    <!-- <h2 class="mb-4">پروفایل شما</h2> -->
    <v-col md="10" cols="12" class="ma-auto">
      <v-card elevation="6" class="overflow-hidden blur" rounded="lg">
        <!-- <v-avatar class="mt-8" size="128"> -->
        <!-- <v-img
            width="100%"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU"
          ></v-img> -->
        <!-- </v-avatar> -->

        <v-tabs
          color="error"
          background-color="transparent"
          center-active
          fixed-tabs
        >
          <v-tab>مدیریت پروفایل</v-tab>
          <v-tab>تغییر کلمه عبور</v-tab>

          <v-tab-item style="background: transparent !important">
            <v-card
              elevation="6"
              class="pt-6 pa-4 blur"
              style="background: transparent !important"
              rounded="0"
            >
              <h2 class="mb-4">مشخصات کاربری</h2>

              <v-row>
                <v-col md="6" class="pa-0 px-3">
                  <v-text-field
                    class="rounded-lg"
                    outlined
                    label="نام"
                  ></v-text-field>
                </v-col>
                <v-col md="6" class="pa-0 px-3">
                  <v-text-field
                    class="rounded-lg"
                    outlined
                    label="نام خانوادگی"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" cols="12" class="pa-0 px-3">
                  <v-text-field
                    class="rounded-lg"
                    outlined
                    label="یوزرنیم"
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12" class="pa-0 px-3">
                  <v-text-field
                    class="rounded-lg"
                    outlined
                    label="ایمیل"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="pa-0 px-3">
                  <v-text-field
                    class="rounded-lg"
                    outlined
                    label="آدرس"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions class="pa-0">
                <v-btn color="error" class="rounded-lg" elevation="0"
                  >ذخیره</v-btn
                >
                <!-- <v-btn color="primary" outlined class="rounded-lg" elevation="0"
              >لفو</v-btn
            > -->
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <v-tab-item style="background: transparent !important">
            <v-card
              elevation="4"
              class="pt-4 pa-4 blur"
              style="background: transparent !important"
              rounded="lg"
            >
              <h2 class="mb-6">تغییر پسورد</h2>
              <v-row>
                <v-col md="12" class="pa-0 px-2">
                  <v-text-field
                    class="rounded-lg"
                    outlined
                    label="پسورد فعلی"
                    :type="showPass ? 'text' : 'password'"
                    :append-icon="showPass ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" cols="12" class="pa-0 px-2">
                  <v-text-field
                    class="rounded-lg"
                    outlined
                    label="پسورد جدید"
                    :type="showPass ? 'text' : 'password'"
                    :append-icon="showPass ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12" class="pa-0 px-2">
                  <v-text-field
                    class="rounded-lg"
                    outlined
                    label="تکرار پسورد جدید"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-card-actions class="pa-0">
                <v-btn color="error" class="rounded-lg" elevation="0"
                  >ذخیره</v-btn
                >
                <!-- <v-btn color="primary" outlined class="rounded-lg" elevation="0"
              >لفو</v-btn
            > -->
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs>
        <!-- <v-card-title>محمدی</v-card-title>
          <v-card-subtitle
            ><v-badge class="mx-2" dot color="red"></v-badge> مدیر سایت
          </v-card-subtitle>
          <v-divider dark></v-divider>
          <v-list width="100%">
            <v-list-item link exact to="/profile">
              <v-list-item-title>مدیریت پروفایل</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/profile/changePassword">
              <v-list-item-title>تغییر کلمه عبور</v-list-item-title>
            </v-list-item>
          </v-list>
      </v-col> -->
      </v-card>
    </v-col>
  </v-col>
</template>

<script>
export default {
  name: "profile",
  transition: "fade",
  data() {
    return {
      smsUser: false,
      showPass: false,
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
    };
  },
};
</script>

<style></style>
