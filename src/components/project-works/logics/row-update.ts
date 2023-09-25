import { axiosInstance } from "./hooks";

interface IRowUpdate {
  generalID: any;
  itemObject: any;
  item: any;
}
const rowUpdate = async (params: IRowUpdate) => {
  return axiosInstance
    .post(
      `/v1/outlay-rows/entity/${params.generalID}/row/${params.itemObject.id}/update`,
      {
        machineOperatorSalary: params.itemObject.machineOperatorSalary,
        mainCosts: params.itemObject.mainCosts,
        materials: params.itemObject.materials,
        mimExploitation: params.itemObject.mimExploitation,
        supportCosts: params.itemObject.supportCosts,

        equipmentCosts: +params.item.equipmentCosts,
        estimatedProfit: +params.item.estimatedProfit,
        overheads: +params.item.overheads,
        rowName: params.item.rowName,
        salary: +params.item.salary,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

interface IFetchRowUpdate extends IRowUpdate {
  listApi: any;
  setListApi: any;
  objTraverse: any;
  setCheckDoubleClickID: any;
  item: any;
  setItem: any;
}
export const fetchRowUpdate = async (params: IFetchRowUpdate) => {
  try {
    const result = await rowUpdate({
      generalID: params.generalID,
      itemObject: params.itemObject,
      item: params.item,
    });
    if (result) {
      let FakeArrayCurrent: any = [];
      let newObject: any = result.current;
      newObject.child = params.itemObject.child;
      params.listApi.map((e: any) => {
        const newData = params.objTraverse.findAndModifyAll(
          e,
          "child",
          { id: params.itemObject.id },
          newObject
        );
        if (newData) {
          FakeArrayCurrent.push(newData);
        } else {
          FakeArrayCurrent.push(e);
        }
      });
      params.setListApi(FakeArrayCurrent);
      if (result.changed.length !== 0) {
        result.changed.map((e: any) => {
          let FakeArrayChanged: any = [];
          let newObjectGeneral = e;
          let newObject: any = {};
          params.listApi.map((e2: any) => {
            newObject = params.objTraverse.findAll(e2, "child", {
              id: e.id,
            })[0];
          });
          if (newObject.hasOwnProperty("child")) {
            newObjectGeneral.child = newObject.child;
          } else {
            newObjectGeneral.child = [];
          }
          params.listApi.map((e2: any) => {
            const newData = params.objTraverse.findAndModifyAll(
              e2,
              "child",
              { id: newObjectGeneral.id },
              newObjectGeneral
            );
            if (newData) {
              FakeArrayChanged.push(newData);
            } else {
              FakeArrayChanged.push(e);
            }
          });
          params.setListApi(FakeArrayChanged);
        });
      }
      params.setCheckDoubleClickID(null);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
