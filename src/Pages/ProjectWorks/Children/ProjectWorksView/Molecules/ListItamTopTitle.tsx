export interface IProjectWorksViewListItemTitle {
  ColumnnameArray: any;
}

export const ProjectWorksViewListItemTitle = (
  params: IProjectWorksViewListItemTitle
) => {
  return (
    <>
      {params.ColumnnameArray.map((e: any, id: any) => (
        <div key={id} className="ProjectWorksViewListItemTitle">
          {e}
        </div>
      ))}
    </>
  );
};
