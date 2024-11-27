import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldsView from "./FieldsView";

const Fields = () => {
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fields, setFields] = useState([
    {
      id: 1,
      name: "Field 1",
      crop: "Wheat",
      area: "2.5 acres",
      status: "Active",
      image: "/asset/wheat1.jpg",
      overview:
        "This is a field of wheat. It is a staple food in many countries and is used to make bread, pasta, and other food products.",
    },
    {
      id: 2,
      name: "Field 2",
      crop: "Corn",
      area: "3 acres",
      status: "Inactive",
      image: "/asset/corn1.jpg",
      overview:
        "This is a field of corn. It is a versatile crop that is used for food, animal feed, and industrial products.",
    },
    {
      id: 3,
      name: "Field 3",
      crop: "Soybeans",
      area: "1.8 acres",
      status: "Active",
      image: "/asset/soybeans1.jpg",
      overview:
        "This is a field of soybeans. It is a major source of protein and oil for human and animal consumption.",
    },
  ]);

  const [newField, setNewField] = useState({
    name: "",
    crop: "",
    area: "",
    status: "Active",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleView = (field) => {
    navigate("/view", { state: { field } });
  };

  const handleDelete = (fieldId) => {
    setFields(fields.filter((field) => field.id !== fieldId));
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = () => {
    setFields(
      fields.map((field) =>
        field.id === editingField.id ? editingField : field
      )
    );
    setEditingField(null);
  };

  const handleChangeNewField = (e) => {
    const { name, value } = e.target;
    setNewField({ ...newField, [name]: value });
  };

  const handleAddNewField = () => {
    const newFieldData = {
      ...newField,
      id: fields.length + 1,
    };
    setFields([...fields, newFieldData]);
    setNewField({ name: "", crop: "", area: "", status: "Active" });
    setShowAddForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Fields Management</h2>
      {selectedField && <FieldsView field={selectedField} />}

      {!selectedField && !editingField && (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Field Name</th>
              <th className="px-4 py-2 text-left">Crop</th>
              <th className="px-4 py-2 text-left">Area</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.id} className="border-b">
                <td className="px-4 py-2">{field.name}</td>
                <td className="px-4 py-2">{field.crop}</td>
                <td className="px-4 py-2">{field.area}</td>
                <td className="px-4 py-2">{field.status}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleView(field)}
                  >
                    View
                  </button>
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                    onClick={() => handleEdit(field)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(field.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingField && (
        <div className="bg-gray-100 p-6 rounded shadow-md mt-6">
          <h3 className="text-2xl font-bold mb-4">Edit Field</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Field Name
            </label>
            <input
              type="text"
              value={editingField.name}
              onChange={(e) =>
                setEditingField({ ...editingField, name: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Crop
            </label>
            <input
              type="text"
              value={editingField.crop}
              onChange={(e) =>
                setEditingField({ ...editingField, crop: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            onClick={handleSave}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => setEditingField(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {!selectedField && !editingField && (
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
        >
          {showAddForm ? "Cancel" : "Add New Field"}
        </button>
      )}

      {showAddForm && (
        <div className="bg-gray-100 p-6 rounded shadow-md mt-6">
          <h3 className="text-2xl font-bold mb-4">Add New Field</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Field Name
            </label>
            <input
              type="text"
              name="name"
              value={newField.name}
              onChange={handleChangeNewField}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Crop
            </label>
            <input
              type="text"
              name="crop"
              value={newField.crop}
              onChange={handleChangeNewField}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Area
            </label>
            <input
              type="text"
              name="area"
              value={newField.area}
              onChange={handleChangeNewField}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={newField.status}
              onChange={handleChangeNewField}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleAddNewField}
          >
            Add New Field
          </button>
        </div>
      )}
    </div>
  );
};
export default Fields;
