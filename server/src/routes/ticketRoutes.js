import express from "express";

import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTickets,
  getTicketSummary,
  updateTicket,
} from "../controllers/ticketControllers.js";

const router = express.Router();

router.get("/", getTickets);

router.post("/", createTicket);

router.get("/summary", getTicketSummary);

router.get("/:id", getTicketById);

router.patch("/:id", updateTicket);

router.delete("/:id", deleteTicket);

export default router;
