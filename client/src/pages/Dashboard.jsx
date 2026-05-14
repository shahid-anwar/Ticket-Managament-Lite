import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import TicketTable from "../components/dashboard/TicketTable";
import FilterBar from "../components/dashboard/FilterBar";
import useDebounce from "../hooks/useDebounce";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import CreateTicketModal from "../components/tickets/CreateTicketModal";

import {
  createTicket,
  deleteTicket,
  getSummary,
  getTickets,
  updateTicket,
} from "../api/ticketService";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const debouncedSearch = useDebounce(search);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getTickets();
      setTickets(data);
      const summaryData = await getSummary();
      setSummary(summaryData);
    } catch (err) {
      setError("Failed to fetch tickets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch = ticket.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesDomain =
        domainFilter === "All" || ticket.domain === domainFilter;
      const matchesPriority =
        priorityFilter === "All" || ticket.priority === priorityFilter;
      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      return matchesSearch && matchesDomain && matchesPriority && matchesStatus;
    });
  }, [tickets, debouncedSearch, domainFilter, priorityFilter, statusFilter]);

  const handleCreateTicket = async (ticketData) => {
    try {
      const createdTicket = await createTicket(ticketData);
      setTickets((prev) => [createdTicket, ...prev]);
      fetchTickets();
    } catch (err) {
      alert("Failed to create ticket");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
      fetchTickets();
    } catch (err) {
      alert("Failed to delete ticket");
      console.error(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateTicket(id, data);
      fetchTickets();
    } catch (err) {
      alert("Failed to update ticket");
      console.error(err);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setDomainFilter("All");
    setPriorityFilter("All");
    setStatusFilter("All");
  };

  const hasActiveFilters =
    search ||
    domainFilter !== "All" ||
    priorityFilter !== "All" ||
    statusFilter !== "All";

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchTickets}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Manage and monitor all tickets
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-indigo-500/30 cursor-pointer flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Create Ticket</span>
        </button>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Tickets"
          count={summary?.totalTickets || 0}
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
          gradient="from-blue-500 to-cyan-500"
        />

        <SummaryCard
          title="High Priority"
          count={summary?.highPriorityTickets || 0}
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
          gradient="from-red-500 to-pink-500"
        />

        <SummaryCard
          title="Open Tickets"
          count={
            summary?.ticketsPerStatus?.find((item) => item._id === "Open")
              ?.count || 0
          }
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          gradient="from-amber-500 to-orange-500"
        />

        <SummaryCard
          title="Closed Tickets"
          count={
            summary?.ticketsPerStatus?.find((item) => item._id === "Closed")
              ?.count || 0
          }
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          gradient="from-green-500 to-emerald-500"
        />
      </div>

      {/* Filter Bar */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        domainFilter={domainFilter}
        setDomainFilter={setDomainFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Tickets Table or Empty State */}
      {filteredTickets.length > 0 ? (
        <TicketTable
          tickets={filteredTickets}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ) : (
        <EmptyState
          hasFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Create Ticket Modal */}
      <CreateTicketModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateTicket}
      />
    </MainLayout>
  );
}

export default Dashboard;
