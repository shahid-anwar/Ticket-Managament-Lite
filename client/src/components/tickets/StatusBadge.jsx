function StatusBadge({ status }) {
  const statusStyles = {
    Open: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Closed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
