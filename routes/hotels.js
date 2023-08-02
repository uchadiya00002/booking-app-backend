import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createHotel,
  getAllHotel,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/hotel.js";

const router = express.Router();

// GET All
router.get("/", getAllHotel);

// GET By ID
router.get("/:id", getHotelById);

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;
