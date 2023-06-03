import { useState } from "react";
import { ProjectWorksMenuHead } from "../Molecules/ProjectWorksMenuHead";
import { ProjectWorksMenuList } from "../Molecules/ProjectWorksMenuList";

import "../Styles/ProjectWorksMenuHead.css";
import "../Styles/ProjectWorksMenu.css";
import "../Styles/ProjectWorksMenuList.css";
import "../Styles/ProjectWorksMenuListItem.css";

export interface IProjectWorksMenu {
  choiseProject: number;
  setChoiseProject: React.Dispatch<React.SetStateAction<number>>;
  choise: number;
}

export const ProjectWorksMenu = (params: IProjectWorksMenu) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="ProjectWorksMenu">
      <ProjectWorksMenuHead open={open} setOpen={setOpen} />
      <ProjectWorksMenuList
        open={open}
        choiseProject={params.choiseProject}
        setChoiseProject={params.setChoiseProject}
      />
    </div>
  );
};
