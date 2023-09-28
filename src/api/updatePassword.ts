import { useClient } from "@/clients/AxiosClient";
import { Routes } from "@/utils/enum";

export const updatePasswordApi = async (
  password: string,
  id: string,
  service: string,
  username: string
) => {
  try {
    const data = {
      username,
      password,
      service,
    };

    const response = await useClient().put(
      `${Routes.CREATE_PASSWORD}${id}`,
      data
    );

    return response;
  } catch (error) {
    console.log("e", error);

    return error;
  }
};
