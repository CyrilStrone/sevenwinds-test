import { useEffect, useState } from "react";

import "../styles/project-works-header.css";

export interface IProjectWorksHeader {
  id?: number;
  type?: number;
  Pages?: number;
  choice?: number;
  setChoice: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectWorksHeader = (params: IProjectWorksHeader) => {
  const [choice, setChoice] = useState<number>();
  useEffect(() => {
    setChoice(params.choice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="ProjectWorksHeader">
      <div
        onClick={() => setChoice(0)}
        className={
          choice === 0 ? "ProjectWorksHeader__Item" : "ProjectWorksHeader__Item"
        }
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4H4V0H0V4ZM6 16H10V12H6V16ZM0 16H4V12H0V16ZM0 10H4V6H0V10ZM6 10H10V6H6V10ZM12 0V4H16V0H12ZM6 4H10V0H6V4ZM12 10H16V6H12V10ZM12 16H16V12H12V16Z" fill="#A1A1AA"/>
        </svg>
      </div>
      <div
        onClick={() => setChoice(1)}
        className={
          choice === 1 ? "ProjectWorksHeader__Item" : "ProjectWorksHeader__Item"
        }
      >
        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 4V0L0 7L7 14V9.9C12 9.9 15.5 11.5 18 15C17 10 14 5 7 4Z" fill="#A1A1AA"/>
        </svg>
      </div>
      <div
        onClick={() => {
          params.setChoice(2);
          setChoice(2);
        }}
        className={
          params.choice === 2
            ? "PWHI_Active ProjectWorksHeader__Item"
            : "ProjectWorksHeader__Item"
        }
      >
        Просмотр
      </div>
      <div
        onClick={() => {
          params.setChoice(3);
          setChoice(3);
        }}
        className={
          params.choice === 3
            ? "PWHI_Active ProjectWorksHeader__Item"
            : "ProjectWorksHeader__Item"
        }
      >
        Управление
      </div>
    </div>
  );
};
