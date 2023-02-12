import { useEffect, useState } from "react";

import { ProjectWorksViewListItemTitle } from "../Molecules/ListItamTopTitle";
import { ProjectWorksViewListItem } from "../Molecules/ListItem";
import { ProjectWorksViewListItemFirst } from "../Molecules/ListItemFirst";
import { ProjectWorksViewListItemHead } from "../Molecules/ListItamTopHead";

import "../Styles/ProjectWorksView.css";
import "../Styles/ListItamTopHead.css";
import "../Styles/ListItamTopTitle.css";
import "../Styles/ListItem.css";

import {
  $generalID,
  $ListApi,
  axiosInstance,
  setListApi,
} from "../../../Logics/hooks";
import { useStore } from "effector-react";

export interface IProjectWorksView {
  choiseProject: number;
  setChoiseProject: React.Dispatch<React.SetStateAction<number>>;
  choise: number;
  setChoise: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectWorksView = (params: IProjectWorksView) => {
  const [checkDoubleClickID, setcheckDoubleClickID] = useState<number>(0);
  const ListApi = useStore($ListApi);
  const generalID = useStore($generalID);

  useEffect(() => {
    params.setChoise(2);
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
          ColumnnameArray={[
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
              setcheckDoubleClickID={setcheckDoubleClickID}
              checkDoubleClickID={checkDoubleClickID}
              linelevel={0}
              parentId={null}
              itemobject={e}
            />
          ))
        ) : (
          <ProjectWorksViewListItemFirst />
        )}
      </div>
    </div>
  );
};
