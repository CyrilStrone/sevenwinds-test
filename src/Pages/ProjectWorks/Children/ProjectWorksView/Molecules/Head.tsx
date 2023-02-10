export interface IProjectWorksViewHead {
  ProjectName: string;
}

export const ProjectWorksViewHead = (params: IProjectWorksViewHead) => {
  return (
    <div className="ProjectWorksViewHead">
      <div className="ProjectWorksViewHead__ProjectName">
        {params.ProjectName}
      </div>
    </div>
  );
};
