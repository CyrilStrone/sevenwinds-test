import { useEffect, useState } from "react";
import { ProjectWorksViewHead } from "../Molecules/Head";
import { ProjectWorksViewListItem } from "../Molecules/ListItem";
import "../Styles/ProjectWorksView.css";

export interface IProjectWorksView {
  choiseProject: number;
  setChoiseProject: React.Dispatch<React.SetStateAction<number>>;
  choise: number;
  listApi: any;
  setListApi:  React.Dispatch<React.SetStateAction<any>>;
}

export const ProjectWorksView = (params: IProjectWorksView) => {
  const [checkDoubleClickID, setcheckDoubleClickID] = useState<number>(0);
  return (
    <div className="ProjectWorksView">
      <ProjectWorksViewHead
        ProjectName={"Строительно-монтажные работы"}
        ColumnnameArray={[
          "Уровень",
          "Наименование работ",
          "Основная з/п",
          "Оборудование",
          "Накладные расходы",
          "Сметная прибыль",
        ]}
      />
      <div className="ProjectWorksView__List">
      {params.listApi && params.listApi.map((e: any) => 
        <ProjectWorksViewListItem
          setcheckDoubleClickID={setcheckDoubleClickID}
          listApi={params.listApi}
          checkDoubleClickID={checkDoubleClickID}
          child={e.child}
          equipmentCosts={e.equipmentCosts}
          estimatedProfit={e.estimatedProfit}
          id={e.id}
          machineOperatorSalary={e.machineOperatorSalary}
          mainCosts={e.mainCosts}
          materials={e.materials}
          mimExploitation={e.mimExploitation}
          overheads={e.overheads}
          rowName={e.rowName}
          salary={e.salary}
          supportCosts={e.supportCosts}
          total={e.total}
          parentId={null}
          linelevel={0}
          setListApi={params.setListApi}
        />
      )}
      </div>
    </div>
  );
};
