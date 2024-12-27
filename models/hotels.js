import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: String,
  },
  pricePerNight: {
    required: true,
    type: String,
  },
  totalGuests: {
    required: true,
    type: Number,
  },
  totalBeds: {
    required: true,
    type: Number,
  },
  totalRooms: {
    required: true,
    type: Number,
  },
  availableRooms: {
    required: true,
    type: Number,
  },
  thumbNailUrl: {
    required: true,
    type: String,
  },
  gallery: {
    required: true,
    type: Array,
  },
  amenities: {
    required: false,
    type: Array,
  },
});

export const hotelModel =
  mongoose.models.hotels ?? mongoose.model("hotels", hotelSchema);
