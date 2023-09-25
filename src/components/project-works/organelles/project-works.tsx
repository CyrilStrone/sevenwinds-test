
import { useState } from "react";

import "../styles/project-works.css";

import { ProjectWorksHeader } from "../children/header/organelles/project-works-header";
import { ProjectWorksMenu } from "../children/menu/organelles/project-works-menu";
import { ProjectWorksView } from "../children/view/organelles/project-works-view";

export const ProjectWorks = () => {
  const CHOICE_DEFAULT = 2
  const CHOICE_PROJECT_DEFAULT = 2
  const [choice, setChoice] = useState<number>(CHOICE_DEFAULT);
  const [choiceProject, setChoiceProject] = useState<number>(CHOICE_PROJECT_DEFAULT);

  return (
    <div className="ProjectWorks">
      <ProjectWorksHeader
        choice={choice}
        setChoice={setChoice}
      />
      <ProjectWorksMenu
        choice={choice}
        choiceProject={choiceProject}
        setChoiceProject={setChoiceProject}
      />
      <ProjectWorksView
        setChoice={setChoice}
        choice={choice}
        choiceProject={choiceProject}
        setChoiceProject={setChoiceProject}
      />
    </div>
  );
};
