import { axiosInstance } from "./hooks";

export interface IRowList {
  generalID: any;
}
export const rowList = async (params: IRowList) => {
  return axiosInstance
    .get(`/v1/outlay-rows/entity/${params.generalID}/row/list`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
