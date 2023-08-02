import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    const data = await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom?._id },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    const data = await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};
export const getRoomById = async (req, res, next) => {
  try {
    const getRoom = await Room.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (error) {
    next(error);
  }
};
export const getAllRoom = async (req, res, next) => {
  try {
    const getAllRoom = await Room.find();
    res.status(200).json(getAllRoom);
  } catch (error) {
    next(error);
  }
};
