import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    unique: true,
    validate: [
      {
        validator: (title: string) => {
          return title.length > 2;
        },
        message: "Title must be at least 3 characters long",
      },
    ],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be greater than or equal to 0"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  imageData: [
    {
      image: {
        type: String,
        required: [true, "Image is required"],
        trim: true,
      },
    },
  ],
  createdAt: Date,
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
