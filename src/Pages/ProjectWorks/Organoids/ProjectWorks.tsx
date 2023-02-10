import { ProjectWorksHeader } from "../Children/Header/Organoids/ProjectWorksHeader";
import { ProjectWorksMenu } from "../Children/Menu/Organoids/ProjectWorksMenu";
import { ProjectWorksView } from "../Children/ProjectWorksView/Organoids/ProjectWorksView";
import { useEffect, useState } from "react";
import "../Styles/ProjectWorks.css";
import { $generalID, $ListApi, axiosInstance, setListApi } from "../Logics/hooks";
import { useStore } from "effector-react";
export interface IProjectWorks {
  id?: number;
}

export const ProjectWorks = (params: IProjectWorks) => {
  const [choise, setChoise] = useState<number>(2);
  const [choiseProject, setChoiseProject] = useState<number>(0);
  const ListApi = useStore($ListApi);

  const generalID = useStore($generalID);

  useEffect(() => {
    console.log("kavo")
    setChoise(2);
    axiosInstance
      .get<{}>(`/v1/outlay-rows/entity/${generalID}/row/list`)
      .then((res) => setListApi(res.data));
  }, [generalID]);

  interface IrowCreate {
    //Оборудование
    equipmentCosts?: number;
    //Сметная прибыль
    estimatedProfit?: number;
    machineOperatorSalary?: number;
    mainCosts?: number;
    materials?: number;
    mimExploitation?: number;
    //Накладные расходы
    overheads?: number;
    //Родитель, если нет - null
    parentId?: number | null;
    //Наименование работ
    rowName?: string;
    //Основная з/п
    salary?: number;
    supportCosts?: number;
  }
  interface IrowUpdate {
    rID: number;
    equipmentCosts?: number;
    estimatedProfit?: number;
    machineOperatorSalary?: number;
    mainCosts?: number;
    materials?: number;
    mimExploitation?: number;
    overheads?: number;
    rowName?: string;
    salary?: number;
    supportCosts?: number;
  }
  interface IrowDelete {
    rID?: number;
  }
  const rowCreate = (params: IrowCreate) => {
    axiosInstance
      .post<{}>(`/v1/outlay-rows/entity/${generalID}/row/create`, {
        equipmentCosts: params.equipmentCosts,
        estimatedProfit: params.estimatedProfit,
        machineOperatorSalary: params.machineOperatorSalary,
        mainCosts: params.mainCosts,
        materials: params.materials,
        mimExploitation: params.mimExploitation,
        overheads: params.overheads,
        parentId: params.parentId,
        rowName: params.rowName,
        salary: params.salary,
        supportCosts: params.supportCosts,
      })
      .then((res) => {
        console.log("rowCreate", res.data);
      });
  };
  const rowUpdate = (params: IrowUpdate) => {
    axiosInstance
      .post<{}>(
        `/v1/outlay-rows/entity/${generalID}/row/${params.rID}/update`,
        {
          equipmentCosts: params.equipmentCosts,
          estimatedProfit: params.estimatedProfit,
          machineOperatorSalary: params.machineOperatorSalary,
          mainCosts: params.mainCosts,
          materials: params.materials,
          mimExploitation: params.mimExploitation,
          overheads: params.overheads,
          rowName: params.rowName,
          salary: params.salary,
          supportCosts: params.supportCosts,
        }
      )
      .then((res) => {
        console.log("rowUpdate", res.data);
      });
  };
  const rowDelete = (params: IrowDelete) => {
    axiosInstance
      .delete<{}>(
        `/v1/outlay-rows/entity/${generalID}/row/${params.rID}/delete`,
        {}
      )
      .then((res) => {
        console.log("rowDelete", res.data);
      });
  };

  useEffect(() => {
    console.log("ListApi:", ListApi);
  }, [ListApi]);

  return (
    <div className="ProjectWorks">
      <ProjectWorksHeader choise={choise} setChoise={setChoise} />
      <ProjectWorksMenu
        choise={choise}
        choiseProject={choiseProject}
        setChoiseProject={setChoiseProject}
      />
      <ProjectWorksView
        choise={choise}
        choiseProject={choiseProject}
        setChoiseProject={setChoiseProject}
      />
      <div
        onClick={() => {
          rowCreate({
            equipmentCosts: 0,
            estimatedProfit: 0,
            overheads: 0,
            parentId: null,
            rowName: "Чучуча 2",
            salary: 0,

            machineOperatorSalary:0,
            mainCosts:0,
            materials:0,
            mimExploitation:0,
            supportCosts:0
          });
        }}
      >
        чочо
      </div>
    </div>
  );
};
