import express from "express";
import {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// AUTHENTICATION
router.get("/checkauth", verifyToken, (req, res, next) => {
  res.send("Hello user you are logged in");
});

// VERIFY-USER
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("Hello user you are logged in and can perform CRUD");
});

// VERIFY-ADMIN
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello Admin, you are logged in and can perform CRUD");
});

// GET All
router.get("/", verifyAdmin, getAllUser);

// GET By ID
router.get("/:id", verifyUser, getUserById);

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

export default router;
