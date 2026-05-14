import api from "./api";

export const getTickets = async () => {
  const response = await api.get("/tickets");
  return response.data.data;
};

export const createTicket = async (ticketData) => {
  const response = await api.post("/tickets", ticketData);
  return response.data.data;
};

export const deleteTicket = async (id) => {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
};

export const updateTicket = async (id, data) => {
  const response = await api.patch(`/tickets/${id}`, data);
  return response.data.data;
};

export const getSummary = async () => {
  const response = await api.get("/tickets/summary");
  return response.data.data;
};
