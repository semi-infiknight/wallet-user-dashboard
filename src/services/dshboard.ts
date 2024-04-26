import { apiRoutes } from "./apiRoutes";
import axiosClient from "./config/axiosClient";

export const getAllData = () =>
    axiosClient.get(apiRoutes.dashboard);

