export interface IProjectWorksMenuListItem {
  choiceProject?: number;
  setChoiceProject: React.Dispatch<React.SetStateAction<number>>;
  projectName: string;
  projectId: number;
}

export const ProjectWorksMenuListItem = (params: IProjectWorksMenuListItem) => {
  return (
    <div
      className={
        params.choiceProject === params.projectId
          ? "ProjectWorksMenuListItem__Active ProjectWorksMenuListItem"
          : "ProjectWorksMenuListItem"
      }
      onClick={() => params.setChoiceProject(params.projectId)}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.75 9.91667H8.08333V0.75H0.75V9.91667ZM0.75 17.25H8.08333V11.75H0.75V17.25ZM9.91667 17.25H17.25V8.08333H9.91667V17.25ZM9.91667 0.75V6.25H17.25V0.75H9.91667Z" fill="white" />
      </svg>
      <div className="ProjectWorksMenuListItem_projectName">
        {params.projectName}
      </div>
    </div>
  );
};
