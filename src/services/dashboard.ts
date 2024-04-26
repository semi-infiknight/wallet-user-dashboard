import { apiRoutes } from "./apiRoutes";
import axiosClient from "./config/axiosClient";

export const getUserInfo = () =>
    axiosClient.get(apiRoutes.userinfo);

