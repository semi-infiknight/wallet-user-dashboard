import { apiRoutes } from "./apiRoutes";
import axiosClient from "./config/axiosClient";

export const getUserInfo = () =>
    axiosClient.get(apiRoutes.userinfo);

export const getAllTasks = () =>
    axiosClient.get(apiRoutes.getAllTasks);
