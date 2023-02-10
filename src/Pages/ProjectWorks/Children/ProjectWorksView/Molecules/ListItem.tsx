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
  itemobject: any;
  setcheckDoubleClickID: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectWorksViewListItem = (params: IProjectWorksViewListItem) => {
  let level = 0;

  const [checkHover, setCheckHover] = useState<boolean>(false);
  const [checkDoubleClick, setcheckDoubleClick] = useState<boolean>(false);
  const [deeplevel, setdeeplevel] = useState<any>(0);

  const [TableInfo, setTableInfo] = useState<any>(null);
  const generalID = useStore($generalID);
  const ListApi = useStore($ListApi);


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
        newObject.child = [];
        newObject.parentId = loacalparams;
        let child = params.child;
        child.push(newObject);
        //@ts-ignore
        params.setcheckDoubleClickID(res.data.current.id);
        var objTraverse = require("obj-traverse/lib/obj-traverse");
        ListApi.map((e: any) => {
          const newData = objTraverse.findAndModifyAll(
            e,
            "child",
            { id: params.id },
            {
              equipmentCosts: params.itemobject.equipmentCosts,
              estimatedProfit: params.itemobject.estimatedProfit,
              overheads: params.itemobject.overheads,
              rowName: params.itemobject.rowName,
              salary: params.itemobject.salary,
              child: params.child,
              machineOperatorSalary: params.itemobject.machineOperatorSalary,
              mainCosts: params.itemobject.mainCosts,
              materials: params.itemobject.materials,
              mimExploitation: params.itemobject.mimExploitation,
              supportCosts: params.itemobject.supportCosts,
              total: params.itemobject.total,
              id: params.itemobject.id,
            }
          );
          console.log("newData", newData);
          if (newData) {
            FakeArrayCurrent.push(newData);
          } else {
            FakeArrayCurrent.push(e);
          }
        });
        console.log("FakeArrayCurrent", FakeArrayCurrent);
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
        var objTraverse = require("obj-traverse/lib/obj-traverse");
        console.log("rowDelete", res.data);
        let FakeArrayCurrent: any = [];
        ListApi.map((e: any) => {
          let newData = objTraverse.findAndDeleteFirst(e, "child", {
            id: loacalparams,
          });
          if (!newData) {
            newData = objTraverse.findAndDeleteAll(e, "child", {
              id: loacalparams,
            });
          }
          if (newData) {
            FakeArrayCurrent.push(newData);
          } else {
            FakeArrayCurrent.push(e);
          }
        });
        FakeArrayCurrent = FakeArrayCurrent.filter(
          (element: any) => element.id
        );
        setListApi(FakeArrayCurrent);
      });
  };
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
              var objTraverse = require("obj-traverse/lib/obj-traverse");
              let FakeArrayCurrent: any = [];
              let FakeArrayChanged: any = [];
              //@ts-ignore
              let newObject: any = res.data.current;
              if (params.child.length !== 0) {
                newObject.child = params.child;
              } else {
                newObject.child = [];
              }
              ListApi.map((e: any) => {
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
              setListApi(FakeArrayCurrent);
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
                    setListApi(
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
  const getDeep = (theObject: any) => {
    if(theObject.child.length !== 0){
      level = level + theObject.child.length;
    }
    setdeeplevel(level);
    console.log("theObject.total", theObject.total);
    if (theObject.child.length !== 0) {
      if (theObject.child.length !== 1) {
      theObject.child.map((e: any) => {
        getDeep(e);
      });
      }else{
    
    setdeeplevel(level);
      }
    }
  };

  useEffect(() => {
    if (params.checkDoubleClickID === params.id) {
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
  }, [params.checkDoubleClickID]);
  useEffect(() => {
    level = 0;
    getDeep(params.itemobject);
  }, [ListApi]);
  return (
    TableInfo && (
      <>
        <>
          <div className="ProjectWorksViewListItem__item__Line ProjectWorksView__List__item">
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
              <div className="ProjectWorksViewListItem__item__Line__Block__Icon__Block">
              <img
                src={Add}
                alt="Add"
                className="ProjectWorksViewListItem__item__Line__Block__Icon__Add"
                onClick={() => {
                  addTableInfo(params.id);
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
                    deleteTableInfo(params.id);
                  }}
                />
              )}

              {params.child &&
                params.child.length !== 0 &&
                params.child.map((e: any, id: any) => (
                  <div
                    key={e.id}
                    style={{
                      height: `${60 * deeplevel -6 }px`,
                      top: `${16}px`,
                      left: `${8 }px`,
                    }}
                    className={`ProjectWorksViewListItem__item__Line__Block__Line`}
                  ></div>
                ))}
            </div>
          </div>
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.id
                ? params.setcheckDoubleClickID(params.id)
                : setcheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                defaultValue={TableInfo.rowName}
                className="ProjectWorksViewListItem__item__input__style"
              />
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
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.id
                ? params.setcheckDoubleClickID(params.id)
                : setcheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                defaultValue={TableInfo.salary}
                className="ProjectWorksViewListItem__item__input__style"
              />
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
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.id
                ? params.setcheckDoubleClickID(params.id)
                : setcheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                defaultValue={TableInfo.equipmentCosts}
                className="ProjectWorksViewListItem__item__input__style"
              />
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
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.id
                ? params.setcheckDoubleClickID(params.id)
                : setcheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                defaultValue={TableInfo.overheads}
                className="ProjectWorksViewListItem__item__input__style"
              />
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
          <div
            onDoubleClick={() =>
              params.checkDoubleClickID !== params.id
                ? params.setcheckDoubleClickID(params.id)
                : setcheckDoubleClick(!checkDoubleClick)
            }
            className="ProjectWorksViewListItem__item ProjectWorksView__List__item"
          >
            {!checkDoubleClick ? (
              <input
                type="text"
                defaultValue={TableInfo.estimatedProfit}
                className="ProjectWorksViewListItem__item__input__style"
              />
            ) : (
              <input
                type="text"
                defaultValue={TableInfo.estimatedProfit}
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
        {params.child &&
          params.child.length !== 0 &&
          params.child.map((e: any) => (
            <ProjectWorksViewListItem
              key={e.id}
              setcheckDoubleClickID={params.setcheckDoubleClickID}
              checkDoubleClickID={params.checkDoubleClickID}
              child={e.child}
              equipmentCosts={e.equipmentCosts}
              estimatedProfit={e.estimatedProfit}
              id={e.id}
              machineOperatorSalary={e.machineOperatorSalary}
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
              itemobject={e}
            />
          ))}
      </>
    )
  );
};
