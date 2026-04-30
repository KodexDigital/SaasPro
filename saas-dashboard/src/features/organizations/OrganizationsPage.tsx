import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import type { Organization } from "@/types/organization";

const initialFormState: Organization = {
  id: 0,
  name: "",
  industry: "",
  users: 0,
  status: "active",
  createdAt: "",
};

export default function OrganizationsPage() {

  // ========================
  // MODAL STATES
  // ========================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

    // ========================
    // FORM STATE
    // ========================
  const [form, setForm] = useState<Organization>(initialFormState);

  // ========================
  // FILTER / SEARCH
  // ========================
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // ========================
  // PAGINATION
  // ========================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // ========================
  // SORTING
  // ========================
  const [sortField, setSortField] =
    useState<"name" | "industry" | "users" | "createdAt">("name");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const openCreateModal = () => {
    setEditingOrg(null);
    setForm(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (org: Organization) => {
    setEditingOrg(org);
    setForm(org);
    setIsModalOpen(true);
  };

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: 1,
      name: "Acme Inc",
      industry: "Finance",
      users: 24,
      status: "active",
      createdAt: "2026-01-12",
    },
    {
      id: 2,
      name: "Techify",
      industry: "Technology",
      users: 12,
      status: "active",
      createdAt: "2026-02-05",
    },
    {
      id: 3,
      name: "HealthPlus",
      industry: "Healthcare",
      users: 8,
      status: "inactive",
      createdAt: "2026-03-20",
    },
    {
      id: 4,
      name: "EduCore",
      industry: "Education",
      users: 15,
      status: "active",
      createdAt: "2026-04-01",
    },
  ]);

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch = org.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || org.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedOrganizations = [...filteredOrganizations].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    // STRING FIELDS
    if (sortField === "name" || sortField === "createdAt") {
      valueA = String(valueA).toLowerCase();
      valueB = String(valueB).toLowerCase();
    }

    // NUMBER FIELD
    if (sortField === "users") {
      valueA = Number(valueA);
      valueB = Number(valueB);
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedOrganizations = sortedOrganizations.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(sortedOrganizations.length / itemsPerPage);
  const totalOrganizations = organizations.length;

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

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          onClick={openCreateModal}>
          <Plus size={16} />
          Add Organization
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* SEARCH */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />

          <input
            type="text"
            placeholder="Search organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* FILTER */}
        <select
          aria-label="Filter organizations by status"
          value={statusFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatusFilter(e.target.value as "all" | "active" | "inactive")
          }
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4 cursor-pointer" 
                onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">
                  Name
                  <span className="text-xs text-gray-500">
                    {getSortIcon("name")}
                  </span>
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer" 
                onClick={() => handleSort("industry")}>
                <div className="flex items-center gap-1">
                  Industry
                  <span className="text-xs text-gray-500">
                    {getSortIcon("industry")}
                  </span>
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer" 
                onClick={() => handleSort("users")}>
                <div className="flex items-center gap-1">
                  Users
                  <span className="text-xs text-gray-500">
                    {getSortIcon("users")}
                  </span>
                </div>
              </th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 cursor-pointer" 
                onClick={() => handleSort("createdAt")}>
                <div className="flex items-center gap-1">
                  Created At
                  <span className="text-xs text-gray-500">
                    {getSortIcon("createdAt")}
                  </span>
                </div>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrganizations.map((org, index) => (
              <tr
                key={org.id}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-gray-500">
                  {index + 1}
                </td>

                <td className="py-3 px-4 font-medium">
                  {org.name}
                </td>

                <td className="py-3 px-4 text-gray-600">
                  {org.industry}
                </td>

                <td className="py-3 px-4">
                  {org.users}
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      org.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {org.status}
                  </span>
                </td>

                <td className="py-3 px-4 text-gray-500">
                  {org.createdAt}
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    
                    {/* VIEW */}
                    <button
                    title="View Organization"
                      type="button"
                      onClick={() => console.log("View", org)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Eye size={14} />
                      |
                    </button>

                    {/* EDIT */}
                    <button
                    title="Edit Organization"
                      type="button"
                      onClick={() => openEditModal(org)}
                      className="flex items-center gap-1 text-gray-700 hover:text-black text-sm"
                    >
                      <Edit size={14} />
                      |
                    </button>

                    {/* DELETE */}
                    <button
                      title="Delete Organization"
                      type="button"
                      onClick={() => {
                        setSelectedOrg(org);
                        setDeleteModalOpen(true);
                      }}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className="py-3 px-4">
                <div className="flex justify-between items-center mt-4 text-sm">
                  <p className="text-gray-500">
                    Page {currentPage} of {totalPages} - Showing {paginatedOrganizations.length} of {totalOrganizations} organizations
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
                
              </td>
            </tr>
          </tfoot>
        </table>
        
        {/* Delete Confirmation Modal */}
        {deleteModalOpen && selectedOrg && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

              {/* TITLE */}
              <h2 className="text-lg font-semibold text-gray-800">
                Delete Organization
              </h2>

              {/* MESSAGE */}
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{selectedOrg.name}</span>?  
                This action cannot be undone.
              </p>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 mt-6">

                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    console.log("Deleted:", selectedOrg);

                    // TODO: remove from state or API call here

                    setDeleteModalOpen(false);
                    setSelectedOrg(null);
                  }}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">

              {/* TITLE */}
              <h2 className="text-lg font-semibold mb-4">
                {editingOrg ? "Edit Organization" : "Create Organization"}
              </h2>

              {/* FORM */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (editingOrg) {
                    // UPDATE
                    setOrganizations((prev) =>
                      prev.map((org) =>
                        org.id === editingOrg.id ? form : org
                      )
                    );
                  } else {
                    // CREATE
                    setOrganizations((prev) => [
                      ...prev,
                      {
                        ...form,
                        id: Date.now(),
                        createdAt: new Date().toISOString().split("T")[0],
                      },
                    ]);
                  }

                  setIsModalOpen(false);
                  setEditingOrg(null);
                }}
                className="space-y-4"
              >

                {/* NAME */}
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    type="text"
                    defaultValue={editingOrg?.name || ""}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full mt-1 border px-3 py-2 rounded-md text-sm"
                    placeholder="Organization name"
                  />
                </div>

                {/* INDUSTRY */}
                <div>
                  <label className="text-sm text-gray-600">Industry</label>
                  <input
                    type="text"
                    defaultValue={editingOrg?.industry || ""}
                    value={form.industry}
                    onChange={(e) =>
                      setForm({ ...form, industry: e.target.value })
                    }
                    className="w-full mt-1 border px-3 py-2 rounded-md text-sm"
                    placeholder="e.g. Finance"
                  />
                </div>

                {/* USERS */}
                <div>
                  <label className="text-sm text-gray-600">Users</label>
                  <input
                    aria-label="Number of users in the organization"
                    type="number"
                    defaultValue={editingOrg?.users || 0}
                    value={form.users}
                    onChange={(e) =>
                      setForm({ ...form, users: parseInt(e.target.value) || 0 })
                    }
                    className="w-full mt-1 border px-3 py-2 rounded-md text-sm"
                  />
                </div>

                {/* STATUS */}
                <div>
                  <label className="text-sm text-gray-600">Status</label>
                  <select
                    aria-label="Organization status"
                    defaultValue={editingOrg?.status || "active"}
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
                    {editingOrg ? "Update" : "Create"}
                  </button>

                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}