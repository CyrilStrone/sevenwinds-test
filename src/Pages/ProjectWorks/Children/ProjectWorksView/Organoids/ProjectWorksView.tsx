import { useEffect, useState } from "react";
import { ProjectWorksViewHead } from "../Molecules/Head";
import { ListItamTop } from "../Molecules/ListItamTop";
import { ProjectWorksViewListItem } from "../Molecules/ListItem";
import "../Styles/ProjectWorksView.css";
import "../Styles/Level.css";
import { $generalID, $ListApi, axiosInstance, setListApi } from "../../../Logics/hooks";
import { useStore } from "effector-react";
import { ProjectWorksViewListItemFirst } from "../Molecules/ListItemFirst";

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
        {ListApi.length !== 0 ?
          ListApi.map((e: any) => (
            <ProjectWorksViewListItem
              key={e.id}
              setcheckDoubleClickID={setcheckDoubleClickID}
              checkDoubleClickID={checkDoubleClickID}
              linelevel={0}
              parentId={null}
              itemobject={e}
            />
           
          )) :  <ProjectWorksViewListItemFirst
        />}
      </div>
    </div>
  );
};
