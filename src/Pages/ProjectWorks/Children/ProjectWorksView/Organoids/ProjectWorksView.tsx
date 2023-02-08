import { ProjectWorksViewHead } from "../Molecules/Head";
import { ProjectWorksViewListItem } from "../Molecules/ListItem";
import "../Styles/ProjectWorksView.css"

export interface IProjectWorksView {
    choiseProject: number;
    setChoiseProject:React.Dispatch<React.SetStateAction<number>>;
    choise:number;
}

export const ProjectWorksView = (params: IProjectWorksView) => {
    return (
        <div className="ProjectWorksView">
            <ProjectWorksViewHead ProjectName={"Строительно-монтажные работы"} ColumnnameArray={["Уровень","Наименование работ","Основная з/п","Оборудование","Накладные расходы","Сметная прибыль"]}/>
            <ProjectWorksViewListItem/>
        </div>
    );
};
