import { useEffect, useState } from "react";
import {
  $generalID,
  axiosInstance,
  setListApi,
} from "../../../Logics/hooks";
import { useStore } from "effector-react";


export const ProjectWorksViewListItemFirst = (
) => {
  const [TableInfo, setTableInfo] = useState<any>(null);
  const generalID = useStore($generalID);
  useEffect(()=>{
    setTableInfo({
      machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          supportCosts: 0,

          equipmentCosts: 0,
          estimatedProfit: 0,
          overheads: 0,
          rowName: "Название",
          salary: 0,
    });
  },[])
  const addTableInfo = (loacalparams: any) => {
    if (loacalparams.event.key == "Enter") {
      axiosInstance
        .post<{}>(`/v1/outlay-rows/entity/${generalID}/row/create`, {
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          supportCosts: 0,

          equipmentCosts: Number(TableInfo.equipmentCosts),
          estimatedProfit: Number(TableInfo.estimatedProfit),
          overheads: Number(TableInfo.overheads),
          rowName: TableInfo.rowName,
          salary: Number(TableInfo.salary),
        })
        .then((res) => {
          //@ts-ignore
          let newObject = res.data.current;
          newObject.child = []
          
          setListApi([newObject]);
        });
    }
  };

  return (
    TableInfo && <>
      <div className="ProjectWorksViewListItem__item__Line ProjectWorksView__List__item">
        <div>
          <div className="ProjectWorksViewListItem__item__Line__Block__Icon__Block">
          </div>
        </div>
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="text"
          value={TableInfo.rowName}
          onChange={(event: any) => {
            setTableInfo({ ...TableInfo, ["rowName"]: event.target.value });
          }}
          onKeyDown={(event: any) => {
            addTableInfo({
              key: "overheads",
              event: event,
              type: "keydown",
            });
          }}
        />
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="text"
          value={TableInfo.salary}
          onChange={(event: any) => {
            setTableInfo({ ...TableInfo, ["salary"]: event.target.value });
          }}
          onKeyDown={(event: any) => {
            addTableInfo({
              key: "overheads",
              event: event,
              type: "keydown",
            });
          }}
        />
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="text"
          value={TableInfo.equipmentCosts}
          onChange={(event: any) => {
            setTableInfo({
              ...TableInfo,
              ["equipmentCosts"]: event.target.value,
            });
          }}
          onKeyDown={(event: any) => {
            addTableInfo({
              key: "overheads",
              event: event,
              type: "keydown",
            });
          }}
        />
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="text"
          value={TableInfo.overheads}
          onChange={(event: any) => {
            setTableInfo({ ...TableInfo, ["overheads"]: event.target.value });
          }}
          onKeyDown={(event: any) => {
            addTableInfo({
              key: "overheads",
              event: event,
              type: "keydown",
            });
          }}
        />
      </div>
      <div className="ProjectWorksViewListItem__item ProjectWorksView__List__item">
        <input
          type="text"
          defaultValue={TableInfo.estimatedProfit}
          onChange={(event: any) => {
            setTableInfo({
              ...TableInfo,
              ["estimatedProfit"]: event.target.value,
            });
          }}
          onKeyDown={(event: any) => {
            addTableInfo({
              key: "overheads",
              event: event,
              type: "keydown",
            });
          }}
        />
      </div>
    </>
  );
};
