import { Drawer, Button } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={"100%"}
    >
      <h1>ProjectModal</h1>
      <Button onClick={props.onClose}>關閉</Button>
    </Drawer>
  );
};