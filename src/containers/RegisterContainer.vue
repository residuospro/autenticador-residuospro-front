<template>
  <Loading v-if="showLoading" />

  <Register
    :eyeIconOne="eyeIconOne"
    :eyeIconTwo="eyeIconTwo"
    :showButton="showButton"
    :apiResponse="apiResponse"
    :statusCode="statusCode"
    :userExists="userExists"
    :getPasswordOne="getPasswordOne"
    :getPasswordTwo="getPasswordTwo"
    :getUsername="getUsername"
    :showPassord="showPassord"
    :updatedPassword="updatedPassword"
    :validateUsername="validateUsername"
  />
</template>

<script lang="ts" setup>
import { updatePasswordApi } from "@/api/updatePassword";
import Register from "@/components/Register.vue";
import { onMounted } from "vue";
import { ref, reactive, watch } from "vue";
import Loading from "@/components/Loading.vue";
import { Message } from "@/utils/enum";
import { usernameExists } from "@/api/user";

let showButton = ref(false);
let showLoading = ref(false);
let eyeIconOne = ref(false);
let eyeIconTwo = ref(false);
let apiResponse = ref("");
let statusCode = ref(0);
let userId = ref("");
let service = ref("");
let userExists = ref(false);
let userRegistration = reactive({
  username: "",
  passwordOne: "",
  passwordTwo: "",
});

const getUserId = () => {
  let url = window.location.href;

  let urlParts = url.split("/");

  userId.value = urlParts.pop() as string;
  service.value = urlParts.pop() as string;
};

onMounted(() => {
  getUserId();
});

const updatedPassword = async () => {
  showLoading.value = true;

  const res: any = await updatePasswordApi(
    userRegistration.passwordTwo,
    userId.value,
    service.value,
    userRegistration.username
  );

  handleApiResponse(res?.status);

  redirect(res?.data);

  showLoading.value = false;
};

const handleApiResponse = (status: number) => {
  statusCode.value = status;

  if (status == 200) apiResponse.value = Message.SUCESS;
  else apiResponse.value = Message.ERROR;

  showButton.value = false;
};

const validateUsername = async () => {
  const res: any = await usernameExists(
    userRegistration.username,
    userId.value
  );

  console.log("res", res);

  if (res?.status == 409) {
    userExists.value = true;
  }
};

const redirect = (data: string) => {
  setTimeout(() => {
    window.location.href = data;
  }, 6000);
};

const showPassord = (id: string, event: Event) => {
  event.stopPropagation();

  id == "#pass1"
    ? (eyeIconOne.value = !eyeIconOne.value)
    : (eyeIconTwo.value = !eyeIconTwo.value);

  let input = document.querySelector(id);

  if (input?.getAttribute("type") == "password") {
    input.setAttribute("type", "text");
  } else {
    input?.setAttribute("type", "password");
  }
};

const getPasswordOne = (value: string) => {
  userRegistration.passwordOne = value;
};

const getPasswordTwo = (value: string) => {
  userRegistration.passwordTwo = value;
};

const getUsername = (value: string) => {
  userExists.value = false;
  userRegistration.username = value;
};

watch(userRegistration, () => {
  if (
    userRegistration.passwordOne == userRegistration.passwordTwo &&
    userRegistration.passwordOne != "" &&
    userRegistration.passwordTwo != "" &&
    userRegistration.username != ""
  )
    showButton.value = true;
  else showButton.value = false;
});
</script>
