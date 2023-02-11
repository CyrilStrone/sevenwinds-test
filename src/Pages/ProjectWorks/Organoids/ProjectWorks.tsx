import { ProjectWorksHeader } from "../Children/Header/Organoids/ProjectWorksHeader";
import { ProjectWorksMenu } from "../Children/Menu/Organoids/ProjectWorksMenu";
import { ProjectWorksView } from "../Children/ProjectWorksView/Organoids/ProjectWorksView";
import {  useState } from "react";
import "../Styles/ProjectWorks.css";
export interface IProjectWorks {
  id?: number;
}

export const ProjectWorks = (params: IProjectWorks) => {
  const [choise, setChoise] = useState<number>(2);
  const [choiseProject, setChoiseProject] = useState<number>(0);

  return (
    <div className="ProjectWorks">
      <ProjectWorksHeader choise={choise} setChoise={setChoise} />
      <ProjectWorksMenu
        choise={choise}
        choiseProject={choiseProject}
        setChoiseProject={setChoiseProject}
      />
      <ProjectWorksView
      setChoise={setChoise}
        choise={choise}
        choiseProject={choiseProject}
        setChoiseProject={setChoiseProject}
      />
    </div>
  );
};
