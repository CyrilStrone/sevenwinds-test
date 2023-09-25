import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import {
  $generalID,
  $ListApi,
  axiosInstance,
  setListApi,
} from "../../../logics/hooks";

export interface IProjectWorksViewListItem {
  lineLevel: number;
  parentId: number | null;
  itemObject: any;
  checkDoubleClickID: number;
  setCheckDoubleClickID: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectWorksViewListItem = (params: IProjectWorksViewListItem) => {
  let objTraverse = require("obj-traverse/lib/obj-traverse");
  const [checkHover, setCheckHover] = useState<boolean>(false);
  const [checkDoubleClick, setCheckDoubleClick] = useState<boolean>(false);
  const [deepLevel, setDeepLevel] = useState<any>(null);
  const [lastDeepLevel, setLastDeepLevel] = useState<any>(null);
  const [TableInfo, setTableInfo] = useState<any>(null);
  const generalID = useStore($generalID);
  const ListApi = useStore($ListApi);

  useEffect(() => {
    setTableInfo({
      rowName: params.itemObject.rowName,
      salary: params.itemObject.salary,
      equipmentCosts: params.itemObject.equipmentCosts,
      overheads: params.itemObject.overheads,
      estimatedProfit: params.itemObject.estimatedProfit,
      machineOperatorSalary: params.itemObject.machineOperatorSalary,
      mainCosts: params.itemObject.mainCosts,
      materials: params.itemObject.materials,
      mimExploitation: params.itemObject.mimExploitation,
      supportCosts: params.itemObject.supportCosts,
      child: params.itemObject.child,
    });
  }, []);

  const addTableInfo = (localParams: any) => {
    axiosInstance
      .post<{}>(`/v1/outlay-rows/entity/${generalID}/row/create`, {
        equipmentCosts: 0,
        estimatedProfit: 0,
        overheads: 0,
        parentId: localParams,
        rowName: "Название",
        salary: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
      })
      .then((res) => {
        let FakeArrayCurrent: any = [];
        //@ts-ignore
        let newObject = res.data.current;
        let newChild = params.itemObject.child;
        newObject.child = [];
        newObject.parentId = params.itemObject;
        newChild.push(newObject);
        //@ts-ignore
        params.setCheckDoubleClickID(res.data.current.id);
        ListApi.map((e: any) => {
          const newData = objTraverse.findAndModifyFirst(
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
        setListApi(FakeArrayCurrent);
      });
  };

  const deleteTableInfo = (localParams: any) => {
    axiosInstance
      .delete<{}>(
        `/v1/outlay-rows/entity/${generalID}/row/${localParams}/delete`,
        {}
      )
      .then((res) => {
        let FakeArrayCurrent: any = [];
        console.log("localParams", localParams);
        if (params.parentId) {
          ListApi.map((e: any) => {
            let newData = objTraverse.findAndDeleteFirst(e, "child", {
              id: localParams,
            });
            if (newData) {
              FakeArrayCurrent.push(newData);
            } else {
              FakeArrayCurrent.push(e);
            }
          });
          setListApi(FakeArrayCurrent.filter((element: any) => element.id));
        } else {
          setListApi([]);
        }
      });
  };

  const handleTableInfo = (localParams: any) => {
    if (localParams.type !== "keydown" || localParams.event.key !== "Enter") {
      let FakeArray: any = Object.assign([], TableInfo);
      FakeArray[localParams.key] = localParams.event.target.value;
      setTableInfo(FakeArray);
    } else {
      if (localParams.event.key == "Enter") {
        if (params.checkDoubleClickID == params.itemObject.id) {
          axiosInstance
            .post<{}>(
              `/v1/outlay-rows/entity/${generalID}/row/${params.itemObject.id}/update`,
              {
                machineOperatorSalary: params.itemObject.machineOperatorSalary,
                mainCosts: params.itemObject.mainCosts,
                materials: params.itemObject.materials,
                mimExploitation: params.itemObject.mimExploitation,
                supportCosts: params.itemObject.supportCosts,

                equipmentCosts: Number(TableInfo.equipmentCosts),
                estimatedProfit: Number(TableInfo.estimatedProfit),
                overheads: Number(TableInfo.overheads),
                rowName: TableInfo.rowName,
                salary: Number(TableInfo.salary),
              }
            )
            .then((res) => {
              let FakeArrayCurrent: any = [];

              //@ts-ignore
              let newObject: any = res.data.current;
              newObject.child = params.itemObject.child;
              ListApi.map((e: any) => {
                const newData = objTraverse.findAndModifyAll(
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
              setListApi(FakeArrayCurrent);
              //@ts-ignore
              if (res.data.changed.length !== 0) {
                //@ts-ignore
                res.data.changed.map((e: any) => {
                  let FakeArrayChanged: any = [];
                  let newObjectGeneral = e;
                  let newObject = {};

                  ListApi.map((e2: any) => {
                    newObject = objTraverse.findAll(e2, "child", {
                      id: e.id,
                    })[0];
                  });
                  //@ts-ignore
                  if (newObject.child) {
                    //@ts-ignore
                    newObjectGeneral.child = newObject.child;
                  } else {
                    newObjectGeneral.child = [];
                  }
                  ListApi.map((e2: any) => {
                    const newData = objTraverse.findAndModifyAll(
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
                  setListApi(FakeArrayChanged);
                });
              }

              setCheckDoubleClick(false);
            });
        }
      }
    }
  };

  useEffect(() => {
    setTableInfo({
      rowName: params.itemObject.rowName,
      salary: params.itemObject.salary,
      equipmentCosts: params.itemObject.equipmentCosts,
      overheads: params.itemObject.overheads,
      estimatedProfit: params.itemObject.estimatedProfit,
      machineOperatorSalary: params.itemObject.machineOperatorSalary,
      mainCosts: params.itemObject.mainCosts,
      materials: params.itemObject.materials,
      mimExploitation: params.itemObject.mimExploitation,
      supportCosts: params.itemObject.supportCosts,
      child: params.itemObject.child,
    });
  }, [ListApi]);

  useEffect(() => {
    if (params.checkDoubleClickID === params.itemObject.id) {
      setCheckDoubleClick(true);
      setTableInfo({
        rowName: params.itemObject.rowName,
        salary: params.itemObject.salary,
        equipmentCosts: params.itemObject.equipmentCosts,
        overheads: params.itemObject.overheads,
        estimatedProfit: params.itemObject.estimatedProfit,
        machineOperatorSalary: params.itemObject.machineOperatorSalary,
        mainCosts: params.itemObject.mainCosts,
        materials: params.itemObject.materials,
        mimExploitation: params.itemObject.mimExploitation,
        supportCosts: params.itemObject.supportCosts,
        child: params.itemObject.child,
      });
    } else {
      setCheckDoubleClick(false);
    }
  }, [params.checkDoubleClickID]);

  let level = 0;
  let lastLevel = 0;

  useEffect(() => {
    level = 0;
    lastLevel = 0;
    if (params.itemObject.child.length !== 0) {
      getDeep(params.itemObject);
      getLastDeep(params.itemObject.child[params.itemObject.child.length - 1]);
    }
  }, [ListApi]);

  const getDeep = (arr: any) => {
    arr.child.map((e: any, id: any) => {
      level = level + 1;
      setDeepLevel(level);
      getDeep(e);
    });
  };

  const getLastDeep = (arr: any) => {
    lastLevel = lastLevel + arr.child.length;
    setLastDeepLevel(lastLevel);
    arr.child.map((e: any) => {
      getLastDeep(e);
    });
  };

  return (
    TableInfo && (
      <>
        <>
          <div className="ProjectWorksViewListItem__item__Line ProjectWorksView__List__item">
            <div
              style={{
                marginLeft: `${20 * params.lineLevel}px`,
              }}
              className={`ProjectWorksViewListItem__item__Line__Block } ${
                checkHover &&
                "ProjectWorksViewListItem__item__Line__Block__Style-Black"
              }`}
              onMouseOver={() => {
                checkDoubleClick == false && setCheckHover(true);
              }}
              onMouseOut={() => {
                checkDoubleClick == false && setCheckHover(false);
              }}
            >
              <div className="ProjectWorksViewListItem__item__Line__Block__Icon__Block">
                <svg className="ProjectWorksViewListItem__item__Line__Block__Icon__Add"
                  onClick={() => {
                    checkDoubleClick == false && addTableInfo(params.itemObject.id);
                  }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="14" height="14" rx="6" fill="#414144"/>
                <path d="M11.5556 0H1.77778C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V4.44444L11.5556 0ZM3.55556 3.55556H8V5.33333H3.55556V3.55556ZM12.4444 12.4444H3.55556V10.6667H12.4444V12.4444ZM12.4444 8.88889H3.55556V7.11111H12.4444V8.88889ZM10.6667 5.33333V1.77778L14.2222 5.33333H10.6667Z" fill="#7890B2"/>
                </svg>
                {params.parentId && (
                  <div className="ProjectWorksViewListItem__item__Line__Block__Icon__Add__Line"></div>
                )}
              </div>
              {checkHover && (
                <svg 
                className="ProjectWorksViewListItem__item__Line__Block__Icon"
                  onClick={() => {
                    deleteTableInfo(params.itemObject.id);
                  }}
                  width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 1C1.23478 1 0.98043 1.10536 0.792893 1.29289C0.605357 1.48043 0.5 1.73478 0.5 2V3C0.5 3.26522 0.605357 3.51957 0.792893 3.70711C0.98043 3.89464 1.23478 4 1.5 4H2V13C2 13.5304 2.21071 14.0391 2.58579 14.4142C2.96086 14.7893 3.46957 15 4 15H10C10.5304 15 11.0391 14.7893 11.4142 14.4142C11.7893 14.0391 12 13.5304 12 13V4H12.5C12.7652 4 13.0196 3.89464 13.2071 3.70711C13.3946 3.51957 13.5 3.26522 13.5 3V2C13.5 1.73478 13.3946 1.48043 13.2071 1.29289C13.0196 1.10536 12.7652 1 12.5 1H9C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0L6 0C5.73478 0 5.48043 0.105357 5.29289 0.292893C5.10536 0.48043 5 0.734784 5 1H1.5ZM4.5 5C4.63261 5 4.75979 5.05268 4.85355 5.14645C4.94732 5.24021 5 5.36739 5 5.5V12.5C5 12.6326 4.94732 12.7598 4.85355 12.8536C4.75979 12.9473 4.63261 13 4.5 13C4.36739 13 4.24021 12.9473 4.14645 12.8536C4.05268 12.7598 4 12.6326 4 12.5V5.5C4 5.36739 4.05268 5.24021 4.14645 5.14645C4.24021 5.05268 4.36739 5 4.5 5ZM7 5C7.13261 5 7.25979 5.05268 7.35355 5.14645C7.44732 5.24021 7.5 5.36739 7.5 5.5V12.5C7.5 12.6326 7.44732 12.7598 7.35355 12.8536C7.25979 12.9473 7.13261 13 7 13C6.86739 13 6.74021 12.9473 6.64645 12.8536C6.55268 12.7598 6.5 12.6326 6.5 12.5V5.5C6.5 5.36739 6.55268 5.24021 6.64645 5.14645C6.74021 5.05268 6.86739 5 7 5ZM10 5.5V12.5C10 12.6326 9.94732 12.7598 9.85355 12.8536C9.75979 12.9473 9.63261 13 9.5 13C9.36739 13 9.24021 12.9473 9.14645 12.8536C9.05268 12.7598 9 12.6326 9 12.5V5.5C9 5.36739 9.05268 5.24021 9.14645 5.14645C9.24021 5.05268 9.36739 5 9.5 5C9.63261 5 9.75979 5.05268 9.85355 5.14645C9.94732 5.24021 10 5.36739 10 5.5Z" fill="#DF4444"/>
                  </svg>
              )}

              {params.itemObject.child &&
                params.itemObject.child.length !== 0 &&
                params.itemObject.child.map((e: any, id: any) => (
                  <div
                    key={e.id}
                    style={{
                      height: `${60 * (deepLevel - lastDeepLevel) - 0}px`,
                      top: `${16}px`,
                      left: `${12}px`,
                    }}
                    className={`ProjectWorksViewListItem__item__Line__Block__Line`}
                  ></div>
                ))}
            </div>
          </div>
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.itemObject.id
                ? params.setCheckDoubleClickID(params.itemObject.id)
                : setCheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                value={TableInfo.rowName}
                onChange={() => {}}
                className="ProjectWorksViewListItem__item__input__style"
              />
            ) : (
              <input
                type="text"
                value={TableInfo.rowName == "Название" ? "" : TableInfo.rowName}
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
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.itemObject.id
                ? params.setCheckDoubleClickID(params.itemObject.id)
                : setCheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                value={TableInfo.salary}
                onChange={() => {}}
                className="ProjectWorksViewListItem__item__input__style"
              />
            ) : (
              <input
                type="text"
                value={TableInfo.salary == 0 ? "" : TableInfo.salary}
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
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.itemObject.id
                ? params.setCheckDoubleClickID(params.itemObject.id)
                : setCheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                value={TableInfo.equipmentCosts}
                onChange={() => {}}
                className="ProjectWorksViewListItem__item__input__style"
              />
            ) : (
              <input
                type="text"
                value={
                  TableInfo.equipmentCosts == 0 ? "" : TableInfo.equipmentCosts
                }
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
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.itemObject.id
                ? params.setCheckDoubleClickID(params.itemObject.id)
                : setCheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                value={TableInfo.overheads}
                onChange={() => {}}
                className="ProjectWorksViewListItem__item__input__style"
              />
            ) : (
              <input
                type="text"
                value={TableInfo.overheads == 0 ? "" : TableInfo.overheads}
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
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.itemObject.id
                ? params.setCheckDoubleClickID(params.itemObject.id)
                : setCheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                value={TableInfo.estimatedProfit}
                onChange={() => {}}
                className="ProjectWorksViewListItem__item__input__style"
              />
            ) : (
              <input
                type="text"
                value={
                  TableInfo.estimatedProfit == 0
                    ? ""
                    : TableInfo.estimatedProfit
                }
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
        </>
        {params.itemObject.child.length !== 0 &&
          params.itemObject.child.map((e: any) => (
            <ProjectWorksViewListItem
              key={e.id}
              setCheckDoubleClickID={params.setCheckDoubleClickID}
              checkDoubleClickID={params.checkDoubleClickID}
              parentId={params.itemObject.id}
              lineLevel={params.lineLevel + 1}
              itemObject={e}
            />
          ))}
      </>
    )
  );
};
