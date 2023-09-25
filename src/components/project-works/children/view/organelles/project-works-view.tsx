import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import "../styles/project-works-view-list-item-top-head.css";
import "../styles/project-works-view-list-item-top-title.css";
import "../styles/project-works-view-list-item.css";
import "../styles/project-works-view.css";

import {
  $generalID,
} from "../../../logics/hooks";
import { ProjectWorksViewListItemHead } from "../molecules/project-works-view-list-iItem-top-head";
import { ProjectWorksViewListItemTitle } from "../molecules/project-works-view-list-iItem-top-title";
import { ProjectWorksViewListItem } from "../molecules/project-works-view-list-item";
import { ProjectWorksViewListItemFirst } from "../molecules/project-works-view-list-iItem-first";
import { IRowList, rowList } from "../../../logics/row-list";

export interface IProjectWorksView {
  choiceProject: number;
  setChoiceProject: React.Dispatch<React.SetStateAction<number>>;
  choice: number;
  setChoice: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectWorksView = (params: IProjectWorksView) => {
  const generalID = useStore($generalID);
  const [checkDoubleClickID, setCheckDoubleClickID] = useState<number>(0);
  const [listApi, setListApi] = useState<any[] | null>(null);
  const fetchRowList = async (params: IRowList) => {
    try {
      const result = await rowList({ generalID: params.generalID })
      if (result){
        setListApi(result)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (generalID)
      fetchRowList({ generalID: generalID })
  }, [generalID, params]);

  return (
    <div className="ProjectWorksView">
      <ProjectWorksViewListItemHead
        ProjectName="Строительно-монтажные работы"
      />
      <div className="ProjectWorksView__List">
        <ProjectWorksViewListItemTitle
          columnNameArray={[
            "Уровень",
            "Наименование работ",
            "Основная з/п",
            "Оборудование",
            "Накладные расходы",
            "Сметная прибыль",
          ]}
        />
        {Array.isArray(listApi) && listApi.length !== 0 ?
          listApi.map((e: any) => (
            <ProjectWorksViewListItem
              key={e.id}
              lineLevel={0}
              parentId={null}
              itemObject={e}
              listApi={listApi}
              setListApi={setListApi}
              setCheckDoubleClickID={setCheckDoubleClickID}
              checkDoubleClickID={checkDoubleClickID}
            />
          ))
          :
          <ProjectWorksViewListItemFirst setListApi={setListApi} />
        }
      </div>
    </div>
  );
};
