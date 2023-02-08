import ArrowToDown from"../../../../../Common/ProjectWorks/ArrowToDown.svg"
import ArrowToUp from"../../../../../Common/ProjectWorks/ArrowToUp.svg"

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
     {params.open ? <img onClick={()=>params.setOpen(!params.open)} src={ArrowToDown} alt="ArrowToDown" />:
     <img onClick={()=>params.setOpen(!params.open)} src={ArrowToUp} alt="ArrowToDown" />}
    </div>
  );
};
