import { Link, Routes, Route, Navigate } from "react-router-dom";
import { KanbanPage } from "../Kanban";
import { EpicPage } from "../Epic";

export const ProjectPage = () => {
  return (
    <div>
      <h1>ProjectPage</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任務列表</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanPage />} />
        <Route path={"/epic"} element={<EpicPage />} />
        <Navigate to={window.location.pathname + "/kanban"} replace={true} />
      </Routes>
    </div>
  );
};
