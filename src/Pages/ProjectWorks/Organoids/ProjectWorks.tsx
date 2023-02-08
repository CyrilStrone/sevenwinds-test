import { ProjectWorksHeader } from "../Children/Header/Organoids/ProjectWorksHeader";
import { ProjectWorksMenu } from "../Children/Menu/Organoids/ProjectWorksMenu";
import { ProjectWorksView } from "../Children/ProjectWorksView/Organoids/ProjectWorksView";
import { useEffect, useState } from "react";
import "../Styles/ProjectWorks.css";
import { $generalID, axiosInstance } from "../Logics/hooks";
import { useStore } from "effector-react";
export interface IProjectWorks {
  id?: number;
}

export const ProjectWorks = (params: IProjectWorks) => {
  const [choise, setChoise] = useState<number>(2);
  const [choiseProject, setChoiseProject] = useState<number>(0);
  const generalID = useStore($generalID);

  useEffect(() => {
    setChoise(2);
  }, []);
  const handleID = () => {
    // axiosInstance
    //   .post<{}>("/v1/outlay-rows/entity/create", {  }) 
    //   .then((res) => {
    //     console.log(res);
    //   });
      axiosInstance
      .get<{}>(`/v1/outlay-rows/entity/${generalID}/row/list`) 
      .then((res) => console.log(res.data))
  };
  return (
    <div className="ProjectWorks">
      <div
        onClick={() => {
          handleID();
        }}
      >
        чочо
      </div>
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
    </div>
  );
};
