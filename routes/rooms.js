import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  getAllRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controllers/room.js";

const router = express.Router();

// GET All
router.get("/", getAllRoom);

// GET By ID
router.get("/:id", getRoomById);

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);

// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

export default router;
