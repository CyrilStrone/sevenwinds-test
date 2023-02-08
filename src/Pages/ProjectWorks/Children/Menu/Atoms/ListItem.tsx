import Project from "../../../../../Common/ProjectWorks/Project.svg"
export interface IListItem {
    choiseProject?: number;
    setChoiseProject:React.Dispatch<React.SetStateAction<number>>;
    projectName:string;
    projectId:number;
}
export const ListItem = (params: IListItem) => {

    return (
        <div className={params.choiseProject === params.projectId ? "ListItem__Active ListItem" : "ListItem"} onClick={()=>params.setChoiseProject(params.projectId)}>
            <img src={Project} alt="" />
            <div className="ListItem_projectName">
                {params.projectName}
            </div>
        </div>
    );
};
