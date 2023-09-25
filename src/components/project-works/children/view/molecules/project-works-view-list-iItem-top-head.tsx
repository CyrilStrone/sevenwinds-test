interface IProjectWorksViewListItemHead {
  ProjectName: string;
}

export const ProjectWorksViewListItemHead = (
  params: IProjectWorksViewListItemHead
) => {
  return (
    <div className="ProjectWorksViewListItemHead">
      <div className="ProjectWorksViewListItemHead__ProjectName">
        {params.ProjectName}
      </div>
    </div>
  );
};
