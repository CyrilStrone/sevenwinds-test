export interface IProjectWorksViewHead {
  ProjectName: string;
  ColumnnameArray: any;
}

export const ProjectWorksViewHead = (params: IProjectWorksViewHead) => {
  return (
    <div className="ProjectWorksViewHead">
      <div className="ProjectWorksViewHead__ProjectName">
        {params.ProjectName}
      </div>
      <div className="ProjectWorksViewHead__ColumnnameArray">
        {params.ColumnnameArray.map((e:any,id:any) => 
          <div key={id} className="ProjectWorksViewHead__ColumnnameArray__Item">
            {e} 
          </div>
        )}
      </div>
    </div>
  );
};
