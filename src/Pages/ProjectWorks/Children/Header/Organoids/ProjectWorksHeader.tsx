import { useEffect, useState } from "react";
import Menu from "../../../../../Common/ProjectWorks/Menu.svg";
import Back from "../../../../../Common/ProjectWorks/Back.svg";
import "../Styles/ProjectWorksHeader.css";

export interface IProjectWorksHeader {
  id?: number;
  type?: number;
  Pages?: number;
  choise?: number;
  setChoise: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectWorksHeader = (params: IProjectWorksHeader) => {
  const [choise, setChoise] = useState<number>();
  useEffect(() => {
    setChoise(params.choise);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="ProjectWorksHeader">
      <div
        onClick={() => setChoise(0)}
        className={
          choise === 0
            ? "ProjectWorksHeader__Item"
            : "ProjectWorksHeader__Item"
        }
      >
        <img src={Menu} alt="Menu" />
      </div>
      <div
        onClick={() => setChoise(1)}
        className={
          choise === 1
            ? "ProjectWorksHeader__Item"
            : "ProjectWorksHeader__Item"
        }
      >
        <img src={Back} alt="Back" />
      </div>
      <div
        onClick={() => {
          params.setChoise(2);
          setChoise(2);
        }}
        className={
            params.choise === 2
            ? "PWHI_Active ProjectWorksHeader__Item"
            : "ProjectWorksHeader__Item"
        }
      >
        Просмотр
      </div>
      <div
        onClick={() => {
          params.setChoise(3);
          setChoise(3);
        }}
        className={
          params.choise === 3
            ? "PWHI_Active ProjectWorksHeader__Item"
            : "ProjectWorksHeader__Item"
        }
      >
        Управление
      </div>
    </div>
  );
};
