import mongoose from "mongoose";

const customCharacterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    status: { type: String, required: true },
    gender: { type: String, required: true },
    origin: { type: String, required: true },
    image: { type: String, required: true },
    backstory: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  }, { timestamps: true });
  
  const CustomCharacter = mongoose.model("CustomCharacter", customCharacterSchema);
  export default CustomCharacter;
  