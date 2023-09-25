export interface IProjectWorksMenuHead {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

export const ProjectWorksMenuHead = (params: IProjectWorksMenuHead) => {
  return (
    <div className="ProjectWorksMenuHead">
      <div className="ProjectWorksMenuHead__Title">
        <div className="ProjectWorksMenuHead__Title__Big">Название проекта</div>
        <div className="ProjectWorksMenuHead__Title__Min">Аббревиатура</div>
      </div>
      {params.open ?
        <svg onClick={() => params.setOpen(!params.open)} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z" fill="white" />
        </svg>
        :
        <svg onClick={() => params.setOpen(!params.open)} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.59 7.40991L6 2.82991L1.41 7.40991L1.23266e-07 5.99991L6 -8.82626e-05L12 5.99991L10.59 7.40991Z" fill="white" />
        </svg>
      }
    </div>
  );
};
