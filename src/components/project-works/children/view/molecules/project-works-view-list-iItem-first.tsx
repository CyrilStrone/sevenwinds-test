import { useState } from "react";
import { useStore } from "effector-react";

import { $generalID } from "../../../logics/hooks";
import { IRowCreate, rowCreate } from "../../../logics/row-create";

const DEFAULT_TABLE_INFO = {
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  supportCosts: 0,

  equipmentCosts: null,
  estimatedProfit: null,
  overheads: null,
  rowName: "",
  salary: null,
};

interface IFetchRowCreate extends IRowCreate {
  key: string,
  event: any,
  type: string,
  setListApi: any
}

const fetchRowCreate = async (params: IFetchRowCreate) => {
  if (params.event.key === "Enter") {
    try {
      const result = await rowCreate({ generalID: params.generalID, TableInfo: params.TableInfo })
      if (result)
        params.setListApi([result]);
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

interface IProjectWorksViewListItemFirst{
  setListApi:any
}
export const ProjectWorksViewListItemFirst = (params:IProjectWorksViewListItemFirst) => {
  const [TableInfo, setTableInfo] = useState<any | null>(DEFAULT_TABLE_INFO);
  const generalID = useStore($generalID);

  return (
    <>
      <div className="ProjectWorksViewListItem__item__Line ProjectWorksView__List__item">
        <div>
          <div className="ProjectWorksViewListItem__item__Line__Block__Icon__Block"></div>
        </div>
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="text"
          value={TableInfo.rowName || ""}
          placeholder="Название"
          onChange={(event: any) => {
            setTableInfo({ ...TableInfo, "rowName": event.target.value });
          }}
          onKeyDown={(event: any) => {
            fetchRowCreate({
              key: "overheads",
              event: event,
              type: "keydown",
              generalID: generalID,
              TableInfo: TableInfo,
              setListApi: params.setListApi
            });
          }}
        />
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="number"
          value={TableInfo.salary || ""}
          placeholder="0"
          onChange={(event: any) => {
            setTableInfo({ ...TableInfo, "salary": event.target.value });
          }}
          onKeyDown={(event: any) => {
            fetchRowCreate({
              key: "overheads",
              event: event,
              type: "keydown",
              generalID: generalID,
              TableInfo: TableInfo,
              setListApi: params.setListApi
            });
          }}
        />
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="number"
          value={TableInfo.equipmentCosts || ""}
          placeholder="0"
          onChange={(event: any) => {
            setTableInfo({
              ...TableInfo,
              "equipmentCosts": event.target.value,
            });
          }}
          onKeyDown={(event: any) => {
            fetchRowCreate({
              key: "overheads",
              event: event,
              type: "keydown",
              generalID: generalID,
              TableInfo: TableInfo,
              setListApi: params.setListApi
            });
          }}
        />
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="number"
          value={TableInfo.overheads || ""}
          placeholder="0"
          onChange={(event: any) => {
            setTableInfo({ ...TableInfo, "overheads": event.target.value });
          }}
          onKeyDown={(event: any) => {
            fetchRowCreate({
              key: "overheads",
              event: event,
              type: "keydown",
              generalID: generalID,
              TableInfo: TableInfo,
              setListApi: params.setListApi
            });
          }}
        />
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="number"
          value={TableInfo.estimatedProfit || ""}
          placeholder="0"
          onChange={(event: any) => {
            setTableInfo({
              ...TableInfo,
              "estimatedProfit": event.target.value,
            });
          }}
          onKeyDown={(event: any) => {
            fetchRowCreate({
              key: "overheads",
              event: event,
              type: "keydown",
              generalID: generalID,
              TableInfo: TableInfo,
              setListApi: params.setListApi
            });
          }}
        />
      </div>
    </>
  );
};
