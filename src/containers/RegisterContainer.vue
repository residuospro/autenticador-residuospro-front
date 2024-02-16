<template>
  <Loading v-if="showLoading" />

  <div class="container">
    <div class="registerContainer">
      <Register
        v-if="isRegistrationLink"
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
        :finalizeRegistration="finalizeRegistration"
        :validateUsername="validateUsername"
      />

      <UpdatePassword
        v-else
        :validadePassword="validadePassword"
        :eyeIconOne="eyeIconOne"
        :eyeIconTwo="eyeIconTwo"
        :apiResponse="apiResponse"
        :statusCode="statusCode"
        :getPasswordOne="getPasswordOne"
        :getPasswordTwo="getPasswordTwo"
        :getUsername="getUsername"
        :showPassord="showPassord"
      />
    </div>

    <Logo />
  </div>
</template>

<script lang="ts" setup>
import { updatePasswordApi } from "@/api/updatePassword";
import UpdatePassword from "@/components/UpdatePassword.vue";
import Register from "@/components/Register.vue";
import { onMounted } from "vue";
import { ref, reactive, watch } from "vue";
import Loading from "@/components/Loading.vue";
import { Message } from "@/utils/enum";
import { usernameExists } from "@/api/user";
import Logo from "@/components/Logo.vue";
import router from "@/router";

let showButton = ref(false);
let showLoading = ref(false);
let eyeIconOne = ref(false);
let eyeIconTwo = ref(false);
let apiResponse = ref("");
let statusCode = ref(0);
let userId = ref("");
let idCompany = ref("");
let service = ref("");
let isRegistrationLink = ref(true);
let userExists = ref(false);
let userRegistration = reactive({
  username: "",
  passwordOne: "",
  passwordTwo: "",
});

const validadePassword = (password: string, confirmPassword: string) => {
  if (password == confirmPassword && password != "" && confirmPassword != "")
    return true;
  else return false;
};

const getUserIdForRegistration = () => {
  let url = window.location.href;

  let urlParts = url.split("/");

  idCompany.value = urlParts.pop() as string;
  userId.value = urlParts.pop() as string;
  service.value = urlParts.pop() as string;
  isRegistrationLink.value = true;
};

const getUserIdForUpdate = () => {
  let url = window.location.href;

  let urlParts = url.split("/");

  userId.value = urlParts.pop() as string;
  service.value = urlParts.pop() as string;
  isRegistrationLink.value = false;

  console.log(userId.value, service.value, isRegistrationLink.value);
};

onMounted(() => {
  if (router.currentRoute.value.name == "Cadastro") {
    getUserIdForRegistration();
  } else {
    getUserIdForUpdate();
  }
});

const finalizeRegistration = async () => {
  showLoading.value = true;

  const res: any = await updatePasswordApi(
    userRegistration.passwordTwo,
    userId.value,
    service.value,
    userRegistration.username,
    idCompany.value
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

  if (res?.status == 409) {
    userExists.value = true;
  }
};

const redirect = (data: string) => {
  console.log("red", data);

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

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  height: 100vh;
}

.registerContainer {
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 10rem;
}
</style>
