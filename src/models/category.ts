import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: String,
  desc: String,
  image: String,
  createdAt: Date,
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
