export type Organization = {
  id: number;
  name: string;
  industry: string;
  users: number;
  status: "active" | "inactive";
  createdAt: string;
};