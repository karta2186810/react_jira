import { Drawer, Button } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectCreate, close, open } = useProjectModal();
  return (
    <Drawer onClose={close} visible={projectCreate} width={"100%"}>
      <h1>ProjectModal</h1>
      <Button onClick={close}>關閉</Button>
    </Drawer>
  );
};
