import { useEffect, useState } from "react";
import { ProjectWorksViewHead } from "../Molecules/Head";
import { ListItamTop } from "../Molecules/ListItamTop";
import { ProjectWorksViewListItem } from "../Molecules/ListItem";
import "../Styles/ProjectWorksView.css";
import "../Styles/Level.css";
import { useStore } from "effector-react";
import { $ListApi } from "../../../Logics/hooks";

export interface IProjectWorksView {
  choiseProject: number;
  setChoiseProject: React.Dispatch<React.SetStateAction<number>>;
  choise: number;
}

export const ProjectWorksView = (params: IProjectWorksView) => {
  const [checkDoubleClickID, setcheckDoubleClickID] = useState<number>(0);
  const ListApi = useStore($ListApi);

  return (
    <div className="ProjectWorksView">
      <ProjectWorksViewHead ProjectName={"Строительно-монтажные работы"} />

      <div className="ProjectWorksView__List">
        <ListItamTop
          ColumnnameArray={[
            "Уровень",
            "Наименование работ",
            "Основная з/п",
            "Оборудование",
            "Накладные расходы",
            "Сметная прибыль",
          ]}
        />
        {ListApi.length !== 0 &&
          ListApi.map((e: any) => (
            <ProjectWorksViewListItem
              key={e.id}
              setcheckDoubleClickID={setcheckDoubleClickID}
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
              itemobject={e}
            />
          ))}
      </div>
    </div>
  );
};
