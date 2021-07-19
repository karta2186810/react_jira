export interface Task {
  id: number;
  name: string; // 經辦人
  processorId: number;
  projectId: number;
  epicId: number; // 任務組
  kanbanId: number;
  typeId: number; // bug 或 task
  note: string;
}
