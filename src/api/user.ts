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
