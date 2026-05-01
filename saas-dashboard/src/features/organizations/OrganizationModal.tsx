import { useState } from "react";
import Modal from "@/components/ui/modals/modal";
import type { Organization } from "@/types/organization";
import type { Props } from "@/types/organizationProps";

export default function OrganizationModal({
  isOpen,
  onClose,
  onSubmit,
  editingOrg,
}: Props) {
  const [form, setForm] = useState<Organization>(
    editingOrg ?? {
      id: 0,
      name: "",
      industry: "",
      users: 0,
      status: "active",
      createdAt: "",
    }
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingOrg ? "Edit Organization" : "Create Organization"}
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 bg-black text-white rounded"
          >
            {editingOrg ? "Update" : "Create"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Industry"
          value={form.industry}
          onChange={(e) =>
            setForm({ ...form, industry: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </Modal>
  );
}