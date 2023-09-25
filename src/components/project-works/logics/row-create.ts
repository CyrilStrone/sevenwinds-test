import { axiosInstance } from "./hooks";

export interface IRowCreate {
  generalID: any;
  TableInfo?: any;
  parentId?: any;
}
export const rowCreate = async (params: IRowCreate) => {
  return axiosInstance
    .post(`/v1/outlay-rows/entity/${params.generalID}/row/create`, {
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      supportCosts: 0,
      parentId: params.parentId,
      equipmentCosts: +params.TableInfo?.equipmentCosts || 0,
      estimatedProfit: +params.TableInfo?.estimatedProfit || 0,
      overheads: +params.TableInfo?.overheads || 0,
      rowName: params.TableInfo?.rowName || "Название",
      salary: +params.TableInfo?.salary || 0,
    })
    .then((res: any) => {
      return res.data.current;
    })
    .catch((error) => {
      throw error;
    });
};

interface IFetchRowCreate extends IRowCreate {
  listApi: any;
  setListApi: any;
  itemObject: any;
  objTraverse: any;
}
export const fetchRowCreate = async (params: IFetchRowCreate) => {
  try {
    const result = await rowCreate({
      generalID: params.generalID,
      parentId: params.itemObject.id,
    });
    if (result) {
      let FakeArrayCurrent: any = [];
      let newChild = params.itemObject?.child || [];
      result.child = [];
      result.parentId = params.itemObject;
      newChild.push(result);
      params.listApi.map((e: any) => {
        const newData = params.objTraverse.findAndModifyFirst(
          e,
          "child",
          { id: params.itemObject.id },
          {
            equipmentCosts: params.itemObject.equipmentCosts,
            estimatedProfit: params.itemObject.estimatedProfit,
            overheads: params.itemObject.overheads,
            rowName: params.itemObject.rowName,
            salary: params.itemObject.salary,
            machineOperatorSalary: params.itemObject.machineOperatorSalary,
            mainCosts: params.itemObject.mainCosts,
            materials: params.itemObject.materials,
            mimExploitation: params.itemObject.mimExploitation,
            supportCosts: params.itemObject.supportCosts,
            total: params.itemObject.total,
            id: params.itemObject.id,
            child: newChild,
          }
        );
        if (newData) {
          FakeArrayCurrent.push(newData);
        } else {
          FakeArrayCurrent.push(e);
        }
      });
      params.setListApi(FakeArrayCurrent);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
