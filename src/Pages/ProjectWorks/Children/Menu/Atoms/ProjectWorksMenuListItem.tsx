import Project from "../../../../../Common/ProjectWorks/Project.svg";
export interface IProjectWorksMenuListItem {
  choiseProject?: number;
  setChoiseProject: React.Dispatch<React.SetStateAction<number>>;
  projectName: string;
  projectId: number;
}
export const ProjectWorksMenuListItem = (params: IProjectWorksMenuListItem) => {
  return (
    <div
      className={
        params.choiseProject === params.projectId
          ? "ProjectWorksMenuListItem__Active ProjectWorksMenuListItem"
          : "ProjectWorksMenuListItem"
      }
      onClick={() => params.setChoiseProject(params.projectId)}
    >
      <img src={Project} alt="" />
      <div className="ProjectWorksMenuListItem_projectName">
        {params.projectName}
      </div>
    </div>
  );
};
