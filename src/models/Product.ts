import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  active: { type: Boolean, default: true },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
