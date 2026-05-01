import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import type { User } from "@/types/user";

const initialFormState: User = {
  id: 0,
  name: "",
  email: "",
  role: "member",
  status: "active",
  createdAt: "",
};

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
  // STATE
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      createdAt: "2026-01-12",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "member",
      status: "active",
      createdAt: "2026-02-10",
    },
    {
      id: 3,
      name: "Michael Lee",
      email: "michael@example.com",
      role: "member",
      status: "inactive",
      createdAt: "2026-03-05",
    },
    {
      id: 4,
      name: "Jone Lee",
      email: "jone@example.com",
      role: "member",
      status: "active",
      createdAt: "2026-03-05",
    },
    {
      id: 5,
      name: "Kle mao",
      email: "kle@example.com",
      role: "fellow",
      status: "active",
      createdAt: "2026-03-05",
    },
    {
      id: 6,
      name: "Luke make",
      email: "luke@example.com",
      role: "member",
      status: "inactive",
      createdAt: "2026-04-05",
    },
  ]);

  const [form, setForm] = useState<User>(initialFormState);

  const [sortField, setSortField] =
    useState<"name" | "email" | "role" | "createdAt">("name");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "member" | "fellow">("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // FILTER
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    // STRING FIELDS
    if (sortField === "name" || sortField === "createdAt") {
      valueA = String(valueA).toLowerCase();
      valueB = String(valueB).toLowerCase();
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // PAGINATION
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const totalUsers = users.length;

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: typeof sortField) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? "▲" : "▼";
  };

  const openCreateModal = () => {
      setEditingUser(null);
      // setForm(initialFormState);
      setIsModalOpen(true);
    };
  
    const openEditModal = (user: User) => {
      setEditingUser(user);
      // setForm(user);
      setIsModalOpen(true);
    };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          onClick={openCreateModal}
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* SEARCH */}
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
          />
        </div>

        {/* ROLE FILTER */}
        <select
          aria-label="Filter users by role"
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value as "all" | "admin" | "member" | "fellow")
          }
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4"
              onClick={() => handleSort("name")}>
                Name
                <span className="text-xs text-gray-500 ml-1">
                  {getSortIcon("name")}
                </span>
              </th>
              <th className="py-3 px-4"
              onClick={() => handleSort("email")}>
                Email
                <span className="text-xs text-gray-500 ml-1">
                  {getSortIcon("email")}
                </span>
              </th>
              <th className="py-3 px-4"
                onClick={() => handleSort("role")}>
                Role
                <span className="text-xs text-gray-500 ml-1">
                  {getSortIcon("role")}
                </span>
              </th>
              <th className="py-3 px-4">
                Status
              </th>
              <th className="py-3 px-4"
              onClick={() => handleSort("createdAt")}>
                Created
                <span className="text-xs text-gray-500 ml-1">
                  {getSortIcon("createdAt")}
                </span>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>

                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>

                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="py-3 px-4 text-gray-500">
                  {user.createdAt}
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button title="View" type="button">
                      <Eye size={14} />
                    </button>

                    <button title="Edit" type="button"
                      onClick={() => openEditModal(user)}>
                      <Edit size={14} />
                    </button>

                    <button
                      title="Delete"
                      type="button"
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 size={14} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4 text-sm">
          <p className="text-gray-500">
            Page {currentPage} of {totalPages} - Showing {paginatedUsers.length} of {totalUsers} users
          </p>

          <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>

                    {/* PAGE NUMBERS */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded text-sm transition
                          ${
                            currentPage === page
                              ? "bg-black text-white"
                              : "hover:bg-gray-100"
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">

              {/* TITLE */}
              <h2 className="text-lg font-semibold mb-4">
                {editingUser ? "Edit User" : "Create User"}
              </h2>

              {/* FORM */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (editingUser) {
                    // UPDATE
                    setUsers((prev) =>
                      prev.map((user) =>
                        user.id === editingUser.id ? form : user
                      )
                    );
                  } else {
                    // CREATE
                    setUsers((prev) => [
                      ...prev,
                      {
                        ...form,
                        id: Date.now(),
                        createdAt: new Date().toISOString().split("T")[0],
                      },
                    ]);
                  }

                  setIsModalOpen(false);
                  setEditingUser(null);
                }}
                className="space-y-4"
              >

                {/* NAME */}
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    type="text"
                    defaultValue={editingUser?.name || ""}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full mt-1 border px-3 py-2 rounded-md text-sm"
                    placeholder="User name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="text"
                    defaultValue={editingUser?.email || ""}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full mt-1 border px-3 py-2 rounded-md text-sm"
                    placeholder="e.g. user@example.com"
                  />
                </div>

                {/* ROLE */}
                <div>
                  <label className="text-sm text-gray-600">Role</label>
                  <select
                    aria-label="User status"
                    defaultValue={editingUser?.role || "member"}
                    value={form.role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value as "admin" | "member" | "fellow" })
                    }    
                    className="w-full mt-1 border px-3 py-2 rounded-md text-sm"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="fellow">Fellow</option>
                  </select>
                </div>

                {/* STATUS */}
                <div>
                  <label className="text-sm text-gray-600">Status</label>
                  <select
                    aria-label="User status"
                    defaultValue={editingUser?.status || "active"}
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value as "active" | "inactive" })
                    }    
                    className="w-full mt-1 border px-3 py-2 rounded-md text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-2 pt-4">

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-md text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md text-sm"
                  >
                    {editingUser ? "Update" : "Create"}
                  </button>

                </div>

              </form>
            </div>
          </div>
        )}

      {/* DELETE MODAL */}
      {deleteModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="font-semibold text-lg">Delete User</h2>

            <p className="text-sm text-gray-600 mt-2">
              Delete <b>{selectedUser.name}</b>?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setUsers((prev) =>
                    prev.filter((u) => u.id !== selectedUser.id)
                  );
                  setDeleteModalOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}