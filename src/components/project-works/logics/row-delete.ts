import { axiosInstance } from "./hooks";

export interface IRowDelete {
  generalID: any;
  id: any;
}
const rowDelete = async (params: IRowDelete) => {
  return axiosInstance
    .delete<{}>(
      `/v1/outlay-rows/entity/${params.generalID}/row/${params.id}/delete`,
      {}
    )
    .then(() => {
      return true;
    })
    .catch((error) => {
      throw error;
    });
};

interface IFetchRowDelete extends IRowDelete {
  listApi: any;
  setListApi: any;
  parentId: any;
  objTraverse: any;
}
export const fetchRowDelete = async (params: IFetchRowDelete) => {
  try {
    const result = await rowDelete({
      generalID: params.generalID,
      id: params.id,
    });
    if (result) {
      let FakeArrayCurrent: any = [];
      if (params.parentId) {
        params.listApi.map((e: any) => {
          let newData = params.objTraverse.findAndDeleteFirst(e, "child", {
            id: params.id,
          });
          if (newData) {
            FakeArrayCurrent.push(newData);
          } else {
            FakeArrayCurrent.push(e);
          }
        });
        params.setListApi(
          FakeArrayCurrent.filter((element: any) => element.id)
        );
      } else {
        params.setListApi([]);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
