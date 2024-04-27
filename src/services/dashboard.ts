import { apiRoutes } from './apiRoutes';
import axiosClient from './config/axiosClient';

export const getUserInfo = () => axiosClient.get(apiRoutes.userinfo);

export const getAllTask = () => axiosClient.get(apiRoutes.tasks);

export const getLeaderBoard = () => axiosClient.get(apiRoutes.leaderboard);
