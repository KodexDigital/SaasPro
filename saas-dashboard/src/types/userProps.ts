import type { User } from "./user";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: User) => void;
  editingUser: User | null;
};