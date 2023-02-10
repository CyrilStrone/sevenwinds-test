import axios from "axios";
import { createEvent, createStore } from "effector";

export const deffURL = "http://185.244.172.108:8081";
export const accessTokenName = "accessTokenV3";
export const refreshTokenName = "refreshTokenV3";

export const axiosInstance = axios.create({
  baseURL: deffURL,
});
export const $generalID = createStore<string>("35530");
export const setgeneralID = createEvent<string>();
$generalID.on(setgeneralID, (_, val) => val);

export const $generalRowName = createStore<string>("7c6c24dc-4b6d-4bd3-8f09-52bdf4172e56");
export const setgeneralRowName = createEvent<string>();
$generalRowName.on(setgeneralRowName, (_, val) => val);

export const $ListApi = createStore<any>([]);
export const setListApi = createEvent<any>();
$ListApi.on(setListApi, (_, val) => val);

