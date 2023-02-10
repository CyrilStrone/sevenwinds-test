export interface IListItamTop {
    ColumnnameArray: any;
  }
  
  export const ListItamTop = (params: IListItamTop) => {
    return (
        <>
         {params.ColumnnameArray.map((e:any,id:any) => 
            <div key={id} className="ListItamTop">
              {e} 
            </div>
          )}
        </>
    );
  };
  