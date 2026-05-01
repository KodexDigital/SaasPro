export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "member" | "fellow";
  status: "active" | "inactive";
  createdAt: string;
};