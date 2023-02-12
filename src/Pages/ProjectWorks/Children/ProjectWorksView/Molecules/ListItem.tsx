import { useEffect, useState } from "react";
import Add from "../../../../../Common/ProjectWorks/Add.svg";
import Delete from "../../../../../Common/ProjectWorks/Delete.svg";
import {
  $generalID,
  $ListApi,
  axiosInstance,
  setListApi,
} from "../../../Logics/hooks";
import { useStore } from "effector-react";
export interface IProjectWorksViewListItem {
  linelevel: number;
  parentId: number | null;
  itemobject: any;
  checkDoubleClickID: number;
  setcheckDoubleClickID: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectWorksViewListItem = (params: IProjectWorksViewListItem) => {
  let objTraverse = require("obj-traverse/lib/obj-traverse");
  const [checkHover, setCheckHover] = useState<boolean>(false);
  const [checkDoubleClick, setcheckDoubleClick] = useState<boolean>(false);
  const [deeplevel, setdeeplevel] = useState<any>(null);
  const [lastdeeplevel, setlastdeeplevel] = useState<any>(null);
  const [TableInfo, setTableInfo] = useState<any>(null);
  const generalID = useStore($generalID);
  const ListApi = useStore($ListApi);

  useEffect(() => {
    setTableInfo({
      rowName: params.itemobject.rowName,
      salary: params.itemobject.salary,
      equipmentCosts: params.itemobject.equipmentCosts,
      overheads: params.itemobject.overheads,
      estimatedProfit: params.itemobject.estimatedProfit,
      machineOperatorSalary: params.itemobject.machineOperatorSalary,
      mainCosts: params.itemobject.mainCosts,
      materials: params.itemobject.materials,
      mimExploitation: params.itemobject.mimExploitation,
      supportCosts: params.itemobject.supportCosts,
      child: params.itemobject.child,
    });
  }, []);

  const addTableInfo = (loacalparams: any) => {
    axiosInstance
      .post<{}>(`/v1/outlay-rows/entity/${generalID}/row/create`, {
        equipmentCosts: 0,
        estimatedProfit: 0,
        overheads: 0,
        parentId: loacalparams,
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
        let newchild = params.itemobject.child;
        newObject.child = [];
        newObject.parentId = params.itemobject;
        newchild.push(newObject);
        //@ts-ignore
        params.setcheckDoubleClickID(res.data.current.id);
        ListApi.map((e: any) => {
          const newData = objTraverse.findAndModifyFirst(
            e,
            "child",
            { id: params.itemobject.id },
            {
              equipmentCosts: params.itemobject.equipmentCosts,
              estimatedProfit: params.itemobject.estimatedProfit,
              overheads: params.itemobject.overheads,
              rowName: params.itemobject.rowName,
              salary: params.itemobject.salary,
              machineOperatorSalary: params.itemobject.machineOperatorSalary,
              mainCosts: params.itemobject.mainCosts,
              materials: params.itemobject.materials,
              mimExploitation: params.itemobject.mimExploitation,
              supportCosts: params.itemobject.supportCosts,
              total: params.itemobject.total,
              id: params.itemobject.id,
              child: newchild,
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

  const deleteTableInfo = (loacalparams: any) => {
    axiosInstance
      .delete<{}>(
        `/v1/outlay-rows/entity/${generalID}/row/${loacalparams}/delete`,
        {}
      )
      .then((res) => {
        let FakeArrayCurrent: any = [];
        console.log("loacalparams", loacalparams);
        if (params.parentId) {
          ListApi.map((e: any) => {
            let newData = objTraverse.findAndDeleteFirst(e, "child", {
              id: loacalparams,
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

  const handleTableInfo = (loacalparams: any) => {
    if (loacalparams.type !== "keydown" || loacalparams.event.key !== "Enter") {
      let FakeArray: any = Object.assign([], TableInfo);
      FakeArray[loacalparams.key] = loacalparams.event.target.value;
      setTableInfo(FakeArray);
    } else {
      if (loacalparams.event.key == "Enter") {
        if (params.checkDoubleClickID == params.itemobject.id) {
          axiosInstance
            .post<{}>(
              `/v1/outlay-rows/entity/${generalID}/row/${params.itemobject.id}/update`,
              {
                machineOperatorSalary: params.itemobject.machineOperatorSalary,
                mainCosts: params.itemobject.mainCosts,
                materials: params.itemobject.materials,
                mimExploitation: params.itemobject.mimExploitation,
                supportCosts: params.itemobject.supportCosts,

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
              newObject.child = params.itemobject.child;
              ListApi.map((e: any) => {
                const newData = objTraverse.findAndModifyAll(
                  e,
                  "child",
                  { id: params.itemobject.id },
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

              setcheckDoubleClick(false);
            });
        }
      }
    }
  };

  useEffect(() => {
    setTableInfo({
      rowName: params.itemobject.rowName,
      salary: params.itemobject.salary,
      equipmentCosts: params.itemobject.equipmentCosts,
      overheads: params.itemobject.overheads,
      estimatedProfit: params.itemobject.estimatedProfit,
      machineOperatorSalary: params.itemobject.machineOperatorSalary,
      mainCosts: params.itemobject.mainCosts,
      materials: params.itemobject.materials,
      mimExploitation: params.itemobject.mimExploitation,
      supportCosts: params.itemobject.supportCosts,
      child: params.itemobject.child,
    });
  }, [ListApi]);

  useEffect(() => {
    if (params.checkDoubleClickID === params.itemobject.id) {
      setcheckDoubleClick(true);
      setTableInfo({
        rowName: params.itemobject.rowName,
        salary: params.itemobject.salary,
        equipmentCosts: params.itemobject.equipmentCosts,
        overheads: params.itemobject.overheads,
        estimatedProfit: params.itemobject.estimatedProfit,
        machineOperatorSalary: params.itemobject.machineOperatorSalary,
        mainCosts: params.itemobject.mainCosts,
        materials: params.itemobject.materials,
        mimExploitation: params.itemobject.mimExploitation,
        supportCosts: params.itemobject.supportCosts,
        child: params.itemobject.child,
      });
    } else {
      setcheckDoubleClick(false);
    }
  }, [params.checkDoubleClickID]);

  let level = 0;
  let lastlevel = 0;

  useEffect(() => {
    level = 0;
    lastlevel = 0;
    if (params.itemobject.child.length !== 0) {
      getDeep(params.itemobject);
      getlastDeep(params.itemobject.child[params.itemobject.child.length - 1]);
    }
  }, [ListApi]);

  const getDeep = (arr: any) => {
    arr.child.map((e: any, id: any) => {
      level = level + 1;
      setdeeplevel(level);
      getDeep(e);
    });
  };

  const getlastDeep = (arr: any) => {
    lastlevel = lastlevel + arr.child.length;
    setlastdeeplevel(lastlevel);
    arr.child.map((e: any) => {
      getlastDeep(e);
    });
  };

  return (
    TableInfo && (
      <>
        <>
          <div className="ProjectWorksViewListItem__item__Line ProjectWorksView__List__item">
            <div
              style={{
                marginLeft: `${20 * params.linelevel}px`,
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
                <img
                  src={Add}
                  alt="Add"
                  className="ProjectWorksViewListItem__item__Line__Block__Icon__Add"
                  onClick={() => {
                    checkDoubleClick == false && addTableInfo(params.itemobject.id);
                  }}
                />
                {params.parentId && (
                  <div className="ProjectWorksViewListItem__item__Line__Block__Icon__Add__Line"></div>
                )}
              </div>
              {checkHover && (
                <img
                  src={Delete}
                  alt="Delete"
                  className="ProjectWorksViewListItem__item__Line__Block__Icon"
                  onClick={() => {
                    deleteTableInfo(params.itemobject.id);
                  }}
                />
              )}

              {params.itemobject.child &&
                params.itemobject.child.length !== 0 &&
                params.itemobject.child.map((e: any, id: any) => (
                  <div
                    key={e.id}
                    style={{
                      height: `${60 * (deeplevel - lastdeeplevel) - 0}px`,
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
              params.checkDoubleClickID !== params.itemobject.id
                ? params.setcheckDoubleClickID(params.itemobject.id)
                : setcheckDoubleClick(!checkDoubleClick)
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
              params.checkDoubleClickID !== params.itemobject.id
                ? params.setcheckDoubleClickID(params.itemobject.id)
                : setcheckDoubleClick(!checkDoubleClick)
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
              params.checkDoubleClickID !== params.itemobject.id
                ? params.setcheckDoubleClickID(params.itemobject.id)
                : setcheckDoubleClick(!checkDoubleClick)
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
              params.checkDoubleClickID !== params.itemobject.id
                ? params.setcheckDoubleClickID(params.itemobject.id)
                : setcheckDoubleClick(!checkDoubleClick)
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
              params.checkDoubleClickID !== params.itemobject.id
                ? params.setcheckDoubleClickID(params.itemobject.id)
                : setcheckDoubleClick(!checkDoubleClick)
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
        {params.itemobject.child.length !== 0 &&
          params.itemobject.child.map((e: any) => (
            <ProjectWorksViewListItem
              key={e.id}
              setcheckDoubleClickID={params.setcheckDoubleClickID}
              checkDoubleClickID={params.checkDoubleClickID}
              parentId={params.itemobject.id}
              linelevel={params.linelevel + 1}
              itemobject={e}
            />
          ))}
      </>
    )
  );
};
