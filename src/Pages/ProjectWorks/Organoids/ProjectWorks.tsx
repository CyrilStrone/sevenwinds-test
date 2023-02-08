import { ProjectWorksHeader } from "../Children/Header/Organoids/ProjectWorksHeader";
import { ProjectWorksMenu } from "../Children/Menu/Organoids/ProjectWorksMenu";
import { ProjectWorksView } from "../Children/ProjectWorksView/Organoids/ProjectWorksView";
import {useEffect, useState} from "react";

export interface IProjectWorks {
    id?: number;
}

export const ProjectWorks = (params: IProjectWorks) => {
    const [choise, setChoise] = useState<number>(2);
    
    useEffect(()=>{
        setChoise(2)
    },[])
    return (
        <div className="ProjectWorks">
            <ProjectWorksHeader choise={choise} setChoise={setChoise}/>
            <ProjectWorksMenu choise={choise}/>
            <ProjectWorksView choise={choise}/>
        </div>
    );
};
