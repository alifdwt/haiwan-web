import { Schema, model, models } from "mongoose";

const SubcategorySchema = new Schema({
  name: String,
  desc: String,
  image: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: Date,
});

const Subcategory =
  models.Subcategory || model("Subcategory", SubcategorySchema);

export default Subcategory;
