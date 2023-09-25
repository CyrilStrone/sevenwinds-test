import { ProjectWorksMenuListItem } from "../atoms/project-works-menu-list-item";

export interface IProjectWorksMenuList {
  choiceProject: number;
  setChoiceProject: React.Dispatch<React.SetStateAction<number>>;
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
        choiceProject={params.choiceProject}
        setChoiceProject={params.setChoiceProject}
      />
      <ProjectWorksMenuListItem
        projectName={"По проекту"}
        projectId={1}
        choiceProject={params.choiceProject}
        setChoiceProject={params.setChoiceProject}
      />
    </div>
  );
};
