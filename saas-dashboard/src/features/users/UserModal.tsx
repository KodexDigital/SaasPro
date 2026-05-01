import { useState } from "react";
import Modal from "@/components/ui/modals/modal";
import type { User } from "@/types/user";
import type { Props } from "@/types/userProps";

const initialState: User = {
  id: 0,
  name: "",
  email: "",
  role: "member",
  status: "active",
  createdAt: "",
};

export default function UserModal({
  isOpen,
  onClose,
  onSubmit,
  editingUser,
}: Props) {
  const [form, setForm] = useState<User>(initialState);

  // useEffect(() => {
  //   if (editingUser) {
  //     // setForm(editingUser);
  //     setForm((editingUser) as User);
  //   } else {
  //     setForm(initialState);
  //   }
  // }, [editingUser, isOpen]);

  // useEffect(() => {
  //   if (!isOpen) return;

  //   // setForm(editingUser ?? emptyUser);
  //   setForm((editingUser ?? initialState) as User);
  // }, [isOpen, editingUser]);

//   useEffect(() => {
//   if (!isOpen) return;

//   setForm({
//     id: editingUser?.id ?? 0,
//     name: editingUser?.name ?? "",
//     email: editingUser?.email ?? "",
//     role: editingUser?.role ?? "member",
//     status: editingUser?.status ?? "active",
//     createdAt: editingUser?.createdAt ?? "",
//   });
// }, [isOpen, editingUser]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingUser ? "Edit User" : "Create User"}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 bg-black text-white rounded-md text-sm"
          >
            {editingUser ? "Update" : "Create"}
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
          className="w-full border px-3 py-2 rounded-md text-sm"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md text-sm"
        />

        <select
          aria-label="Role"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value as "admin" | "member",
            })
          }
          className="w-full border px-3 py-2 rounded-md text-sm"
        >
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
      </div>
    </Modal>
  );
}