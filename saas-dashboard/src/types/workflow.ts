export type WorkflowStatus = "draft" | "active" | "paused";

export type Workflow = {
  id: number;
  name: string;
  description: string;
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
  runs: number;
};