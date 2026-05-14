function TicketRow({ ticket, onDelete, onUpdate }) {
  const statusStyles = {
    Open: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Closed: "bg-green-100 text-green-700",
  };

  const priorityStyles = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
  };

  const handleStatusChange = (e) => {
    onUpdate(ticket._id, {
      status: e.target.value,
    });
  };

  const handlePriorityChange = (e) => {
    onUpdate(ticket._id, {
      priority: e.target.value,
    });
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-6 py-4 font-medium text-gray-700">{ticket.title}</td>

      <td className="px-6 py-4">{ticket.domain}</td>

      <td className="px-6 py-4">
        <select
          value={ticket.priority}
          onChange={handlePriorityChange}
          className={`px-3 py-2 rounded-full text-sm font-semibold outline-none cursor-pointer appearance-none ${priorityStyles[ticket.priority]}`}
        >
          <option value="Low">Low</option>

          <option value="Medium">Medium</option>

          <option value="High">High</option>

          <option value="Critical">Critical</option>
        </select>
      </td>

      <td className="px-6 py-4">
        <select
          value={ticket.status}
          onChange={handleStatusChange}
          className={`px-3 py-2 rounded-full text-sm font-semibold outline-none cursor-pointer appearance-none ${statusStyles[ticket.status]}`}
        >
          <option value="Open">Open</option>

          <option value="In Progress">In Progress</option>

          <option value="Closed">Closed</option>
        </select>
      </td>

      <td className="px-6 py-4 text-gray-500">
        {new Date(ticket.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <button
          onClick={() => onDelete(ticket._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 cursor-pointer rounded-lg text-sm transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TicketRow;
