import TicketRow from "./TicketRow";

function TicketTable({ tickets, onDelete, onUpdate }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Title
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Domain
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Priority
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Status
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Created At
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <TicketRow
              key={ticket._id}
              ticket={ticket}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;
