import { useState } from "react";

import "../styles/project-works-menu-head.css";
import "../styles/project-works-menu-list-item.css";
import "../styles/project-works-menu-list.css";
import "../styles/project-works-menu.css";

import { ProjectWorksMenuList } from "../molecules/project-works-menu-list";
import { ProjectWorksMenuHead } from "../molecules/project-works-menu-head";

export interface IProjectWorksMenu {
  choiceProject: number;
  setChoiceProject: React.Dispatch<React.SetStateAction<number>>;
  choice: number;
}

export const ProjectWorksMenu = (params: IProjectWorksMenu) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="ProjectWorksMenu">
      <ProjectWorksMenuHead open={open} setOpen={setOpen} />
      <ProjectWorksMenuList
        open={open}
        choiceProject={params.choiceProject}
        setChoiceProject={params.setChoiceProject}
      />
    </div>
  );
};
