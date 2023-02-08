import { useState } from "react";
import { ProjectWorksMenuHead } from "../Molecules/Head";
import { ProjectWorksMenuList } from "../Molecules/List";
import "../Styles/ProjectWorksMenuHead.css";
export interface IProjectWorksMenu {
    choiseProject: number;
    setChoiseProject:React.Dispatch<React.SetStateAction<number>>;
    choise:number;
}

export const ProjectWorksMenu = (params: IProjectWorksMenu) => {
    const [open, setOpen] = useState<boolean>(true);

    return (
        <div className="ProjectWorksMenu">
            <ProjectWorksMenuHead open={open} setOpen={setOpen}/>
            <ProjectWorksMenuList open={open} choiseProject={params.choiseProject} setChoiseProject={params.setChoiseProject}/>
        </div>
    );
};
