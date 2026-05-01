import type { Organization } from "@/types/organization";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Organization) => void;
  editingOrg: Organization | null;
};