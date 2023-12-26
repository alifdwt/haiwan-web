import mongoose from "mongoose";

const UserAddressSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address_name: {
    type: String,
    required: [true, "Address Name is required"],
  },
  recipient: {
    type: String,
    required: [true, "Recipient Name is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  province: {
    type: String,
    required: [true, "Province is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"],
  },
  postcode: {
    type: String,
    required: [true, "Postcode is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  note: {
    type: String,
  },
  coordinates: {
    type: String,
  },
  is_primary: {
    type: Boolean,
    default: false,
  },
  createdAt: Date,
});

const UserAddress =
  mongoose.models.UserAddress ||
  mongoose.model("UserAddress", UserAddressSchema);

export default UserAddress;
