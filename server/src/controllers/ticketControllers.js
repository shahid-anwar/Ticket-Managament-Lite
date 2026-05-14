import Ticket from "../models/Ticket.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.create(req.body);

  res.status(201).json({
    success: true,
    data: ticket,
  });
});

export const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tickets.length,
    data: tickets,
  });
});

export const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  res.status(200).json({
    success: true,
    data: ticket,
  });
});

export const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    data: updatedTicket,
  });
});

export const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  await ticket.deleteOne();

  res.status(200).json({
    success: true,
    message: "Ticket deleted successfully",
  });
});

export const getTicketSummary = asyncHandler(async (req, res) => {
  const totalTickets = await Ticket.countDocuments();

  const domainSummary = await Ticket.aggregate([
    {
      $group: {
        _id: "$domain",
        count: { $sum: 1 },
      },
    },
  ]);

  const statusSummary = await Ticket.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const highPriorityTickets = await Ticket.countDocuments({
    priority: { $in: ["High", "Critical"] },
  });

  res.status(200).json({
    success: true,
    data: {
      totalTickets,
      ticketsPerDomain: domainSummary,
      ticketsPerStatus: statusSummary,
      highPriorityTickets,
    },
  });
});
