import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import "../styles/list-item-top-head.css";
import "../styles/list-item-top-title.css";
import "../styles/list-item.css";
import "../styles/project-works-view.css";

import {
  $generalID,
  $ListApi,
  axiosInstance,
  setListApi,
} from "../../../logics/hooks";
import { ProjectWorksViewListItemHead } from "../molecules/list-iItem-top-head";
import { ProjectWorksViewListItemTitle } from "../molecules/list-iItem-top-title";
import { ProjectWorksViewListItem } from "../molecules/list-iItem";
import { ProjectWorksViewListItemFirst } from "../molecules/list-iItem-first";

export interface IProjectWorksView {
  choiceProject: number;
  setChoiceProject: React.Dispatch<React.SetStateAction<number>>;
  choice: number;
  setChoice: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectWorksView = (params: IProjectWorksView) => {
  const [checkDoubleClickID, setCheckDoubleClickID] = useState<number>(0);
  const ListApi = useStore($ListApi);
  const generalID = useStore($generalID);

  useEffect(() => {
    params.setChoice(2);
    axiosInstance
      .get<{}>(`/v1/outlay-rows/entity/${generalID}/row/list`)
      .then((res) => setListApi(res.data));
  }, [generalID]);

  return (
    <div className="ProjectWorksView">
      <ProjectWorksViewListItemHead
        ProjectName={"Строительно-монтажные работы"}
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
        {ListApi.length !== 0 ? (
          ListApi.map((e: any) => (
            <ProjectWorksViewListItem
              key={e.id}
              setCheckDoubleClickID={setCheckDoubleClickID}
              checkDoubleClickID={checkDoubleClickID}
              lineLevel={0}
              parentId={null}
              itemObject={e}
            />
          ))
        ) : (
          <ProjectWorksViewListItemFirst />
        )}
      </div>
    </div>
  );
};
