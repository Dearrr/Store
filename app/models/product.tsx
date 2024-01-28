const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
