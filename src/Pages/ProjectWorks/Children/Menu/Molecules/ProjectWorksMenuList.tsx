import { ProjectWorksMenuListItem } from "../Atoms/ProjectWorksMenuListItem";

export interface IProjectWorksMenuList {
  choiseProject: number;
  setChoiseProject: React.Dispatch<React.SetStateAction<number>>;
  open?: boolean;
}

export const ProjectWorksMenuList = (params: IProjectWorksMenuList) => {
  return (
    <div
      className={
        params.open
          ? "ProjectWorksMenuList"
          : "ProjectWorksMenuList__Clouse ProjectWorksMenuList"
      }
    >
      <ProjectWorksMenuListItem
        projectName={"По проекту"}
        projectId={0}
        choiseProject={params.choiseProject}
        setChoiseProject={params.setChoiseProject}
      />
      <ProjectWorksMenuListItem
        projectName={"По проекту"}
        projectId={1}
        choiseProject={params.choiseProject}
        setChoiseProject={params.setChoiseProject}
      />
    </div>
  );
};
