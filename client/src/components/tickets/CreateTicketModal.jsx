import { useState } from "react";
import InputField from "../common/InputField";

function CreateTicketModal({ open, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "Engineering",
    priority: "Low",
    status: "Open",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    onCreate(formData);

    onClose();

    setFormData({
      title: "",
      description: "",
      domain: "Engineering",
      priority: "Low",
      status: "Open",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Create Ticket</h2>

          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter ticket title"
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Domain
              </label>

              <select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              >
                <option>Engineering</option>
                <option>DevOps</option>
                <option>HR</option>
                <option>IT</option>
                <option>Finance</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-medium cursor-pointer hover:opacity-90"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTicketModal;
