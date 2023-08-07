<template>
  <v-col md="10" class="ma-auto">
    <v-row>
      <v-col md="4">
        <v-card
          elevation="6"
          class="d-flex justify-center align-center flex-column"
          rounded="lg"
        >
          <!-- <v-avatar class="mt-8" size="128"> -->
          <!-- <v-img
            width="100%"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU"
          ></v-img> -->
          <!-- </v-avatar> -->
          <v-card-title>محمدی</v-card-title>
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
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card elevation="4" class="pt-4 pa-4" rounded="lg">
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
            <v-col md="6" class="pa-0 px-2">
              <v-text-field
                class="rounded-lg"
                outlined
                label="پسورد جدید"
                :type="showPass ? 'text' : 'password'"
                :append-icon="showPass ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
                @click:append="showPass = !showPass"
              ></v-text-field>
            </v-col>
            <v-col md="6" class="pa-0 px-2">
              <v-text-field
                class="rounded-lg"
                outlined
                label="تکرار پسورد جدید"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn color="primary" class="rounded-lg" elevation="0"
              >ذخیره</v-btn
            >
            <!-- <v-btn color="primary" outlined class="rounded-lg" elevation="0"
              >لفو</v-btn
            > -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "profile",
  transition: "fade",
  data() {
    return {
      showPass: false,
    };
  },
};
</script>

<style></style>
