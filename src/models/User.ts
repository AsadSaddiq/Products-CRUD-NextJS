import { Schema, model, models } from "mongoose";

// Define the schema for the User
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the model
const User = models.User || model("User", userSchema);

export default User;
