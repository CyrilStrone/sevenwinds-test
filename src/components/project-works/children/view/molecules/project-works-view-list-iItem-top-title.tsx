interface IProjectWorksViewListItemTitle {
  columnNameArray: any;
}

export const ProjectWorksViewListItemTitle = (
  params: IProjectWorksViewListItemTitle
) => {
  return (
    params.columnNameArray.map((e: any, id: any) => (
      <div key={id} className="ProjectWorksViewListItemTitle">
        {e}
      </div>
    ))
  );
};
