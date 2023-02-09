import { useEffect, useState } from "react";
import Line from "../../../../../Common/ProjectWorks/Line.svg";
import Add from "../../../../../Common/ProjectWorks/Add.svg";
import Delete from "../../../../../Common/ProjectWorks/Delete.svg";
import { $generalID, axiosInstance } from "../../../Logics/hooks";
import { useStore } from "effector-react";
export interface IProjectWorksViewListItem {
  child: IProjectWorksViewListItem[];
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
  parentId: number | null;
  linelevel: number;
  checkDoubleClickID: number;
  listApi: any;
  setcheckDoubleClickID: React.Dispatch<React.SetStateAction<number>>;
  setListApi: React.Dispatch<React.SetStateAction<any>>;
}

export const ProjectWorksViewListItem = (params: IProjectWorksViewListItem) => {
  const [checkHover, setCheckHover] = useState<boolean>(false);
  const [checkDoubleClick, setcheckDoubleClick] = useState<boolean>(false);

  const [TableInfo, setTableInfo] = useState<any>(null);
  const generalID = useStore($generalID);

  useEffect(() => {
    setTableInfo({
      rowName: params.rowName,
      salary: params.salary,
      equipmentCosts: params.equipmentCosts,
      overheads: params.overheads,
      estimatedProfit: params.estimatedProfit,
      machineOperatorSalary: params.machineOperatorSalary,
      mainCosts: params.mainCosts,
      materials: params.materials,
      mimExploitation: params.mimExploitation,
      supportCosts: params.supportCosts,
    });
  }, []);
  var objTraverse = require("obj-traverse/lib/obj-traverse");
  const handleTableInfo = (loacalparams: any) => {
    if (loacalparams.type !== "keydown" || loacalparams.event.key !== "Enter") {
      let FakeArray: any = Object.assign([], TableInfo);
      FakeArray[loacalparams.key] = loacalparams.event.target.value;
      setTableInfo(FakeArray);
    } else {
      if (loacalparams.event.key == "Enter") {
        if (params.checkDoubleClickID == params.id) {
          axiosInstance
            .post<{}>(
              `/v1/outlay-rows/entity/${generalID}/row/${params.id}/update`,
              {
                machineOperatorSalary: params.machineOperatorSalary,
                mainCosts: params.mainCosts,
                materials: params.materials,
                mimExploitation: params.mimExploitation,
                supportCosts: params.supportCosts,

                equipmentCosts: Number(TableInfo.equipmentCosts),
                estimatedProfit: Number(TableInfo.estimatedProfit),
                overheads: Number(TableInfo.overheads),
                rowName: TableInfo.rowName,
                salary: Number(TableInfo.salary),
              }
            )
            .then((res) => {
              let FakeArrayCurrent: any = [];
              let FakeArrayChanged: any = [];
              //@ts-ignore
              let newObject: any = res.data.current;
              if (params.child.length !== 0) {
                newObject.child = params.child;
              } else {
                newObject.child = [];
              }
              params.listApi.map((e: any) => {
                const newData = objTraverse.findAndModifyAll(
                  e,
                  "child",
                  { id: params.id },
                  newObject
                );
                if (newData) {
                  FakeArrayCurrent.push(newData);
                } else {
                  FakeArrayCurrent.push(e);
                }
              });
              params.setListApi(FakeArrayCurrent);
              //@ts-ignore
              if (res.data.changed.length !== 0) {
                //@ts-ignore
                res.data.changed.reverse().map((e: any) => {
                  let newObjectChanged: any = e;
                  FakeArrayCurrent.map((e2: any) => {
                    const newData = objTraverse.findAll(e2, "child", {
                      id: e.id,
                    });
                    if (newData.length !== 0) {
                      newObjectChanged.child = newData[0].child;
                    }
                  });
                  FakeArrayCurrent.map((e2: any, id: any) => {
                    const newData = objTraverse.findAndModifyAll(
                      e2,
                      "child",
                      { id: newObjectChanged.id },
                      newObjectChanged
                    );
                    if (newData) {
                      FakeArrayChanged.push(newData);
                    } else {
                      FakeArrayChanged.push(e2);
                    }
                    params.setListApi(
                      FakeArrayChanged.slice(0, FakeArrayChanged.length / 2)
                    );
                  });

                });
              }
              setcheckDoubleClick(false);

            });
        }
      }
    }
  };
  useEffect(() => {
    if (params.checkDoubleClickID === params.id) {
      setcheckDoubleClick(true);
    } else {
      setcheckDoubleClick(false);
    }
  }, [params.checkDoubleClickID]);
  useEffect(() => {
    if (checkDoubleClick == false) {
      setTableInfo({
        rowName: params.rowName,
        salary: params.salary,
        equipmentCosts: params.equipmentCosts,
        overheads: params.overheads,
        estimatedProfit: params.estimatedProfit,
        machineOperatorSalary: params.machineOperatorSalary,
        mainCosts: params.mainCosts,
        materials: params.materials,
        mimExploitation: params.mimExploitation,
        supportCosts: params.supportCosts,
      });
    }
  }, [checkDoubleClick, params.listApi]);
  return (
    TableInfo && (
      <>
        <div
          className="ProjectWorksViewListItem"
          onDoubleClick={() =>
            params.checkDoubleClickID !== params.id
              ? params.setcheckDoubleClickID(params.id)
              : setcheckDoubleClick(!checkDoubleClick)
          }
        >
          <div className="ProjectWorksViewListItem__item__Line">
            <div
              className={`ProjectWorksViewListItem__item__Line__Block Level__${
                params.linelevel
              } ${
                checkHover &&
                "ProjectWorksViewListItem__item__Line__Block__Style-Black"
              }`}
              onMouseOver={() => {
                setCheckHover(true);
              }}
              onMouseOut={() => {
                setCheckHover(false);
              }}
            >
              <img
                src={Add}
                alt="Add"
                className="ProjectWorksViewListItem__item__Line__Block__Icon__Add"
              />
              {checkHover && (
                <img
                  src={Delete}
                  alt="Delete"
                  className="ProjectWorksViewListItem__item__Line__Block__Icon"
                />
              )}

              {params.child &&
                params.child.length !== 0 &&
                params.child.map((e: any, id: any) => (
                  <img
                    src={Line}
                    alt="Line"
                    className={`ProjectWorksViewListItem__item__Line__Block__Line Level__Line__${id}`}
                  />
                ))}
            </div>
          </div>
          <div className="ProjectWorksViewListItem__item">
            {!checkDoubleClick ? (
              TableInfo.rowName
            ) : (
              <input
                type="text"
                value={TableInfo.rowName}
                onChange={(event: any) => {
                  handleTableInfo({ key: "rowName", event: event });
                }}
                onKeyDown={(event: any) => {
                  handleTableInfo({
                    key: "rowName",
                    event: event,
                    type: "keydown",
                  });
                }}
              />
            )}
          </div>
          <div className="ProjectWorksViewListItem__item">
            {!checkDoubleClick ? (
              TableInfo.salary
            ) : (
              <input
                type="text"
                value={TableInfo.salary}
                onChange={(event: any) => {
                  handleTableInfo({ key: "salary", event: event });
                }}
                onKeyDown={(event: any) => {
                  handleTableInfo({
                    key: "salary",
                    event: event,
                    type: "keydown",
                  });
                }}
              />
            )}
          </div>
          <div className="ProjectWorksViewListItem__item">
            {!checkDoubleClick ? (
              TableInfo.equipmentCosts
            ) : (
              <input
                type="text"
                value={TableInfo.equipmentCosts}
                onChange={(event: any) => {
                  handleTableInfo({ key: "equipmentCosts", event: event });
                }}
                onKeyDown={(event: any) => {
                  handleTableInfo({
                    key: "equipmentCosts",
                    event: event,
                    type: "keydown",
                  });
                }}
              />
            )}
          </div>
          <div className="ProjectWorksViewListItem__item">
            {!checkDoubleClick ? (
              TableInfo.overheads
            ) : (
              <input
                type="text"
                value={TableInfo.overheads}
                onChange={(event: any) => {
                  handleTableInfo({ key: "overheads", event: event });
                }}
                onKeyDown={(event: any) => {
                  handleTableInfo({
                    key: "overheads",
                    event: event,
                    type: "keydown",
                  });
                }}
              />
            )}
          </div>
          <div className="ProjectWorksViewListItem__item">
            {!checkDoubleClick ? (
              TableInfo.estimatedProfit
            ) : (
              <input
                type="text"
                value={TableInfo.estimatedProfit}
                onChange={(event: any) => {
                  handleTableInfo({ key: "estimatedProfit", event: event });
                }}
                onKeyDown={(event: any) => {
                  handleTableInfo({
                    key: "estimatedProfit",
                    event: event,
                    type: "keydown",
                  });
                }}
              />
            )}
          </div>
        </div>
        {params.child &&
          params.child.length !== 0 &&
          params.child.map((e: any) => (
            <ProjectWorksViewListItem
              setcheckDoubleClickID={params.setcheckDoubleClickID}
              checkDoubleClickID={params.checkDoubleClickID}
              child={e.child}
              equipmentCosts={e.equipmentCosts}
              estimatedProfit={e.estimatedProfit}
              id={e.id}
              machineOperatorSalary={e.machineOperatorSalary}
              listApi={params.listApi}
              mainCosts={e.mainCosts}
              materials={e.materials}
              mimExploitation={e.mimExploitation}
              overheads={e.overheads}
              rowName={e.rowName}
              salary={e.salary}
              supportCosts={e.supportCosts}
              total={e.total}
              parentId={params.id}
              linelevel={params.linelevel + 1}
              setListApi={params.setListApi}
            />
          ))}
      </>
    )
  );
};
