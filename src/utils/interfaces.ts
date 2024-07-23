import { ToastType } from "vue3-toastify/index";

export interface IPassword {
  passwordOne: string;
  passwordTwo: string;
}

export interface ITypeToasts {
  SUCCESS: ToastType;
  ERROR: ToastType;
  WARNING: ToastType;
  INFO: ToastType;
}
