/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRoutes } from './apiRoutes';
import axiosClient from './config/axiosClient';

export const getUserInfo = () => axiosClient.get(apiRoutes.userinfo);

export const getAllTask = () => axiosClient.get(apiRoutes.tasks);

export const getLeaderBoard = () => axiosClient.get(apiRoutes.leaderboard);

export const axiosPost = (route: string, data: any) => axiosClient.post(route, data);

export const axiosGet = (route: string) => axiosClient.get(route);
