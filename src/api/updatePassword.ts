import { useClient } from "@/clients/AxiosClient";
import { Routes } from "@/utils/enum";

export const updatePasswordApi = async (
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
      `${Routes.CREATE_PASSWORD}${id}`,
      data
    );

    return response;
  } catch (error) {
    return error;
  }
};
