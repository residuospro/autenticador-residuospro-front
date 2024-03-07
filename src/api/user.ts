import { useClient } from "@/clients/AxiosClient";
import { Routes } from "@/utils/enum";

export const usernameExists = async (username: string, id: string) => {
  try {
    const data = { username };

    const res = await useClient().post(`${Routes.USER_EXISTS}${id}`, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const createRegsiterApi = async (
  password: string,
  id: string,
  service: string,
  username: string,
  idCompany: string
) => {
  try {
    const data = {
      username,
      password,
      service,
      idCompany,
    };

    const response = await useClient().put(
      `${Routes.CREATE_REGISTER}${id}`,
      data
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const updatePasswordApi = async (id: string, password: string) => {
  try {
    const data = {
      password,
    };

    const response = await useClient().put(
      `${Routes.UPDATE_PASSWORD}${id}`,
      data
    );

    return response;
  } catch (error) {
    return error;
  }
};
